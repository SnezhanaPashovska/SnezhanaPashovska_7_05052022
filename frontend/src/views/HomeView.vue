<template>
  <div class="home">
   
  </div>
  <div class="links">
    <router-link class="welcome" to="/signup">Sign up</router-link>
    <router-link class="welcome" to="/login">Sign in</router-link>
    
  </div>
  <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
</template>
<style lang="scss">



.home {
  width: 100%;
  box-sizing: content-box;
}

.logoGrupomania {
  width: 95%;
  object-fit: contain;
  filter: invert(18%) sepia(25%) saturate(1883%) hue-rotate(212deg) brightness(92%) contrast(94%);
  height: 250px;
  justify-self: center;
}

.links {
  width: 85%;
  display: inline-flex;
  font-family: 'Lato', sans-serif;
  align-self: center;
  justify-items: center;
  justify-content: space-around;
}

.welcome {

  width: 25%;
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
