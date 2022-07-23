<template>
  <div class="home">
  </div>
  <div class="links">
    <router-link to="/login" class="signIn" title="Sign in">Sign in</router-link>
    <router-link to="/signup" class="signUp">Sign up</router-link>
  </div>
  <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
</template>
<style lang="scss">
@import "../styles/variables.scss";

.home {
  width: 100%;
  box-sizing: content-box;
}

.logoGrupomania {
  object-fit: cover;
  width: 40%;
  height: 40px;
  filter: invert(100%) sepia(0%) saturate(7491%) hue-rotate(236deg) brightness(103%) contrast(100%);
}

.welcome {
  width: 25%;
  justify-self: center;
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .links {
    width: 50%;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .links {
    width: 40%;
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {
  .links {
    width: 40%;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1920px) {
  .links {
    width: 35%;
  }
}

@media screen and (min-width: 1200px) {
  .links {
    width: 30%;
  }
}
</style>
<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
  }
}
</script>
