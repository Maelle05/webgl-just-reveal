<template>
    <h1>{{nameTitre}}</h1>
</template>

<script>
export default {
    props: {
      nameTitre: String
    },
    data() {
        return {
        }
    }
}

</script>

<style scoped>
h1{
  color: white;
}
</style>
