<template>
  <p class="scroll u-hidden">Scroll</p>
</template>

<script setup>

</script>

<style lang="scss">
.scroll {
  font-size: 20px;
  text-transform: uppercase;
  position: fixed;
  bottom: 37px;
  left: 50%;
  transform: translateX(-50%);
  animation: fade .8s linear infinite alternate-reverse;

  @keyframes fade {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}
</style>
