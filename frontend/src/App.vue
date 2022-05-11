<template>
  <nav>
    <router-link to="/signup">Sign up</router-link> 
    <router-link to="/login">Sign in</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/mixins-signup.scss";

* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
  //border: 1px solid red;
}

#app {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  font-weight: 400px;
}

a {
  text-decoration: none;
  color: #332c62;
  font-size: 20px;
  width: 25%;
  padding-top: 23px;

}

a:hover {
  text-decoration: none;
  color: $lighter-purple;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  
}
</style>
