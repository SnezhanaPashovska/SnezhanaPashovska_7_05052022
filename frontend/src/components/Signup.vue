<template>
  <div id="app">
    <nav class="navigation">
      <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
    </nav>
    <div class="signup">
      <div class="links">
        <router-link to="/signup" class="signUp">Sign up</router-link>
        <router-link to="/login" class="signIn">Sign in</router-link>
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
  background-color: $light-beige;
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

a {
  width: 25%;
}

.links {
  @include links;
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
  a {
    width: 15%
  }


  .signup {
    @include signup-tl;
  }

  .links {
    @include links-tl;
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


  a {
    width: 10%
  }

  .links {
    @include links
  }

  .signUp {
    @include signUp
  }

  .signIn {
    @include signIn
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

@media screen and (min-width: 1201px) {


  a {
    width: 10%
  }

  .name_input {
    @include name_input-xxl;
  }

  .lastname_input {
    @include lastname_input-xxl;
  }

  .email_input-signup {
    @include email_input-signup-xxl
  }

  .password_input-signup {
    @include password_input-signup-xxl
  }

  .signUp {
    @include signUp
  }

  .signIn {
    @include signIn
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





