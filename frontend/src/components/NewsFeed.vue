<template>

  <div class="news_feed">
    <nav class="newsfeed_nav">
      <router-link title="Profile Page" class="link-icon" to="/ProfilePage"><i class="fa-solid fa-user"></i>
      </router-link>
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
            <img src="" alt="">
          </div>
          <div class="post_bloc__posts">
            <label for="post">
              <textarea type="text" id=post maxlength="255" required placeholder="What's on your mind?"></textarea>
            </label>
            <div class="post_bloc__icons">
              <div class="post_bloc__icons__delete">
                <i class="fa-solid fa-trash" title="Delete post"></i>
              </div>
              <div class="post_bloc__icons__share">
                <i class="fa-solid fa-share" title="Share"></i>
              </div>
              <div class="post_bloc__icons__image">
                <i class="fa-regular fa-image" title="Upload an image"></i>
              </div>
              <div class="post_bloc__like-dislike">
                <div class="post_bloc__like-dislike__like">
                  <i class="fa-solid fa-thumbs-up" title="Like"></i>
                </div>
                <div class="post_bloc__like-dislike__dislike">
                  <i class="fa-solid fa-thumbs-down" title="Dislike"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="post_bloc__comment">
            <label for="comment">Comment</label>
            <textarea type="text" id="comment" maxlength="225" required></textarea>
            <i class="fa-solid fa-trash" title="Delete comment"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="footer_section">
    <div class="footer_section__signout">
      <a href="./Login.vue" title="Sign out">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </a>
    </div>
  </div>

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

.footer_section {
  @include footer_section;
}
</style>

<script>


</script>