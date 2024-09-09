<template>
  <div>
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      v-if="notification.visible"
      class="push-notification"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      :style="{ opacity: notification.opacity }"
    >
      <p>{{ notification.message }}</p>
      <button class="close-button" @click="closeNotification(index)">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorMessage",
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      hovered: false,
      notifications: [],
    };
  },
  watch: {
    messages(newMessages) {
      if (newMessages.length) {
        this.showNotifications(newMessages);
      }
    },
  },
  methods: {
    showNotifications(newMessages) {
      newMessages.forEach((msg) => {
        const notification = {
          message: msg,
          visible: true,
          opacity: 1,
        };
        this.notifications.push(notification);
        this.autoDismiss(notification);
      });
    },
    autoDismiss(notification) {
      setTimeout(() => {
        this.fadeOut(notification);
      }, 5000);
    },
    closeNotification(index) {
      this.fadeOut(this.notifications[index]);
    },
    fadeOut(notification) {
      notification.opacity = 0;
      setTimeout(() => {
        this.notifications = this.notifications.filter(
          (n) => n !== notification
        );
      }, 300);
    },
  },
};
</script>

<style scoped>
.push-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
