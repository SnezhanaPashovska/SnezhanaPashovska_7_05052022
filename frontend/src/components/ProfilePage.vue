<template >
  <div class="wrap">
    <div class="profile_page">
      <nav class="profile_page_nav">
        <router-link title="News Feed" class="link-icon" to="/Newsfeed"><i class="fa-solid fa-arrow-left-long"></i>
        </router-link>
        <div class="profile_page_nav__settings-icon">
          <router-link title="Settings" class="settings-icon" to="/Settings"><i class="fa-solid fa-gear"></i>
          </router-link>
        </div>
      </nav>

      <section class="section">
        <div class="row">
          <div class="col-1-of-2">
            <div class="header_section">
              <div class="header_section__profile-photo">
                <img alt="Profile photo" :src="photoUrl">
              </div>
              <div class="header_section__information">
                <p class="header_section__information-name">{{ firstname }} </p>
                <p class="header_section__information-lastname">{{ lastname }}</p>
              </div>
              <div class="header_section__settings">
              </div>
            </div>
          </div>
          <div class="col-1-of-2">
            <div class="about_section">
              <div class="about_section__text">
                <h1 class="about_section__text-title">
                  About
                </h1>
                <p class="about_section__text-description">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-1-of-3">
          </div>
        </div>
      </section>
      <div class="footer_section">
        <div @click="signOut()" class="footer_section__signout" title="Sign out">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'ProfilePage',

  //store data - has an object as its value, it accepts any pair key-value like in Java Script
  data() {
    return {
      idUser: Number,
      firstname: "",
      lastname: "",
      photoUrl: "",
      isAdmin: false,
      description: "",
      status: "",
    }
  },
  // Mounted = what happens when we go to the page
  mounted() {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));
    let idUser = localStorageData;
    let token = localStorage.token;

    //Fetching Data
    fetch(`http://localhost:3000/api/users/${idUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then((response) => {
        response.json()
          .then((data) => {
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.photoUrl = data.photoUrl;
            this.id = data.idUser;
            this.description = data.description
            this.isAdmin = data.isAdmin;
            if (data.isAdmin == true) {
              this.status = "Success";
            }
            if (data.photoUrl != "") {
              this.photoUrl = data.photoUrl;
            }
          });
      })
      .catch((error) => console.log(error, 'error'));
  },
  //accesible from the template usually used as an event listener
  methods: {
    signOut: function () {
      localStorage.clear();
      alert("You have signed out")
      this.$router.push("/");
    }
  }
}

</script>

<style lang="scss" scoped>
//Mixins
@import "../styles/mixin-profile.scss";

//Colors
@import "../styles/variables.scss";

a {
  color: white;
  width: 10%;
}

.profile_page {
  @include profile-page;
}

.header_section {
  @include header_section;
}

.about_section {
  @include about_section;
}

.footer_section {
  @include footer_section;
}

@media screen and (min-width: 481px) and (max-width: 768px) {

  .header_section {
    @include header_section-tablet;
  }

  .about_section {
    @include about_section-tablet;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {

  .header_section {
    @include header_section-laptop;
  }

  .about_section {
    @include about_section-laptop;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

  a {
    color: $darkest-purple;
  }

  .profile_page {
    @include profile-page-desktop;
  }

  .header_section {
    @include header_section-desktop;
  }

  .wrap {
    background-image: linear-gradient(to bottom left, $darkest-purple, $dark-purple, $lighter-purple, $light-pink);
  }

  .about_section {
    @include about_section-desktop;
  }

  .footer_section {
    @include footer_section-desktop;
  }
}

@media screen and (min-width: 1201px) {

  a {
    color: $darkest-purple;
  }

  .profile_page {
    @include profile-page-xl-desktop;
  }

  .header_section {
    @include header_section-xl-desktop;
  }

  .wrap {
    background-image: linear-gradient(to bottom left, $darkest-purple, $dark-purple, $lighter-purple, $light-pink);
  }

  .about_section {
    @include about_section-xl-desktop;
  }

  .footer_section {
    @include footer_section-xl-desktop;
  }

}
</style>

