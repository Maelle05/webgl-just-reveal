<script setup>
import Logo from './components/Logo.vue'
import Scene from '../src/webgl/Scene'
import Introduction from '@/components/Introduction.vue'
import DynamiqueTimeline from '@/components/DynamiqueTimeline.vue'
import Scroll from '@/components/Scroll.vue'
import MobileVersion from '@/components/MobileVersion.vue'

</script>

<template>
  <MobileVersion v-if="viewportW < 850"/>
  <header v-if="viewportW > 851">
    <Logo />
  </header>
  <main v-if="viewportW > 851">
    <Introduction />
    <DynamiqueTimeline />
    <Scroll />
  </main>
</template>

<script>
export default {
  mounted() {
    const myScene = new Scene()
  },
  data() {
    return {
      viewportW: window.innerWidth,
    }
  },
}
</script>

<style scoped>

</style>
