<template>
  <div class="row">
    <div class="col-1-of-2">
      <div :key="post.id" v-for="post in posts" class="block-sent-post">
        <div class="block-sent-post__post">
          <div class="block-sent-post__user">
            <div class="post-content__delete">
              <button @click="deletePost(post.id)" v-if="(post.idUser === currentUserId) || (this.isAdmin == true)">
                <i class="fa-solid fa-xmark" title="Delete post"></i></button>
            </div>
            <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }" title="Edit post">
              <i v-if="(post.idUser === currentUserId) || (this.isAdmin == true)"
                class="fa-regular fa-pen-to-square"></i>
            </router-link>
            <p>{{ post.fname }} {{ post.lname }}</p>
            <div class="block-sent-post__profile-photo">
              <img v-show="image != ''" :src="image" alt="Profile photo">
            </div>
          </div>
          <div class="post-content">
            <p class="post-content__text">{{ post.text }} </p>
            <img v-show="post.imageUrl != ''" alt="Post Image" class="post-content__imageUrl" :src="post.imageUrl">
          </div>
        </div>
        <div class="block-sent-post__like-dislike">
          <div class="block-sent-post__like-dislike__like">
            <i class="fa-solid fa-thumbs-up" title="Like"></i>
          </div>
          <div class="block-sent-post__like-dislike__dislike">
            <i class="fa-solid fa-thumbs-down" title="Dislike"></i>
          </div>
        </div>
        <!-- <div class="block-sent-post__comment">
          <div class="block-sent-post__comment-input">
            <textarea type="text" id="comment" maxlength="225" required placeholder="Comment"></textarea>
          </div>
          <div class="block-sent-post__comment-text">
            <p>
              <i class="fa-regular fa-trash-can" title="Delete comment"></i>
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

    <style lang="scss" scoped>
@import "../styles/variables.scss";

//Mixin

@import "../styles/news-feed.scss";

* {
  overflow-x: hidden;
}

.block-sent-post {
  @include block-sent-post;

  &__like-dislike {
    display: flex;
    flex-direction: row;
    width: 25%;
    padding-top: 2px;
    align-items: center;
    color: $darkest-purple;
    //border:1px solid red;
    justify-content: space-between;
    padding: 0px 0px 10px 25px;


    &__like {
      width: 50%;
      padding-bottom: 3px;

      & :hover {
        color: $coral-pink;
      }
    }

    &__dislike {
      width: 30%;
      padding-top: 2px;

      & :hover {
        color: $mint-green;
      }

    }
  }

  &__profile-photo {
    border: 1px solid transparent;
    width: 20%;
    height: 40px;
    border: 1px solid black;

    & img {
      object-fit: scale-down;
      height: 100%;
      width: 100%;
    }
  }

  &__user {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    width: 100%;
    justify-self: left;
    justify-content: space-between;
    font-weight: 600;
    color: $darkest-purple;
    padding: 10px 10px 0px 2px;
    font-size: 13px
  }
}

.block-sent-post__comment-input {
  @include comment-input;

}

.block-sent-post__comment-text {
  @include comment-text;
}

.post-content {
  @include post-content;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .row {
    width: 60%;
    justify-self: center;
    margin: 0px auto 0px auto;
    border-left: 1px solid transparent;
    box-shadow: 0px 0px 0px 00px gray;
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {
  .row {
    width: 65%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }
}

@media screen and (min-width: 1201px) {
  .row {
    width: 50%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }
}
</style>

<script>
import NewsFeed from "../views/NewsFeed"
import router from '../router'

export default {
  name: "PostBox",


  data: function () {
    return {
      posts: [],
      imageUrl: "",
      uploadImage: "",
      text: "",
      fname: "",
      lname: "",
      image: "",
      postId: "",
      isAdmin: false,
      currentUserId: ""
    }
  },

  mounted: function () {
    let token = localStorage.token;
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));

    fetch("http://localhost:3000/api/posts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((response) => {
      if (response.status == 401 || response.status == 500) {
      } else {
        response.json().then((data) => {
          for (let i = 0; i < data.length; i++) {
            this.posts.push({
              id: data[i].postId,
              idUser: data[i].user.idUser,
              text: data[i].text,
              fname: data[i].user.firstname,
              lname: data[i].user.lastname,
              imageUrl: data[i].imageUrl,
              image: data[i].user.image,
              createdAt: data[i].createdAt.slice(0, 10).split('-').reverse().join('/'),
            });
          }
          console.log(data, "data")
        });
      }

    }).catch((error) => console.log(error));

    this.currentUserId = localStorageData;
    console.log(this.currentUserId, "Current user id")
    fetch(`http://localhost:3000/api/users/${this.currentUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        response.json().then((data) => {
          this.isAdmin = data.isAdmin;
        });
      })
      .catch((error) => console.log(error));
  },

  methods: {
    //supprimer d'un post
    deletePost: function (postId) {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));

      let token = localStorage.token;
      console.log(postId)


      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then((response) => {
          if (response.status == 401 || response.status == 400 || response.status == 404) {
          } else {
            console.log(response);
            alert("The post has been deleted!")
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    },
  }
}




</script>