<template>
  <theHeader/>
  <theMain/>
</template> 

<script>
import theHeader from './components/Header.vue'
import theMain from './components/Main.vue'

export default {
  name: 'TheApp',

  components: {
    theHeader, theMain
  }
}
</script>

<style>

</style>