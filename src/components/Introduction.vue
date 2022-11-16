<template>
  <section class="introduction">
    <div class="introduction__content">
      <p>Dans cet océan de données internet, chaque “montagne colorée” représente une catégorie de recherche.</p>
      <p>La navigation au scroll permet de visualiser l’évolution des ces recherches sur une période de 2 ans. </p>
      <p>Sur certaines dates ou évènements particuliers, les données impactées afficheront au hover des
        informations.</p>
    </div>
    <button class="introduction__button">
      Commencer l'expérience
    </button>
  </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
.introduction {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  background: linear-gradient(270deg, #222126 -7.18%, rgba(27, 27, 27, 0) 100%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__content {
    margin-bottom: 24px;
    background: rgba(170, 170, 170, 0.49);
    border-radius: 47px;
    max-width: 630px;
    padding: 37px 35px;
    font-size: 16px;
    font-weight: 400;
  }

  &__button {
    background: white;
    color: black;
    border-radius: 37.5px;
    padding: 15px 21px;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
