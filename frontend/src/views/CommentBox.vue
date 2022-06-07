<template>
  <div class="row">
    <div class="col-1-of-2">
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
  </div>
</template>

<script>
import router from '../router'

export default {
  name: "CommentBox",

  // pour pouvoir passer les propriétaires
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

          response.json().then((response) => {
            window.location.reload();
            //this.$router.push("/list")
            console.log(response)
          });

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

  & button {
    height: 20px;
    border: transparent;
    color: $darkest-purple;
    background-color: transparent;
    cursor: pointer;
    margin: 2px 5px 0px 0px;

  }
}

.block-sent-post__comment-input {
  @include comment-input;

}

.block-sent-post__comment-text {
  @include comment-text;
}
</style>