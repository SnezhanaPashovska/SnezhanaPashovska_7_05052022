<template>
  <div class="row">
    <div class="col-1-of-2">
      <div  class="block-sent-post" >
        <div class="block-sent-post__user">
          <p>{{fname}} {{}}</p>
          <div class="block-sent-post__profile-photo">
            <img :src="image" alt="Profile photo">
          </div>
        </div>
        <div class="block-sent-post__post">
          <p class="post-text"> </p>
          <img v-show="imageUrl!= ''" :src="imageUrl" alt="Post Image">
        </div>
        <div class="block-sent-post__like-dislike">
          <div class="block-sent-post__like-dislike__like">
            <i class="fa-solid fa-thumbs-up" title="Like"></i>
          </div>
          <div class="block-sent-post__like-dislike__dislike">
            <i class="fa-solid fa-thumbs-down" title="Dislike"></i>
          </div>
        </div>
        <div class="block-sent-post__comment">
          <div class="block-sent-post__comment-input">
            <textarea type="text" id="comment" maxlength="225" required placeholder="Comment"></textarea>
          </div>
          <div class="block-sent-post__comment-text">
            <p>
            </p>
            <i class="fa-regular fa-trash-can" title="Delete comment"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    <style lang="scss">
@import "../styles/variables.scss";

//Mixin

@import "../styles/news-feed.scss";

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
    padding: 0px 0px 0px 25px;


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

    & img {
      object-fit: scale-down;
      height: 100%;
      width: 100%;
    }
  }

  &__user {
    display: flex;
    flex-direction: row-reverse;
    width: 50%;
    justify-self: left;
    justify-content: space-evenly;
    font-weight: 600;
    color: $darkest-purple;
    padding-top: 10px;
  }
}

.block-sent-post__comment-input {
  @include comment-input;

}

.block-sent-post__comment-text {
  @include comment-text;
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

export default{
  name: "PosBox"
}


</script>