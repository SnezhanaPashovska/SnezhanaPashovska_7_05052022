<template>
  <div class="home">
    <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
  </div>
</template>
<style lang="scss">
.home {
  width: 100%;
}

.logoGrupomania {
  width: 95%;
  object-fit: contain;
  filter: invert(18%) sepia(25%) saturate(1883%) hue-rotate(212deg) brightness(92%) contrast(94%);
  height: 500px;
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
