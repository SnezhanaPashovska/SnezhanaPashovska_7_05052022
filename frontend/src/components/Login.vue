<template>
  <div id="app">
    <nav class="navigation">
    <router-link to="/signup" class="signUp">Sign up</router-link>
    <router-link to="/login">Sign in</router-link>
  </nav>
    <div class="login">
      <div class="title">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania-li">
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

  .login {
    @include login-t;
  }

  .login_form {
    @include login_form-t;
  }

  .email_input-login {
    @include email_input-login-t;
  }

  .password_input-login {
    @include password_input-login-t;
  }

  .login_btn {
    @include login_btn-t;
  }

  .btn_li {
    @include button_su_li-t;
  }

  .logoGrupomania-li {
    @include logoGrupomania-li-tl;
  }
}

//Tablet and small laptop responsive
@media screen and (min-width: 768px) and (max-width: 991px) {

  .login {
    @include login-tl;
  }

  .login_form {
    @include login_form-tl;
  }

  .email_input-login {
    @include email_input-login-tl;
  }

  .password_input-login {
    @include password_input-login-tl;
  }

  .login_btn {
    @include login_btn-tl;
  }

  .btn_li {
    @include button_su_li-tl;
  }

  .logoGrupomania-li {
    @include logoGrupomania-li-tl;
  }
}

//Laptop screen responsive
@media screen and (min-width: 991px) and (max-width: 1200px) {

  .login {
    @include login-tl;
  }

  .login_form {
    @include login_form-tl;
  }

  .email_input-login {
    @include email_input-login-tl;
  }

  .password_input-login {
    @include password_input-login-tl;
  }

  .login_btn {
    @include login_btn-tl;
  }

  .btn_li {
    @include button_su_li-tl;
  }

  .logoGrupomania-li {
    @include logoGrupomania-li-l;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1920px) {
  .logoGrupomania-li {
    @include logoGrupomania-li-xl;
  }

  .login_btn {
    @include login_btn-xl;
  }

  .btn_li {
    @include button_su_li-xl;
  }

  .login_form {
    @include login_form-xl;
  }

  .login {
    @include login-xl;
  }
}

@media screen and (min-width: 1920px) {
  nav {
    height: 200px;
  }

  a {
    font-size: 40px;
  }

  .logoGrupomania-li {
    @include logoGrupomania-li-xl;
  }

  .login_form {
    @include login_form-xl;
  }

  .email_input-login {
    @include email_input-login-xl;
  }

  .password_input-login {
    @include password_input-login-xl;
  }

  .login_btn {
    @include login_btn-xxl;
  }

  .btn_li {
    @include button_su_li-xl;
  }

  .login {
    @include login-xxl;
  }
}
</style>
