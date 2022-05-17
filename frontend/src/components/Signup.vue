<template>
  <div id="app">
    <nav class="navigation">
    <router-link to="/signup" class="signUp">Sign up</router-link>
    <router-link to="/login">Sign in</router-link>
  </nav>
    <div class="signup">
      <div class="signup__title">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
      </div>
      <div class="signup_form">
        <div class="name_input">
          <label for="name"></label>
          <input type="text" id="name" name="name" placeholder="Name" required>
        </div>
        <div class="lastname_input">
          <label for="lastname"></label>
          <input type="text" id="lastname" name="lastname" placeholder="Last Name" required>
        </div>
        <div class="email_input-signup">
          <label for="email"></label>
          <input type="text" id="email" name="email" placeholder="Email" required>
        </div>
        <div class="password_input-signup">
          <label for="password"></label>
          <input type="password" id="password" name="password" placeholder="Password" required>
        </div>
        <div id="signup_btn" class="signup_btn">
          <button id="signup" class="btn_su" type="signup">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
//Colors
@import "../styles/variables.scss";
//Mixins
@import "../styles/mixins-signup.scss";

body {
 background-image: url("../assets/background-1536x922.jpg");
 background-color: #cccccc;
  background-size: 100%;
}

 nav {
    width: 100%;
    align-self: center;
    border-bottom: 1px solid $darkest-purple;
    box-shadow: 0px 1px 12px $lighter-purple;
    border-radius: 8px;
    backdrop-filter: blur (20px);
  }

input {
  border-radius: 10px 10px 10px 10px;
  border-color: $darkest-purple;
  color: $darkest-purple;
  padding: 0px 0px 0px 5px;
}

input:focus {
  outline: none !important;
  border-color: $lighter-purple;
  box-shadow: 2px 2px 1px $lighter-purple;
}
a{
  width: 25%;
}

.signup {
  @include signup;
}

.logoGrupomania {
  @include logoGrupomania-t;
}

.signup_form {
  @include signup_form;
}

.name_input {
  @include name_input;
}

.lastname_input {
  @include lastname_input;
}

.email_input-signup {
  @include email_input-signup;
}

.password_input-signup {
  @include password_input-signup;
}

.signup_btn {
  @include signup_btn;
}

.btn_su {
  @include button_su_li;
}

//Large phone and tablet responsive

@media screen and (min-width: 425px) and (max-width: 519.9px) {
  .btn_su {
    @include button_su_li-425;
  }

}

@media screen and (min-width: 520px) and (max-width: 768px) {


  .signup {
    @include signup-t;
  }

  .signup_form {
    @include signup_form-t;
  }


  .signup_btn {
    @include signup_btn-t;
  }

  .btn_su {
    @include button_su_li-t;
  }

  .logoGrupomania {
    @include logoGrupomania-tl;
  }

}

//Tablet and small laptop responsive

@media screen and (min-width: 768px) and (max-width: 991px) {
   a{
    width: 15%
  }


  .signup {
    @include signup-tl;
  }

  .signup_form {
    @include signup_form-tl;
  }

  .signup_btn {
    @include signup_btn-tl;
  }

  .btn_su {
    @include button_su_li-t;
  }

  .logoGrupomania {
    @include logoGrupomania-tl;
  }
}

//Laptop screen responsive
@media screen and (min-width: 991px) and (max-width: 1200px) {

  nav {
    width: 100%;
    align-self: center;
    border-bottom: 1px solid $darkest-purple;
    box-shadow: 0px 1px 12px $lighter-purple;
    border-radius: 8px;
    backdrop-filter: blur (20px);
  }
 a{
    width: 10%
  }



  .signup {
    @include signup-tl;
  }

  .signup_form {
    @include signup_form-tl;
  }


  .signup_btn {
    @include signup_btn-tl;
  }

  .btn_su {
    @include button_su_li-t;
  }

  .logoGrupomania {
    @include logoGrupomania-l;
  }
}

@media screen and (min-width: 1200px) {
  nav {
    width: 100%;
    align-self: center;
    border-bottom: 1px solid $darkest-purple;
    box-shadow: 0px 1px 12px $lighter-purple;
    border-radius: 8px;
    backdrop-filter: blur (20px);
  }

  a{
    width: 10%
  }
  .name_input{
    @include name_input-xxl;
  }
  .lastname_input{
    @include lastname_input-xxl;
  }
  .email_input-signup{
    @include email_input-signup-xxl
  }
  .password_input-signup{
    @include password_input-signup-xxl
  }

  .signup_btn {
    @include signup_btn-xl;
  }

  .btn_su {
    @include button_su_li-xl;
  }

  .logoGrupomania {
    @include logoGrupomania-xl;
  }
}

@media screen and (min-width: 1920px) {

  .signup_btn {
    @include signup_btn-xxl;
  }
}
</style>


<script src="../js/signupPage.js" async>

</script>





