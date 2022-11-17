<script setup>
import Logo from './components/Logo.vue'
import Scene from '../src/webgl/Scene'
import Introduction from '@/components/Introduction.vue'
import DynamiqueTimeline from '@/components/DynamiqueTimeline.vue'

</script>

<template>
  <header>
    <Logo />
  </header>
  <Introduction ref="introductionRef"/>
  <DynamiqueTimeline />
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
