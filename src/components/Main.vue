<template>
    <theKanban/>
    <theModal/>
    <deleteConfirm/>
</template>

<script>
import theKanban from './Kanban.vue'
import theModal from './Modal.vue'
import deleteConfirm from './DeleteConfirm.vue'

export default {
  name: 'TheMain',

  components: {
    theKanban, theModal, deleteConfirm
  }
}
</script>

<style>

</style>