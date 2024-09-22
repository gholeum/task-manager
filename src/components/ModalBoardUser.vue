<template>
  <BaseModal :show="show" @update:show="closeModalBoardUser">
    <div class="content__users">
      <div class="modal__title">
        <h2>Пользователи доски</h2>
      </div>
      <div class="search">
        <input
          type="text"
          placeholder="Введите email пользователя"
          minlenght="5"
          v-model="searchEmail"
          @input="fetchUserMatches"
        />
      </div>
      <div class="email-suggestions" :class="{ hidden: searchIsOpen }">
        <div
          v-for="match in emailMatches"
          :key="match.id"
          @click="addUserByEmail(match.id)"
          class="suggestion"
        >
          {{ match.email }}
        </div>
      </div>
      <div class="userlist">
        <div v-for="user in users" :key="user.id" class="usercard">
          <div class="userinfo">
            <h4>{{ user.email }}</h4>
            <i
              v-if="!user.isOwner"
              class="bi bi-trash"
              @click="removeUser(user.id)"
            ></i>
          </div>
          <div v-if="user.isOwner">
            <span>Владелец</span>
          </div>
          <div v-else>
            <label
              v-for="permission in allPermissions"
              :key="permission"
              class="permission"
            >
              <input
                type="checkbox"
                :checked="user.selectedPermissions.includes(permission)"
                @change="
                  updatePermission(user.id, permission, $event.target.checked)
                "
              />
              {{ getPermissionLabel(permission) }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "./UIElements/BaseModal.vue";
import axios from "axios";

export default {
  name: "ModalBoardUser",
  components: {
    BaseModal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: "",
      users: [],
      searchEmail: "",
      emailMatches: [],
      allPermissions: [
        "delete-board-statuses",
        "manage-board-statuses",
        "manage-board-users",
      ],
      searchIsClosed: true,
    };
  },
  methods: {
    closeModalBoardUser() {
      this.$emit("update:show", false);
      this.resetForm();
    },
    resetForm() {
      this.searchEmail = "";
      this.emailMatches = [];
      this.searchIsClosed = true;
    },
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        this.users = response.data;
        this.users.forEach((user) => {
          this.fetchPermissions(user.id);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPermissions(userId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users/${userId}/permissions`,
          {
            headers: { "X-Base-Auth": token },
          }
        );

        const user = this.users.find((u) => u.id === userId);
        if (user) {
          user.permissions = response.data;
          user.selectedPermissions = response.data;

          user.isOwner =
            response.data.includes("delete-board") &&
            response.data.includes("manage-board");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUserMatches() {
      this.searchIsClosed = false;
      const token = localStorage.getItem("token");
      if (this.searchEmail.length >= 5) {
        try {
          const response = await axios.get(
            `https://todo-list.edu-playground.ru/api/v1/users/match`,
            {
              params: { email: this.searchEmail },
              headers: { "X-Base-Auth": token },
            }
          );
          this.emailMatches = response.data.items || [];
        } catch (error) {
          console.error(error);
        }
      } else {
        this.emailMatches = [];
      }
    },
    async addUserByEmail(userId) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users`,
          {
            formData: {
              ids: [userId],
            },
          },
          {
            headers: { "X-Base-Auth": token },
          }
        );
        this.fetchUsers();
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    async removeUser(userId) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users/${userId}`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        this.fetchUsers();
      } catch (error) {
        console.error(error);
      }
    },
    async updatePermission(userId, permission, isChecked) {
      const token = localStorage.getItem("token");
      try {
        if (isChecked) {
          await axios.put(
            `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users/${userId}/permissions/${permission}`,
            {},
            {
              headers: { "X-Base-Auth": token },
            }
          );
        } else {
          await axios.delete(
            `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/users/${userId}/permissions/${permission}`,
            {
              headers: { "X-Base-Auth": token },
            }
          );
        }
        this.fetchPermissions(userId);
      } catch (error) {
        console.error(error);
      }
    },
    getPermissionLabel(permission) {
      const permissionLabels = {
        "delete-board-statuses": "Управление колонками",
        "manage-board-statuses": "Управление задачами",
        "manage-board-users": "Управление пользователями доски",
      };
      return permissionLabels[permission] || permission;
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchUsers();
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "PT Sans", sans-serif;
  font-size: 12pt;
}

.modal__title {
  display: flex;
  color: #02315e;
  justify-content: center;
  align-items: center;
}

.content__users {
  width: 100%;
  color: black;
}

.search {
  width: 100%;
  display: flex;
  gap: 10px;
}

.bi {
  font-size: 1em;
  color: rgb(77, 63, 63);
}

.bi:hover {
  cursor: pointer;
  opacity: 0.5;
}

.userlist {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 10px;
  gap: 10px;
}

.usercard {
  width: auto;
  height: auto;
  border-radius: 3px;
  border: 1px solid black;
  padding: 16px;
}

h2 {
  margin: 0px 0px 16px 0px;
}

h4 {
  font-size: 16pt;
  color: black;
  margin: 0;
}

.userinfo {
  display: flex;
  margin-bottom: 5px;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
}

.email-suggestions {
  width: 32%;
  position: absolute;
  max-height: 250px;
  overflow-y: auto;
  background-color: white;
}

.suggestion {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
}

.suggestion:hover {
  background-color: #f0f0f0;
}

.permission {
  display: block;
}
</style>
