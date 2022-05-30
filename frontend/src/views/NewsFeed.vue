<template>

  <div class="news_feed">
    <nav class="newsfeed_nav">
      <router-link title="Profile Page" class="link-icon" to="/ProfilePage"><i class="fa-solid fa-user"></i>
      </router-link>
      <router-link title="Sign out" class="signout-icon" to="/NewsFeed"><i
          class="fa-solid fa-arrow-right-from-bracket"></i></router-link>
      <!-- <div class="profile_page_nav__settings-icon">
        <router-link title="Settings" class="settings-icon" to="/Settings"><i class="fa-solid fa-ellipsis-vertical"></i>
        </router-link>
      </div> -->
    </nav>
  </div>
  <section class="section">
    <div class="row">
      <div class="col-1-of-2">
        <div class="post_bloc">
          <div class="post_bloc__profile-photo">
            <img src="../assets/default-profile.png" alt="Profile photo">
          </div>
          <div class="post_bloc__posts">
            <label for="post">
              <textarea v-model.trim="text" type="text" id=post maxlength="255" required
                placeholder="What's on your mind?"></textarea>
            </label>
            <div class="post_bloc__icons">
              <div class="post_bloc__icons__delete">
                <i class="fa-solid fa-trash" title="Delete post"></i>
              </div>
              <div class="post_bloc__icons__share">
                <button @click.prevent="createPost()" class="post_bloc__icons__share__btn">
                  <i class="fa-solid fa-share" title="Share"></i>
                </button>
              </div>
              <div class="post_bloc__icons__image">
                <label for="uploadimage">
                  <i class="fa-regular fa-image" title="Upload an image"></i>
                </label>
                <input type="file" id="uploadimage" @change="getImage($event)">
                <div id="display-name-of-image"></div>
              </div>
            </div>
          </div>
          <PostBox>

          </PostBox>
        </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
//Colors
@import "../styles/variables.scss";

//Mixin

@import "../styles/news-feed.scss";

body {
  background-color: white !important;
}

.newsfeed_nav {
  @include news_feed_nav;
}

a {
  color: white;
  margin: 0px 25px 0px 25px;
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
    margin: 0px 35px 0px 35px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .row {
    width: 60%;
    justify-self: center;
    margin: 0px auto 0px auto;
    border-left: 1px solid transparent;
    box-shadow: 0px 0px 0px 00px gray;
  }

  .newsfeed_nav {
    @include news_feed_nav;
  }

  a {
    color: white;
    margin: 0px 45px 0px 45px;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {
  .row {
    width: 65%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  a {
    color: white;
    margin: 0px 190px 0px 190px;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}

@media screen and (min-width: 1201px) {
  .row {
    width: 50%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  .post_bloc__posts {

    & textarea {
      overflow-y: hidden;
      overflow-x: hidden;
    }
  }

  a {
    color: white;
    margin: 0px 390px 0px 370px;
    //width: 50%;

    &:hover {
      transition: all .2s ease-in-out;
      transform: scale(1.2);
    }
  }
}
</style>

<script>
import PostBox from '../components/PostBox'

export default {

  name: 'NewsFeed',

  components: {
    PostBox
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
      postId: ""
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
      console.log(token, "token")
      console.log(localStorageData, "localStorageData")
      console.log(formData, "postdata")

      formData.append("image", this.uploadImage);
      formData.append("text", this.text);
      formData.append("imageUrl", this.imageUrl)
      formData.append("idUser", localStorageData);

      console.log(formData, "postdata2")

      fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        /*  if (this.text == null || this.uploadImage == null) {
           alert("Cannot publish an empty post")
         } else { */
        response.json().then((formData) => {
          this.idUser = "",
            this.imageUrl = formData.imageUrl,
            this.uploadImage = ""
          console.log(response, "response")
          console.log(this.imageUrl, "imageUrl")
          console.log(this.uploadImage, "uploadImage")
        })
      }
      ).catch((error) => console.log(error));
    },
  },

  mounted: function () {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));
    let token = localStorage.token;

    fetch("http://localhost:3000/api/posts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((response) => {
      response.json((data) => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push({
            postId: data[i].postId,
            userId: data[i].userId,
            text: data[i].text,
            fname: data[i].user.firstname,
            lname: data[i].user.lastname,
            imageUrl: data[i].imageUrl,
            image: data[i].user.image,
            
          });
        }
      })
      console.log(response, "Response Get");
     
    })
      .catch((error) => console.log(error));
  },


}



</script>