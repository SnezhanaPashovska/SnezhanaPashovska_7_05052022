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
      <div class="signup_form" method="post">
        <div class="name_input">
          <label for="firstname"></label>
          <input type="text" id="firstname" name="name" placeholder="First name" v-model="dataSignup.firstname"
            required>
          <p id="firstnameErrMsg"></p>
        </div>
        <div class="lastname_input">
          <label for="lastname"></label>
          <input type="text" id="lastname" name="lastname" placeholder="Last Name" v-model="dataSignup.lastname"
            required>
          <p id="lastnameErrMsg"></p>
        </div>
        <div class="email_input-signup">
          <label for="email"></label>
          <input type="text" id="email" name="email" placeholder="Email" v-model="dataSignup.email" required>
          <p id="emailErrMsg"></p>
        </div>
        <div class="password_input-signup">
          <label for="password"></label>
          <input type="password" id="password" name="password" placeholder="Password" v-model="dataSignup.password"
            required>
          <p id="passwordErrMsg"></p>
        </div>
        <div id="signup_btn" class="signup_btn">
          <button @click="sendSignup()" id="signup" class="btn_su" type="submit">Sign up</button>
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
  border: 1px solid transparent;
  box-shadow: 0px 1px 12px $lighter-purple;
  -webkit-backdrop-filter: blur 20px;
  backdrop-filter: blur 20px;
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


<script>
import router from '../router'

export default {

  name: "Signup",
  data() {
    return {
      dataSignup:
      {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    sendSignup() {

      const data = {
        ...this.dataSignup
      }

      let namesRegExp = new RegExp(/^[a-zA-Zàâäéèêëïîôöùûüç' -]{1,}$/);
      let emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,30})$/;

      if
        (this.dataSignup.email !== null ||
        this.dataSignup.firstname !== null ||
        this.dataSignup.lastname !== null ||
        this.dataSignup.password !== null &&
        this.dataSignup.firstname,
        namesRegExp.test(this.dataSignup.firstname),
        namesRegExp.test(this.dataSignup.lastname),
        emailRegExp.test(this.dataSignup.email),
        passwordRegExp.test(this.dataSignup.password)
      ) {
        fetch('http://localhost:3000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response);
            this.dataSignup.email = null;
            this.dataSignup.lastname = null;
            this.dataSignup.firstname = null;
            this.dataSignup.password = null;
            alert("The profile has been created")
            router.push({ path: "/login" })
          })
          .catch((error) => console.log(error));
      } else {
        alert("One of the fields is incorrectly filled in. Please enter a valid name and last name containing only letters without special characters or numbers. A valid email address and a valid password between 8 and 30 characters containing at least one Capital letter, at least one lowercase letter, at least one number and at least one special character.")
      }
    },
  },
};






</script>





