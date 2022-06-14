<template>
  <div class="settings_page">
    <nav class="settings_page__nav">
      <router-link title="Profile Page" class="link-icon-profile" to="/ProfilePage"><i class="fa-solid fa-user"></i>
      </router-link>
    </nav>
    <section class="section">
      <div class="row">
        <div class="col-1-of-2">
          <div class="settings_change">
            <div class="settings_change__photo">
              <img :src="photoUrl" alt="Profile photo" class="settings_change__photo__image">
              <div class="choose-an-image">
                <label for="choose-image">
                  <i class="fa-solid fa-camera" title="Choose a file" id="upload_image"></i>
                  <input @change="onFileSelected($event)" type="file" class="settings_change__photo__upload"
                    id="choose-image">
                </label>
              </div>
            </div>
            <div class="settings_change__names">
              <div class="settings_change__names__firstname">
                <label for="firstname">
                  <input type="text" class="firstname" v-model.trim="firstname">
                </label>
              </div>
              <div class="settings_change__names__lastname">
                <label for="lastname">
                  <input type="text" class="lastname" v-model.trim="lastname">
                </label>
              </div>
            </div>
            <div class="settings_change__description">
              <textarea v-model.trim="description" type="text" class="description"></textarea>
            </div>
            <div class="settings_change__save">
              <button @click="saveUserInfo()" class="settings_change__save__btn" type="submit" title="Save changes">
                <i class="fa-solid fa-floppy-disk"></i>
              </button>
            </div>
            <div class="settings_change__delete">
              <button @click="deleteAccount()" class="settings_change__delete__btn" type="submit"
                title="Delete account">
                <i class="fa-solid fa-ban"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: "Settings",

  data() {
    return {
      idUser: Number,
      firstname: "",
      lastname: "",
      photoUrl: "",
      isAdmin: false,
      description: "",
      photoUrlToUpload: "",
    }
  },

  mounted: function () {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));

    const idUser = localStorageData;
    let token = localStorage.token;

    fetch(`http://localhost:3000/api/users/${idUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        if (response.status == 401 || response.status == 500) {
        } else {
          response.json()
            .then((data) => {
              this.firstname = data.firstname,
                this.lastname = data.lastname,
                this.description = data.description,
                this.photoUrl = data.photoUrl
            })
            .catch((error) => console.log(error));
        }

      })
      .catch((error) => console.log(error));
  },

  methods: {
    //Select a file to upload
    onFileSelected: function (event) {
      this.photoUrlToUpload = event.target.files[0];
    },
    //Save new user's info
    saveUserInfo: function () {
      const formData = new FormData();
      formData.append("image", this.photoUrlToUpload);
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      formData.append("description", this.description);
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));

      const idUser = localStorageData;
      let token = localStorage.token;
      fetch(`http://localhost:3000/api/users/${idUser}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          mode: "no-cors",
          'Accept': 'application/json',
        },
      })
        .then((response) => {
          if (response.status == 401) {
          } else {
            response.json().then((formData) => {
              if (formData.user.photoUrl != "") {
                this.photoUrl = formData.user.photoUrl;
                this.photoUrlToUpload = "";
                this.firstname = "",
                  this.lastname = "",
                  this.description = ""
                alert("Profile updated")
                this.$router.push("/ProfilePage");
              }
            });
          }
        })
        .catch((error) => console.log(error));
    },

    //Delete the account
    deleteAccount: function () {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));

      const idUser = localStorageData;
      let token = localStorage.token;

      fetch(`http://localhost:3000/api/users/${idUser}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then((response) => {
          if (
            response.status == 400 ||
            response.status == 404 ||
            response.status == 403
          ) {
            this.status = "error_saveUserInfo";
          } else {
            localStorage.clear();
            alert("Your account has been deleted!");
            // We are redirected to the home page
            this.$router.push("/");
          }
        })
        .catch((error) => console.log(error));
    }
  }

}

</script>

<style lang="scss">
//Mixins
@import "../styles/settings";

//Colors
@import "../styles/variables.scss";

.settings_page__nav {
  @include settings_page__nav;
}

.settings_change {
  @include settings_change;
}

#upload_image {
  @include upload_image;
}

input:focus {
  outline: none !important;
  border-color: $lighter-purple;
  box-shadow: 2px 2px 1px $lighter-purple;
}

textarea:focus {
  outline: none !important;
  border-color: $lighter-purple;
  box-shadow: 2px 2px 1px $lighter-purple;
}

.settings_change__delete {
  @include settings_change__delete;
}

//Tablet and small laptop responsive

@media screen and (min-width: 500px) and (max-width: 768px) {

  .settings_change {
    @include settings_change-tablet;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {

  .settings_change {
    @include settings_change-tablet-1;
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {

  .settings_change {
    @include settings_change-laptop;
  }
}

@media screen and (min-width: 1201px) {

  .settings_change {
    @include settings_change-laptop-1;
  }
}
</style>