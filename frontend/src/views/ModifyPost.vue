<template>
  <div class="modify-post-page">
    <nav class="modify-post-page__nav">
      <router-link to="/NewsFeed" title="News Feed"><i class="fa-solid fa-house" title="News Feed"></i></router-link>
    </nav>
    <section class="section">
      <div class="row">
        <div class="col-1-of-2">
          <div class="modify-post-container">
            <div class="modify-post-container__image">
              <img v-show="imageUrl != ''" alt="New image" :src="imageUrl">
            </div>
            <div class="modify-post-container__image__upload">
              <label for="upload-image" title="Upload an image">
                <i class="fa-solid fa-upload"></i>
                <input type="file" id="upload-image" @change="onFileSelected($event)">
              </label>
            </div>
            <div class="modify-post-container__text">
              <label for="new-text">
                <textarea v-model.trim="text" type="textarea" id="new-text" placeholder="Edit post"></textarea>
              </label>
            </div>
            <div class="modify-post-container__save-changes">
              <div class="modify-post-container__save-changes__icon">
                <button @click="modifyPost()" class="modify-post-container__save-changes__icon__btn"
                  title="Save changes"><i class="fa-solid fa-floppy-disk"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
//Colors
@import "../styles/variables.scss";

//Mixin

@import "../styles/modify-post.scss";

* {
  overflow-x: hidden;
}

.modify-post-page__nav {
  @include modify-post-page__nav;
}

a {
  color: white !important;
  font-size: 21px;
}

.modify-post-container {
  @include modify-post-container;
}


.fa-floppy-disk {
  color: $darkest-purple;
  cursor: pointer;
  font-size: 21px;
}

#new-text {
  height: 80px;
  border: transparent;
  width: 70%;
  border-radius: 18px;
  padding: 8px 10px 5px 10px;
  font-family: Lato, sans-serif;
  box-shadow: 0px 1px 12px $lighter-purple;
  -webkit-backdrop-filter: blur 20px;
  backdrop-filter: blur 20px;
  margin-top: 10px;
}

@media screen and (min-width: 425px) and (max-width: 767px) {
  .modify-post-container {
    width: 60%;
  }
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .modify-post-container {
    width: 60%;

    &__image {
      height: 110px;
      width: 30%;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .modify-post-container {
    width: 60%;

    &__image {
      height: 110px;
      width: 30%;
    }
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {
  .modify-post-container {
    width: 50%;

    &__image {
      height: 110px;
      width: 30%;
    }
  }
}

@media screen and (min-width: 1201px) {
  .modify-post-container {
    width: 30%;

    &__image {
      height: 110px;
      width: 30%;
    }
  }
}

@media screen and (min-width: 1920px) {
  .modify-post-container {
    width: 50%;

    &__image {
      height: 110px;
      width: 25%;
    }
  }
}
</style>

<script>
import router from '../router'

export default {

  name: 'ModifyPost',

  data: function () {
    return {
      idUser: "",
      text: "",
      imageUrl: "",
      uploadImage: "",
      isAdmin: false
    }
  },

  mounted: function () {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));
    console.log(localStorageData, "local storage data")

    let postId = this.$route.params.id
    let token = localStorage.token;
    console.log(token)
    console.log(postId, "postId")
    fetch(`http://localhost:3000/api/posts/${postId}`, {
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
              this.text = data.text,
                this.imageUrl = data.imageUrl,
                console.log(data, "data")
            })
            .catch((error) => console.log(error));
          console.log(data, "data")
        }

      })
      .catch((error) => console.log(error));
  },

  methods: {
    //sélectionner un fichier à uploader
    onFileSelected: function (event) {
      console.log(event)
      this.uploadImage = event.target.files[0];
    },
    modifyPost: function () {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));
      console.log(localStorageData, "edit")

      const formData = new FormData();
      formData.append("image", this.uploadImage);
      formData.append("text", this.text);
      formData.append("idUser", localStorageData);
      formData.append("imageUrl", this.imageUrl)
      console.log(this.imageUrl, "this.imageUrl");
      console.log(this.uploadImage, "this.uploadImage");
      console.log(formData, "edit")

      let token = localStorage.token;
      let postId = this.$route.params.id

      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          mode: "no-cors",
          'Accept': 'application/json'
        },
      })
        .then((response) => {
          if (response.status == 401 || response.status == 409) {
          } else if (response.status == 400) {
          }
          else {
            response.json().then((formData) => {
              this.imageUrl = formData.post.imageUrl,
                this.uploadImage = "",
                this.text = "";
              alert("The post has been successfully modified")
              this.$router.push("/NewsFeed");
            });
            console.log(formData, "FORM DATA");
            console.log(response, "RESPONSE")
          }
        })
        .catch((error) => console.log(error));
    },
  }


}
</script>