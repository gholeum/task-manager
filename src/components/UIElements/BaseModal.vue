<template>
  <div class="modal" v-if="show">
    <div class="modal__container">
      <a href="#" class="close-modal" @click="closeModal">✖</a>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 33%);
  backdrop-filter: blur(15px);
}

.modal__container {
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 430px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  color: black;
  font-size: 16pt;
}
</style>
