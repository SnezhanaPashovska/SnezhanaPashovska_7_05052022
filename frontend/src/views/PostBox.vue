<template>
  <div class="row">
    <div class="col-1-of-2">
      <div :key="post.id" v-for="post in posts" class="block-sent-post">
        <div class="block-sent-post__post">
          <div class="block-sent-post__user">
            <div class="post-content__delete">
              <button @click="deletePost(post.id)" v-if="(post.idUser === currentUserId) || (this.isAdmin == true)"
                class="delete-post">
                <i class="fa-solid fa-xmark" title="Delete post"></i></button>
            </div>
            <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }" title="Edit post">
              <i v-if="(post.idUser === currentUserId) || (this.isAdmin == true)"
                class="fa-regular fa-pen-to-square"></i>
            </router-link>
            <p>{{ post.fname }} {{ post.lname }}</p>
            <div class="block-sent-post__profile-photo">
              <img v-show="photoUrl != ''" alt="Profile photo" :src="post.photoUrl">
            </div>
          </div> 
          <div class="post-content">
            <p class="post-content__text">{{ post.text }} </p>
            <img v-show="post.imageUrl != ''" alt="Post Image" class="post-content__imageUrl" :src="post.imageUrl">
          </div>
        </div>
        <div class="block-sent-post__like">
          <div class="block-sent-post__like__like">
            <button @click="likePost(post.id)" class="like-post">
              <i class="fa-solid fa-thumbs-up" title="Like"></i></button>
            <p>{{ like[post.id] }} {{ postId }}</p>
          </div>
        </div>
        <CommentBox :postId="post.id">
        </CommentBox>

        <CommentSent :postId="post.id" :isAdmin="this.isAdmin">
        </CommentSent>
      </div>
    </div>
  </div>
</template>

   

<script>
import NewsFeed from "../views/NewsFeed"
import router from '../router'
import CommentBox from '../views/CommentBox'
import CommentSent from "../views/CommentSent"

export default {
  name: "PostBox",

  components: {
    CommentBox,
    CommentSent
  },

  data: function () {
    return {
      posts: [],
      imageUrl: "",
      uploadImage: "",
      text: "",
      fname: "",
      lname: "",
      photoUrl: "",
      postId: "",
      isAdmin: false,
      currentUserId: "",
      createdAt: "",
      like: [],
      textComment: "",
    }
  },

  mounted: function () {
    let token = localStorage.token;
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));

    //Get all posts

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
          for (let i = data.length - 1; i >= 0; i--) {
            this.posts.push({
              id: data[i].postId,
              idUser: data[i].user.idUser,
              text: data[i].text,
              fname: data[i].user.firstname,
              lname: data[i].user.lastname,
              imageUrl: data[i].imageUrl,
              createdAt: data[i].createdAt.slice(0, 10).split('-').reverse(),
              photoUrl: data[i].user.photoUrl,
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
    //Delete a post
    deletePost: function (postId) {

      let token = localStorage.token;
      console.log(postId)

      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
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

    likePost: function (postId) {
      let localStorageData = JSON.parse(localStorage.getItem("idUser"));
      let token = localStorage.token;
      const formData = new FormData();
      formData.append("idUser", localStorageData);
      formData.append("postId", this.postId);
      formData.append("like", this.likes)
      console.log(localStorageData, "id user");
      console.log(formData)

      fetch(`http://localhost:3000/api/likes/posts/${postId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response)
          //window.location.reload();
          console.log("Like")
        })
        .catch((error) => console.log(error))
    }
  },

  sendComment: function () {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));
    this.idUser = localStorageData
    let token = localStorage.token;

    const data = {
      textComment: this.textComment,
      idUser: this.idUser,
      postId: this.postId,
    };
    console.log(data)

    fetch("http://localhost:3000/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (textComment == null) {
          console.log("Cannot send an empty comment")
        } else if (response.status == 400) {
          this.status = "error_send";
        }
        else {
          response.json().then(() => {
            this.status = "success_comment";
            //window.location.reload();
            //this.$router.push("/list")
          });
        }
      }).catch((error) => console.log(error));
  }


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

.block-sent-post {
  @include block-sent-post;

  &__like {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 2px;
    align-items: center;
    color: $darkest-purple;
    border-top: 1px solid $light-gray;
    border-bottom: 1px solid $light-gray;
    justify-content: space-between;
    padding: 5px 0px 10px 25px;


    &__like {
      width: 10%;
      padding-bottom: 3px;
      color: $darkest-purple;
      border: transparent;

      & {
        color: $darkest-purple;
      }

      & :hover {
        color: $coral-pink;
      }

      & :focus {
        color: $coral-pink;
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
    width: 90%;
    justify-self: left;
    justify-content: space-between;
    font-weight: 600;
    color: $darkest-purple;
    padding: 10px 10px 0px 2px;
    font-size: 13px;
    margin: 0px auto 6px auto;
  }
}

.fa-pen-to-square {
  color: $darkest-purple;
}

.delete-post {
  border: transparent;
  background-color: transparent;
  cursor: pointer;
}

.fa-xmark {
  color: $darkest-purple;
}

.fa-thumbs-up {
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  color: $darkest-purple;
}

.like-post {
  border: transparent;
  background-color: transparent;
}

.post-content {
  @include post-content;
}

.comment-sent {
  @include comment-sent;
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