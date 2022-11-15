<script setup>
import VTitre from './components/VTitre.vue'
import Scene from './webgl/Scene'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/svg/logo.svg" width="25" height="25" /> -->
    <VTitre nameTitre="ça marche woupiiiii" />
  </header>
</template>

<script>
export default {
  mounted() {
    const myScene = new Scene()
  }
}
</script>

<style scoped>

</style>
