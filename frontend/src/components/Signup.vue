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
      <div class="signup_form" method="post" @submit.prevent="signup()">
        <div class="name_input">
          <label for="name"></label>
          <input type="text" id="name" name="name" v-model="name" placeholder="Name" required>
          <!-- <p>Please enter a valid name</p> -->
        </div>
        <div class="lastname_input">
          <label for="lastname"></label>
          <input type="text" id="lastname" name="lastname" v-model="lastname" placeholder="Last Name" required>
          <!--  <p>Please enter a valid lastname</p> -->
        </div>
        <div class="email_input-signup">
          <label for="email"></label>
          <input type="text" id="email" name="email" v-model="email" placeholder="Email" required>
          <!-- <p>Please enter a valid email address</p> -->
        </div>
        <div class="password_input-signup">
          <label for="password"></label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Password" required>
          <!-- <p>Please enter a valid password</p> -->
        </div>
        <div id="signup_btn" class="signup_btn">
          <button @click="signup" href="./ProfilePage.vue" id="signup" class="btn_su" type="signup">Sign up</button>
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


<script>

const axios = require('axios').default;
let nameError = document.getElementsByClassName('name_input')


export default {
  data() {
    return {
      name: null,
      lastname: null,
      email: null,
      password: null
    }
  },
  methods: {

    signup() {
      let nameInput = document.getElementById('name');
      let lastnameInput = document.getElementById('lastname');
      let emailInput = document.getElementById('email');
      let passwordInput = document.getElementById('password');

      //Dom

      let nameError = document.getElementsByClassName('name_input');
      let lasnameError = document.getElementsByClassName('lastname_input');
      let emailError = document.getElementsByClassName('email_input-signup');
      let passwordError = document.getElementsByClassName('password_input-signup');

      if (nameInput.value === null || lastnameInput.value === null || emailInput.value === null || passwordInput.value === null) {
        nameError.innerHTML = "<p>Please enter a valid name</p>";
        lasnameError.innerHTML = "<p>Please enter a valid lastname</p>";
        emailError.innerHTML = "<p>Please enter a valid email</p>";
        passwordError.innerHTML = "<p>Please enter a valid name</p>";
      }
      else {
        axios.post('http://localhost:3000/api/users', {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

}

</script>





