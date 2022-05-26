<template>
  <div class="profile_page">
    <nav class="profile_page_nav">
      <router-link title="News Feed" class="link-icon" to="/Newsfeed"><i class="fa-solid fa-arrow-left-long"></i>
      </router-link>
      <div class="profile_page_nav__settings-icon">
        <router-link title="Settings" class="settings-icon" to="/Settings"><i class="fa-solid fa-ellipsis-vertical"></i>
        </router-link>
      </div>
    </nav>
  </div>
  <section class="section">
    <div class="row">
      <div class="col-1-of-2">
        <div class="header_section">
          <div class="header_section__profile-photo">
            <img src="" alt="Profile photo">
          </div>
          <div class="header_section__information">
            <p class="header_section__information-name"></p>
            <p class="header_section__information-lastname"></p>
          </div>
          <div class="header_section__settings">
          </div>
        </div>
      </div>
      <div class="col-1-of-2">
        <div class="about_section">
          <div class="about_section__text">
            <h1 class="about_section__text-title">
              About
            </h1>
            <p class="about_section__text-description">
              Wrong do point avoid by fruit learn or in death. So passage however besides invited comfort elderly be me.
              Walls began of child civil am heard hoped my. Satisfied pretended mr on do determine by.
              Old post took and ask seen fact rich. Man entrance settling believed eat joy.
              Money as drift begin on to. Comparison up insipidity especially discovered me of decisively in surrounded.
              Points six way enough she its father.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <!-- <div class="posts_section">
          <div class="posts_section__title">
            <h2>
              Posts
            </h2>
            <div class="posts_section__images">
              <img src="../assets/wp6021466.jpg" alt="">
              <div class="post_section_images__icon">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div class="posts_section__text">
              <p>
                Post Title
                Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young.
                Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise
                existence
                direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening
                belonging
                supposing.
                Wrong do point avoid by fruit learn or in death. So passage however besides invited comfort elderly be
                me.
                Walls began of child civil am heard hoped my. Satisfied pretended mr on do determine by.
                Old post took and ask seen fact rich. Man entrance settling believed eat joy.
                Money as drift begin on to. Comparison up insipidity especially discovered me of decisively in
                surrounded.
                Points six way enough she its father.
              </p>
              <div class="post_section_text__icon">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
  <div class="footer_section">
    <div class="footer_section__newsfeed-icon">
      <i class="fa-solid fa-house" title="News Feed"></i>
    </div>
    <div class="footer_section__upload">
      <a href=""><i class="fa-solid fa-plus" title="Create a post"></i></a>
    </div>
    <div class="footer_section__signout">
      <!--   <a href="./Login.vue"> -->
      <i  class="fa-solid fa-arrow-right-from-bracket"></i>
      <!--  </a> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/mixin-profile.scss";
@import "../styles/variables.scss";


a {
  color: white;
}

.profile_page {
  scroll-behavior: smooth;
  height: auto
}

.profile_page_nav {
  @include profile_page_nav;
}

.link-icon {
  @include link-icon;
}

.settings-icon {
  @include settings-icon;
}

.row {
  @include row;
}

.col-1-of-2 {
  @include col-1-of-2;
}

.header_section {
  @include header_section;
}

.about_section {
  @include about_section;
}

.posts_section {
  @include posts_section;
}

.post_section_images__icon {
  @include trashcan;
}

.post_section_text__icon {
  @include text-trashcan;
}

.footer_section {
  @include footer_section;
}

@media screen and (min-width: 425px) and (max-width: 519.9px) {

  .header_section {

    @include header_section-425-519;
  }

  .about_section {
    @include about_section-425-519;
  }

  .posts_section {

    @include posts_section-425-519
  }

  .footer_section {
    @include footer_section-425-519
  }
}

@media screen and (min-width: 520px) and (max-width: 768px) {

  .row {
    width: 65%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  .section {
    background-color: $light-gray;
  }

  .link-icon {
    @include link-icon-tablet;
  }

  .settings-icon {
    @include settings-icon-tablet;
  }

  .header_section {
    @include header_section-tablet;
  }

  .about_section {
    @include about_section-tablet;
  }

  .posts_section {
    @include posts_section-tablet;
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

  .section {
    background-color: $light-gray;
  }

  .header_section {
    @include header_section-tablet-1;
  }

  .link-icon {
    @include link-icon-tablet-1
  }

  .settings-icon {
    @include settings-icon-tablet-1
  }

  .about_section {
    @include about_section-table-1
  }

  .posts_section {
    @include posts_section-tablet-1;
  }

  .footer_section {
    @include footer_section-tablet-1;
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {
  .row {
    width: 65%;
    justify-self: center;
    margin: 0px auto 0px auto;
  }

  .section {
    background-color: $light-gray;
  }

  .header_section {
    @include header_section-laptop;
  }

  .about_section {
    @include about_section-laptop;
  }

  .settings-icon {
    @include settings-icon-laptop;
  }

  .posts_section {
    @include posts_section-laptop;
  }

  .footer_section {
    @include footer_section-laptop
  }
}

@media screen and (min-width: 1201px) {
  .row {
    width: 70%;
    justify-self: center;
    margin: 0px auto 0px auto;
    border-left: 1px solid transparent;
    box-shadow: 0px 0px 0px 00px gray;
  }

  .section {
    background-color: $light-gray;
  }

  .settings-icon {
    @include settings-icon-laptop-1;
  }

  .header_section {
    @include header_section-laptop-1;
  }

  .about_section {
    @include about_section-laptop-1
  }

  .posts_section {
    @include posts_section-laptop-1;
  }
}
</style>

<script>



export default {


  
}



</script>

