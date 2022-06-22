<template>
  <div class="news_feed">
    <nav class="newsfeed_nav">
      <router-link title="Profile Page" class="link-icon" to="/ProfilePage"><i class="fa-solid fa-user"></i>
      </router-link>
      <img src="../assets/icon-left-font-monochrome-white.png" alt="" class="logo-Groupomania">
      <router-link @click="signOut()" title="Sign out" class="signout-icon" to="/NewsFeed"><i
          class="fa-solid fa-arrow-right-from-bracket"></i></router-link>
    </nav>
  </div>
  <section class="section">
    <div class="row">
      <div class="col-1-of-2">
        <div class="post_bloc">
          <div class="post_bloc__posts">
            <label for="post">
              <textarea v-model.trim="text" type="text" id=post maxlength="255" required
                placeholder="What's on your mind?"></textarea>
            </label>
            <div class="post_bloc__icons">
              <div class="post_bloc__icons__share">
                <button @click.prevent="createPost()" class="post_bloc__icons__share__btn">
                  <i class="fa-solid fa-share" title="Share"></i>
                </button>
              </div>
              <div class="post_bloc__icons__image">
                <label for="uploadimage">
                  <i class="fa-regular fa-image" title="Upload an image"></i>
                  <input type="file" id="uploadimage" @change="getImage($event)">
                </label>
              </div>
            </div>
          </div>
          <AsyncPost>
          </AsyncPost>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import post from '../views/PostBox'
import router from '@/router'
import { defineAsyncComponent } from 'vue'
const AsyncPost = defineAsyncComponent(() => import('../views/PostBox.vue'))


export default {

  name: 'NewsFeed',

  components: {
    AsyncPost,

  },
  data: function () {
    return {
      posts: [],
      idUser: "",
      imageUrl: "",
      uploadImage: "",
      text: "",
      fname: "",
      lname: "",
      image: "",
      postId: "",
      createdAt: "",
      likes: ""
    }
  },

  computed: {
    postText: function () {
      if (this.text) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    getImage: function (event) {
      this.uploadImage = event.target.files[0];
    },

    createPost: function () {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));
      const formData = new FormData();
      let token = localStorage.token;

      formData.append("image", this.uploadImage);
      formData.append("text", this.text);
      formData.append("imageUrl", this.imageUrl)
      formData.append("idUser", localStorageData);

      fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        response.json().then((formData) => {
          this.imageUrl = formData.imageUrl,
            this.uploadImage = "",
            this.postId = "",
            //alert("Post created")
            this.$router.push("/NewsFeed")
          this.$router.go()
        })
      }
      ).catch((error) => console.log(error));
    },

    signOut: function () {
      localStorage.clear();
      alert("You have signed out")
      this.$router.push("/");
    }
  },
}
</script>



<style lang="scss" scoped>
//Colors
@import "../styles/variables.scss";

//Mixin

@import "../styles/news-feed.scss";

* {
  overflow-x: hidden;
}

.logo-Groupomania {
  width: 30%;
}

body {
  background-color: white !important;
  margin: 0;
  overflow-x: hidden;
}

.news_feed {
  overflow-x: hidden;
}

.newsfeed_nav {
  @include news_feed_nav;
}

a {
  color: white;
  padding: 0px 25px 0px 25px;
  //width: 50%;

  &:hover {
    transition: all .2s ease-in-out;
    transform: scale(1.2);
  }
}

.section {
  @include section;
}

.post_bloc {
  @include post_bloc;
  background-color: $lightest-gray;
}

.row {
  width: 100%;
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .news_feed {
    background-color: $light-gray;
  }

  .section {
    @include section-tablet;
  }

  .row {
    @include row-tablet;
  }

  .post_bloc {
    @include post_bloc-tablet;
  }

  .newsfeed_nav {
    @include news_feed_nav;
  }

  a {
    color: white;
    padding: 0px 35px 0px 35px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .row {
    width: 80%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  .newsfeed_nav {
    @include news_feed_nav;
  }

  a {
    color: white;
    padding: 0px 45px 0px 45px;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {

  .logo-Groupomania {
    width: 10%;
    display: block !important;
    height: 100px;
  }

  .post_bloc {
    background-color: $lightest-gray;
  }

  .row {
    width: 70%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  a {
    color: white;
    padding: 0px 190px 0px 190px;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}

@media screen and (min-width: 1201px) {
  .logo-Groupomania {
    width: 7%;
    display: block !important;
    height: 100px;
  }

  .row {
    width: 60%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  .post_bloc {
    background-color: $lightest-gray;
  }

  .post_bloc__posts {

    & textarea {
      overflow-y: hidden;
      overflow-x: hidden;
    }
  }

  a {
    color: white;
    padding: 0px 300px 0px 300px;
    //border: 1px solid white;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}
</style>
