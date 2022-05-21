<template>
  <div id="app">
    <nav class="navigation">
      <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania-li">
    </nav>
    <div class="signin">
      <div class="links">
        <router-link to="/signup" class="signUp">Sign up</router-link>
        <router-link to="/login" class="signIn">Sign in</router-link>
      </div>
      <div class="login_form">
        <div class="email_input-login">
          <label for="email"></label>
          <input type="text" id="email" name="email" placeholder="Email" required>
        </div>
        <div class="password_input-login">
          <label for="password"></label>
          <input type="password" id="password" name="password" placeholder="Password" required>
        </div>
        <div class="login_btn">
          <button class="btn_li">Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
//Colors
@import "../styles/variables.scss";
//Mixins
@import "../styles/mixins-login.scss";

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

.signin {
  @include signin;
}

.logoGrupomania-li {
  @include logoGrupomania-li;
}

.login_form {
  @include login_form;
}

.email_input-login {
  @include email_input-login;
}

.password_input-login {
  @include password_input-login;
}

.login_btn {
  @include login_btn;
}

.btn_li {
  @include button_su_li;
}

//Large phone and tablet responsive
@media screen and (min-width: 425px) and (max-width: 519.9px) {
  .btn_li {
    @include button_su_li-425;
  }

}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .signin {
    @include signin-t;
  }

  .login_form {
    @include signin_form-t
  }

  .logoGrupomania-li {
    @include logoGrupomania-tl;
  }

  .email_input-login {
    @include email_input-signin-t
  }

  .password_input-login {
    @include password_input-signin-t
  }

  .login_btn {
    @include signin_btn-t
  }

  .btn_li {
    @include button_su_si-t
  }


}

//Tablet and small laptop responsive
@media screen and (min-width: 768px) and (max-width: 991px) {
  .signin {
    @include signin-tl;
  }

  .login_form {
    @include login-form-tl
  }

  .logoGrupomania-li {
    @include logoGrupomania-tl;
  }


}

//Laptop screen responsive
@media screen and (min-width: 991px) and (max-width: 1200px) {

  .signin {
    @include signin-tl
  }

  .login_btn {
    @include sigin_btn-tl
  }

  .btn_li {
    @include button_si_li-425
  }

  .login_form {
    @include sigin_form-tl
  }

  .logoGrupomania-li {
    @include logoGrupomania-li-l
  }
}

@media screen and (min-width: 1201px) {

  .logoGrupomania-li {
    @include logoGrupomania-li-tl
  }

  .email_input-login {
    @include email_input-signin-xxl;
  }

  .password_input-login {
    @include password_input-signin-xxl
  }

  .login_btn {
    @include signin_btn-xl;
  }

  .btn_li {
    @include button_su_si-xl;
  }

  .signin {
    @include signin-xl;
  }

  .login_form {
    @include login-form-xl;
  }

  @media screen and (min-width: 1920px) {}

}
</style>
