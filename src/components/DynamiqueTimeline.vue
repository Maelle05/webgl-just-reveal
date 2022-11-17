<template>
  <div class="timeline">
    <div class="timeline__header u-hidden">
      <h2 class="timeline__date">{{ scrollValue.week }}</h2>
      <p v-if="scrollValue.isLockdown === true" class="timeline__label">Confinement</p>
      <div v-if="scrollValue.isLockdown === true" class="timeline__label--underline"/>
    </div>

    <div class="timeline__container u-hidden">
      <div class="timeline__year">
        <p>2020</p>
        <p>2022</p>
      </div>
      <ul class="timeline__wrapper">
        <li class="timeline__item" v-for="(period) in newData"
            :class="{ 'timeline__item--isActive': period.some(current => current.week === getData.week)}"
            :style="`height: calc(${period.length}px * 3)`"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Scene from '../webgl/Scene'
import data from '/public/assets/content/data'
</script>

<script>
export default {
  data() {
    return {
      scrollValue: {
        week: '',
        isLockdown: false
      },
      newData: {},
      getData: {
        week: ''
      }
    }
  },
  mounted() {

    const myScene = new Scene()
    this.getStaticData = data.content

    this.firstPeriod = []
    this.firstLockdown = []
    this.secondPeriod = []
    this.secondLockdown = []
    this.thirdPeriod = []
    this.thirdLockdown = []
    this.fourthPeriod = []

    const lockdownsDate = [
      '2020-01-01', '2020-03-16',
      '2020-03-17', '2020-05-03',
      '2020-05-04', '2020-10-29',
      '2020-10-30', '2020-12-15',
      '2020-12-16', '2021-04-02',
      '2021-04-03', '2021-05-03',
      '2021-05-04', '2022-01-30',
    ]

    this.getStaticData.map((week, i) => {
      if (new Date(week.week) > new Date(lockdownsDate[0]) && new Date(week.week) < new Date(lockdownsDate[1])) {
        // first period
        this.firstPeriod.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[2]) && new Date(week.week) < new Date(lockdownsDate[3])) {
        // first lockdown
        this.firstLockdown.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[4]) && new Date(week.week) < new Date(lockdownsDate[5])) {
        // second period
        this.secondPeriod.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[6]) && new Date(week.week) < new Date(lockdownsDate[7])) {
        // second lockdown
        this.secondLockdown.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[8]) && new Date(week.week) < new Date(lockdownsDate[9])) {
        // third period
        this.thirdPeriod.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[10]) && new Date(week.week) < new Date(lockdownsDate[11])) {
        // third lockdown
        this.thirdLockdown.push(week)

      } else if (new Date(week.week) > new Date(lockdownsDate[12]) && new Date(week.week) < new Date(lockdownsDate[13])) {
        // four period
        this.fourthPeriod.push(week)
      }
    })

    this.newData = {
      '0': this.firstPeriod,
      '1': this.firstLockdown,
      '2': this.secondPeriod,
      '3': this.secondLockdown,
      '4': this.thirdPeriod,
      '5': this.thirdLockdown,
      '6': this.fourthPeriod,
    }

    setInterval(() => {
      this.getData = myScene.webgl.scroll.getDataValue()

      // todo mettre dans un utils
      this.date = new Date(this.getData.week)
      this.month = ["janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"][this.date.getMonth()]

      this.scrollValue.week = this.date.getDate() + ' ' + this.month + ' ' + this.date.getFullYear()
      this.scrollValue.isLockdown = this.getData.isLockdown

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
  opacity: 1;
  visibility: visible;

  min-width: 236px;
  height: 100vh;
  background: linear-gradient(270deg, #222126 -7.18%, rgba(27, 27, 27, 0) 100%);

  &__header {
    margin-bottom: 16vh;
    position: relative;
    min-height: 98px;
  }

  &__label {
    font-size: 24px;
    margin-right: 37px;
    font-weight: 300;


    &--underline {
      position: absolute;
      height: 6px;
      width: 119px;
      background: #FF795B;
      right: 0;
    }
  }

  &__date {
    font-size: 40px;
    margin: 32px 37px 10px 0;
  }

  &__container {
    display: flex;
    justify-content: end;
  }

  &__year {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 300;
    margin-right: 17px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin: 0 37px 0 0;
  }

  &__item {
    width: 6px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;

    &--isActive {
      background: rgba(255, 255, 255, 1);

      &:nth-child(2n) {
        background: rgba(255, 121, 91, 1) !important;
      }

      &:last-child {
        background: rgba(255, 255, 255, 1) !important;
      }
    }

    &:nth-child(2n) {
      height: 18px !important;
      width: 6px;
      background: rgba(255, 121, 91, 0.4);
      margin-bottom: 8px;
      border-radius: 0;

    }

    &:last-child {
      width: 6px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.4);
      margin-bottom: 0;
    }
  }
}
</style>
