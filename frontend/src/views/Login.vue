<template>
  <div id="app">
    <header></header>
    <div class="login">
      <div class="title">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
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
    <footer></footer>
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

.logoGrupomania {
  @include logoGrupomania;
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

  .logoGrupomania {
    @include logoGrupomania-tl;
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

  .logoGrupomania {
    @include logoGrupomania-tl;
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

  .logoGrupomania {
    @include logoGrupomania-li-l;
  }

  @media screen and (min-width: 1200px) and (max-width: 1920px) {
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

    .logoGrupomania {
      @include logoGrupomania-li-xl;
    }
  }

}
</style>
