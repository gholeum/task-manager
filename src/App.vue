<template>
<div>
  <h1>Счётчик</h1>

  <p>Счёт: <strong>{{ count }}</strong></p>

  <button @click="increment">Действие <strong> + 1</strong></button>
  <button @click="etobudetminus">Действие <strong> - 1</strong></button>
</div>
  <dogCard/>
</template> 

<script>
import dogCard from './components/DogCard.vue'

export default {
  name: 'TheApp',

  components: {
    dogCard,
  },

  data() {
    return {
        count: 0
    }
  },

  methods: {
    increment() {
      this.count += 1;
    },
    etobudetminus() {
      this.count -= 1;
    },
  },
}
</script>

<style>
div {
  align-items: center;
  text-align: center;
}
button {
  background-color: red;
  color: white;
  width: 250px;
  height: auto;
  border-radius: 0px 30px;
  border: 2px dashed black;
  font-size: 20pt
}
p {
  font-size: 36pt;
  color: red
}
  </style>