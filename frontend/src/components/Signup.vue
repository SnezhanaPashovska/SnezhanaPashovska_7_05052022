<template>
  <div class="signup">
    <div id="app_signup">
      <nav class="navigation">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Grupomania" class="logoGrupomania">
      </nav>
      <p class="signup-headline">Create new account</p>
      <div class="signup_form" method="post">
        <div class="name_input">
          <label for="firstname"></label>
          <input type="text" id="firstname" name="name" placeholder="First Name" v-model="dataSignup.firstname"
            required>
          <span class="name_input__separator"> </span>
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
          <button @click="sendSignup()" id="signup" class="btn_su" type="submit">Create account</button>
        </div>
      </div>
    </div>
    <div class="links">
      <p class="account">Already have an account?</p>
      <router-link to="/login" class="signIn" title="Sign in">Sign in</router-link>
    </div>
  </div>
</template>

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

      //Checking validity
      let namesRegExp = new RegExp(/^[a-zA-Zàâäéèêëïîôöùûüç' -]{1,}$/);
      let emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{10,30})$/;

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
            this.dataSignup.email = null;
            this.dataSignup.lastname = null;
            this.dataSignup.firstname = null;
            this.dataSignup.password = null;
            alert("The profile has been created")
            router.push({ path: "/login" })
          })
          .catch((error) => console.log(error));
      } else {

        //Error messages

        // Firstname error
        const errMsgFirstname = document.getElementById('firstnameErrMsg');
        errMsgFirstname.innerHTML = "<p>The name must contain at least one letter<p>";
        // Lastname error
        const errMsgLastname = document.getElementById('lastnameErrMsg');
        errMsgLastname.innerHTML = "<p>The last name must contain at least one letter<p>";
        //Email error
        const emailErrMsg = document.getElementById('emailErrMsg');
        emailErrMsg.innerHTML = "<p>Please enter a valid email<p>";
        //Password error
        const passwordErrMsg = document.getElementById('passwordErrMsg');
        passwordErrMsg.innerHTML = "<p>The password must contain between 8 to 30 characters, including at least one capital letter, a number and a special character<p>";

      }
    },
  },
};
</script>

<style lang="scss">
//Colors
@import '../styles/variables';

//Mixins
@import '../styles/mixins-signup';

a {
  color: $darkest-purple;

  &:hover {
    color: $dark-purple;
  }
}

.signup {
  @include signup;
}

.signup-headline {
  @include signup-headline;
}

.signup_form {
  @include signup_form;
}

.name_input {
  @include name_input;
}

.lastname_input {
  @include name_input;
}

.email_input-signup {
  @include email_input-signup
}

.password_input-signup {
  @include password_input-signup;
}

.signup_btn {
  @include signup_btn;
}

.links {
  @include links;
}

@media screen and (min-width: 612px) and (max-width: 768px) {

  .signup_form {
    @include signup_form-tablet;
  }

  .signup-headline {
    @include signup-headline-tablet;
  }

  .links {
    @include links-tablet;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .signup_form {
    @include signup_form-tablet-laptop;
  }

  .signup-headline {
    @include signup-headline-tablet-laptop;
  }

  .links {
    @include links-tablet-laptop;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

  .signup_form {
    @include signup_form-large-screen;
  }

  .signup-headline {
    @include signup-headline-large-screen;
  }

  .links {
    @include links-large-screen;
  }

}

@media screen and (min-width: 1201px) {
  .signup_form {
    @include signup_form-xlarge-screen;
  }

  .signup-headline {
    @include signup-headline-xlarge-screen;
  }

  .links {
    @include links-xlarge-screen;
  }
}
</style>





