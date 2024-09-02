<template>
  <theHeader />
  <router-view></router-view>
</template>

<script>
import theHeader from "./components/TheHeader.vue";

export default {
  components: {
    theHeader,
  },
};
</script>
