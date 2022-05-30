<template>
  <div class="settings_page">
    <nav class="settings_page__nav">
      <router-link title="Profile Page" class="link-icon-profile" to="/ProfilePage"><i class="fa-solid fa-user"></i>
      </router-link>
    </nav>
    <section class="section">
      <div class="row">
        <div class="col-1-of-2">
          <div class="settings_change">
            <div class="settings_change__photo">
              <img src="../assets/default-profile.png" alt="Profile photo" class="settings_change__photo__image">
              <label for="choose-image">
                <i class="fa-solid fa-camera" title="Choose a file" id="upload_image"></i>
              </label>
              <input type="file" class="settings_change__photo__upload" id="choose-image">
            </div>
            <div class="settings_change__names">
              <div class="settings_change__names__firstname">
                <label for="firstname">
                  <input type="text" class="firstname" placeholder="Name">
                </label>
              </div>
              <div class="settings_change__names__lastname">
                <label for="lastname">
                  <input type="text" class="lastname" placeholder="Lastname">
                </label>
              </div>
            </div>
            <div class="settings_change__description">
              <textarea type="text" class="description" placeholder="Tell us something about yourself"></textarea>
            </div>
            <div class="settings_change__save">
              <button class="settings_change__save__btn" type="submit" title="Save changes">
                <i class="fa-solid fa-floppy-disk"></i>
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  </div>
</template>

<style lang="scss">
//Mixins
@import "../styles/settings";

//Colors
@import "../styles/variables.scss";

.settings_page__nav {
  @include settings_page__nav;
}

.settings_change {
  @include settings_change;
}

#upload_image {
  @include upload_image;
}

input:focus {
  outline: none !important;
  border-color: $lighter-purple;
  box-shadow: 2px 2px 1px $lighter-purple;
}

textarea:focus {
  outline: none !important;
  border-color: $lighter-purple;
  box-shadow: 2px 2px 1px $lighter-purple;
}

//Tablet and small laptop responsive

@media screen and (min-width: 500px) and (max-width: 768px) {

  .settings_change {
    @include settings_change-tablet;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {

  .settings_change {
    @include settings_change-tablet-1;
  }
}

@media screen and (min-width: 991px) and (max-width: 1200px) {

  .settings_change {
    @include settings_change-laptop;
  }
}

@media screen and (min-width: 1201px) {

  .settings_change {
    @include settings_change-laptop-1;
  }
}
</style>

<script>
</script>