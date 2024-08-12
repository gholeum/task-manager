<template>
    <div>
        <img src="https://kartinki.pics/pics/uploads/posts/2022-09/1663621633_1-kartinkin-net-p-grustnaya-sobachka-vkontakte-1.jpg" alt="фотография">
        <h1>Это {{ dogName }}</h1>
        <h3><strong>Возраст:</strong> {{ dogAge }}</h3>
        <p>живёт в конуре ({{dogHome}})</p>
        <button @click="changeDog">хочу настоящую сабачку</button>
    </div>
</template>

<script>
export default {
  name: 'dogCard',

  data() {
    return {
        dogName: "собака",
        dogAge: "никто не знает(((",
        dogHome: "наверное"
    }
  },

  methods: {
    changeDog() {
      this.dogName = "настоящая сабачка урааа";
      this.dogAge = "стоп...";
      this.dogHome = "точно"
    }
  },
}
</script>

<style>
div {
  align-items: center;
  text-align: center;
}

img {
  width:20%;
  height: auto
}

h1 {
  color: #888;
  font-size: 24pt
}

h3 {
  color: #777
}

p {
  color: #666
}

button {
  background-color: black;
  width: 200px; 
  height: auto;
  font-size: 18px;
  color: #fff;
  border-radius: 30px
}
</style>