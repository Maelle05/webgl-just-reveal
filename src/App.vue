<script setup>
import Logo from './components/Logo.vue'
import Scene from '../src/webgl/Scene'
import Introduction from '@/components/Introduction.vue'

</script>

<template>
  <header>
    <!-- <Introduction/> -->
    <Logo />
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
