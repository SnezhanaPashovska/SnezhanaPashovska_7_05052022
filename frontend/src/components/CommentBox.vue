<template>
  <div class="row">
    <div class="block-sent-post__comment">
      <div class="block-sent-post__comment-input">
        <textarea v-model.trim="textComment" type="text" id="comment" maxlength="225" required
          placeholder="Comment"></textarea>
        <div class="block-sent-post__comment-text">
          <button @click="sendComment()" class="share-comment">
            <i class="fa-regular fa-paper-plane" title="Share comment"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router'

export default {
  name: "CommentBox",

  //to be able to pass the owners
  props: {
    postId: Number
  },

  data: function () {
    return {
      textComment: "",
      idUser: "",
      idcomment: ""
    };
  },

  methods: {

    sendComment: function () {
      const localStorageData = JSON.parse(localStorage.getItem("idUser"));
      this.idUser = localStorageData
      let token = localStorage.token;

      const data = {
        textComment: this.textComment,
        idUser: this.idUser,
        postId: this.postId,
        firstname: this.firstname,
        idcomments: this.idcomments
      };

      fetch("http://localhost:3000/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          //if the comment field is empty send an error alert
          if (response.status == 401 || response.status == 404) {
            this.status = "error_comment";
            alert("Cannot send an empty comment")
          } else if (response.status == 400) {
            this.status = "error_send";
            alert("Cannot send an empty comment")
          }
          else {
            response.json().then(() => {
              this.status = "success_comment";
              window.location.reload();
            });
          }
        }).catch((error) => console.log(error));
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
  width: 100%;
}

.block-sent-post__comment {
  width: 100% !important;
}

.block-sent-post__comment__paragraph {
  padding: 5px 5px 5px 5px;
  text-align: justify;
  color: black;
  width: 90%
}

.name-lastname {
  text-align: left;
  font-weight: 600;
  padding: 5px 5px 5px 5px;
  font-size: 12px;
  color: $darkest-purple;
}

.comment-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid $light-gray;
  padding: 8px 0px 8px 5px;
  margin-bottom: 5px;
  width: 100%;

  & button {
    height: 20px;
    border: transparent;
    color: $darkest-purple;
    background-color: transparent;
    cursor: pointer;
    margin: 2px 5px 0px 0px;

    & :hover {
      color: $lighter-purple;
    }

  }
}

.block-sent-post__comment-input {
  @include comment-input;

}

.block-sent-post__comment-text {
  @include comment-text;
}

@media screen and (min-width: 520px) and (max-width: 768px) {

  .row {
    width: 100%;
  }

}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .row {
    width: 100%;
  }
}
</style>