<template>
  <div class="profile_page">
    <nav class="profile_page_nav">
      <router-link title="News Feed" class="link-icon" to="/Newsfeed"><i class="fa-solid fa-arrow-left-long"></i>
      </router-link>
    </nav>
  </div>
  <section class="section">
    <div class="row">
      <div class="col-1-of-2">
        <div class="header_section">
          <div class="header_section__profile-photo">
            <img src="../assets/Cat_March_2010-1.jpg" alt="Photo">
          </div>
          <div class="header_section__information">
            <p class="header_section__information-name">Name</p>
            <p class="header_section__information-lastname">Lastname</p>
          </div>
          <div class="header_section__settings">
            <div class="header_section__settings-icon">
              <a href="" title="Settings">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </a>
            </div>
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
              Points six way enough she its father. Folly sex downs tears ham green forty.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <div class="posts_section">
          <div class="posts_section__title">
            <h2>
              Posts
            </h2>
            <div class="posts_section__images">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/wp6021466.jpg" alt="">
              <img src="../assets/thumb-1920-1144782.jpg" alt="">
            </div>
            <div class="posts_section__text">
              <h3 class="posts_section__text">
                Post Title
              </h3>
              <p>
                Oh he decisively impression attachment friendship so if everything. Whose her enjoy chief new young.
                Felicity if ye required likewise so doubtful. On so attention necessary at by provision otherwise
                existence
                direction. Unpleasing up announcing unpleasant themselves oh do on. Way advantage age led listening
                belonging
                supposing.
                Wrong do point avoid by fruit learn or in death. So passage however besides invited comfort elderly be me.
              Walls began of child civil am heard hoped my. Satisfied pretended mr on do determine by.
              Old post took and ask seen fact rich. Man entrance settling believed eat joy.
              Money as drift begin on to. Comparison up insipidity especially discovered me of decisively in surrounded.
              Points six way enough she its father. Folly sex downs tears ham green forty.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1-of-3">
        <div class="footer_section">
          <div class="footer_section__newsfeed-icon">
            <i class="fa-solid fa-house" title="News Feed"></i>
          </div>
          <div class="footer_section__upload">
            <i class="fa-solid fa-plus" title="Create a post"></i>
          </div>
          <div class="footer_section__signout">
            
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../styles/mixin-profile.scss";
@import "../styles/variables.scss";

.profile_page {
  scroll-behavior: smooth;
}

.profile_page_nav {
  @include navbar;
}

.link-icon {
  @include link-icon;
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

.footer_section{
  @include footer_section;
}
</style>

