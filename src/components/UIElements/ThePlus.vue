<template>
  <div class="plus" @click="handleClick">
    <i class="bi bi-plus"></i>
  </div>
</template>

<script>
export default {
  name: "ThePlus",
  props: {
    columnId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("add-task", this.columnId);
    },
  },
};
</script>

<style>
.bi-plus {
  font-size: 2em;
  color: rgb(77, 63, 63);
}

.plus:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
