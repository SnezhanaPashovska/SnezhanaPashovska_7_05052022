<template>
  <div class="comment-box-main_content">
    <div class="comment-box">
      <div class="comment-sent" v-for="comment in comments" :key="comment.id">
        <div class="comment-names">
          <p class="name-lastname"> {{ comment.firstname }} {{ comment.lastname }}</p>
          <button @click="deleteComment(comment.id)" v-if="(comment.idUser === currentUserId) || (this.isAdmin == true)"
            class="delete-comment"><i class="fa-solid fa-xmark" title="Delete comment"></i></button>
        </div>
        <div class="comment-content">
          <p class="block-sent-post__comment__paragraph">{{ comment.textComment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsFeed from "../components/NewsFeed"
import router from '../router'
import PostBox from "./PostBox.vue";

export default {
  name: "CommentSent",

  props: {
    postId: Number,
    isAdmin: Boolean
  },

  data: function () {
    return {
      comments: [],
      status: "",
      currentUserId: "",

    };
  },
  mounted: function () {
    const localStorageData = JSON.parse(localStorage.getItem("idUser"));
    this.currentUserId = localStorageData;
    let postId = this.postId

    let token = localStorage.token;

    fetch(`http://localhost:3000/api/comment//allcomments/${postId}`, {
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
          response.json().then((data) => {
            for (let i = 0; i < data.length; i++) {
              this.comments.push({
                id: data[i].idcomments,
                idUser: data[i].iduser,
                textComment: data[i].textComment,
                postId: data[i].idposts,
                firstname: data[i].user.firstname,
                lastname: data[i].user.lastname,
              })
            }
          });
        }
      })
      .catch((error) => console.log(error));
  },

  methods: {
    //Delete a comment
    deleteComment: function (idcomments) {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));
      this.idUser = localStorageData;
      let postId = this.postId;
      let token = localStorage.token;

      fetch(`http://localhost:3000/api/comment/posts/${postId}/${idcomments}`,
        {
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
            alert("The comment has been deleted!")
            window.location.reload();
          }
        })
        .catch((error) => console.log(error, 'error'));
    }
  }
}
</script>

<style lang="scss">
//Colors
@import "../styles/variables.scss";

//Mixin
@import "../styles/news-feed.scss";

.row {
  margin: 0px auto 0px auto;
  justify-self: center;
}

.comment-sent {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comment-content {
  display: flex;
  flex-direction: row;
  padding: 2px 0px 2px 0px;
  width: 100%;
}

.comment-box {
  display: flex;
  flex-direction: column;
  margin: 2px 0px 2px 0px;
  width: 100%;
}

.comment-names {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2px 0px 2px 0px;
  border-top: 1px solid $light-gray;
  width: 98%;
}
</style>