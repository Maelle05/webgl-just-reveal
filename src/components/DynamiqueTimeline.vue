<template>
  <div class="timeline">
    <h2 class="timeline__date">{{ scrollValue.week }}</h2>
    <ul class="timeline__wrapper">
      <li class="timeline__item"></li>
      <li class="timeline__item--lockdown"></li>
      <li class="timeline__item"></li>
    </ul>
  </div>
</template>

<script setup>
import Scene from '../webgl/Scene'

</script>

<script>
export default {
  data() {
    return {
      scrollValue: {
        week: ''
      }
    }
  },
  mounted() {
    const myScene = new Scene()

    setInterval(() => {
      this.getData = myScene.webgl.scroll.getDataValue()

     // todo mettre dans un utils
      this.date = new Date(this.getData.week)
      this.month = ["janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"][this.date.getMonth()]
      this.scrollValue.week = this.date.getDate() + ' ' + this.month + ' ' + this.date.getFullYear()

    }, 500)
  }
}
</script>

<style scoped lang="scss">
.timeline {
  position: fixed;
  user-select: none;
  right: 0;
  top: 0;
  text-align: right;

  min-width: 236px;
  height: 100vh;
  background: linear-gradient(270deg, #222126 -7.18%, rgba(27, 27, 27, 0) 100%);

  &__date {
    font-size: 40px;
    margin: 32px 37px 20vh 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin: 32px 37px 0 0;
  }

  &__item {
    height: 37px;
    width: 6px;
    border-radius: 10px;
    background: white;
    margin-bottom: 8px;

    &--lockdown {
      height: 18px;
      width: 6px;
      background: rgba(255, 121, 91, 1);
      margin-bottom: 8px;
    }
  }
}
</style>
