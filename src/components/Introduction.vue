<template>
  <section class="introduction" ref="introductionRef">
    <div class="introduction__content">
      Covid trends

      <svg class="introduction__logo" width="86" height="119" viewBox="0 0 86 119" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="loading__left" y="48.375" width="21.5" height="69.875" fill="#7209B7"/>
        <rect class="loading__middle" x="32.25" width="21.5" height="118.25" fill="#7209B7"/>
        <rect class="loading__right" x="64.5" y="26.875" width="21.5" height="91.375" fill="#7209B7"/>
      </svg>

    </div>

    <p class="introduction__label">Plongez dans l'océan d'internet.</p>

    <button class="introduction__button" @click="hideModal">
      Commencer l'expérience
    </button>

    <div class="introduction__names">
      <p>Marie Majou</p>
      <p>Maëlle Rabouan</p>
      <p>Justin Quillévéré</p>
      <p>Léonie Grimoin</p>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue"

const introductionRef = ref()

const hideModal = () => {
  introductionRef.value.classList.add('u-hidden')

  setTimeout(() => {
    document.getElementsByClassName('timeline')[0].classList.remove('u-hidden')
    document.getElementsByClassName('title')[0].classList.remove('u-hidden')
  }, 500)
}
</script>

<style scoped lang="scss">
.introduction {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  background: linear-gradient(270deg, #222126 -7.18%, rgba(27, 27, 27, 0) 100%);

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__logo {

    .loading {
      &__left {
        transform-origin: bottom;
        animation: loading-bar-morph 1.5s linear .1s infinite
      }

      &__middle {
        transform-origin: bottom;
        animation: loading-bar-morph 1.5s linear .2s infinite
      }

      &__right {
        transform-origin: bottom;
        animation: loading-bar-morph 1.5s linear .4s infinite


      }
    }

    @keyframes loading-bar-morph{
      0% {
        transform: scaleY(1);
        fill: #F72585;

      }
      25% {
        transform: scaleY(0.3);
        fill: #3A0CA3;
      }
      50% {
        transform: scaleY(0.7);
        fill: #4CC9F0;

      }
      75% {
        transform: scaleY(0.15);
        fill: #7209B7;
      }
    }
  }

  &__label {
    margin-bottom: 3%;
    font-size: 18px;
  }

  &__content {
    margin-bottom: 24px;
    font-size: 130px;
    font-weight: 600;

    img {
      height: 214px;
      margin-right: 15px;
    }

    p {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__names {
    display: flex;
    width: 100%;
    justify-content: space-around;
    font-weight: 300;
    position: absolute;
    bottom: 37px;
  }

  &__button {
    background: white;
    color: black;
    border-radius: 37.5px;
    padding: 15px 21px;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
  }
}
</style>
