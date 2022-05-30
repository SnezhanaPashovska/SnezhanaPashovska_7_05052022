<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img src="../assets/icon_new.png" alt="Logo Grupomania" class="logoIcon">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 80px;
}

.logoIcon {
  width: 100%;
  object-fit: contain;
  height: 40px;
}

.logoIcon img {
  object-fit: cover;
  height: 40px;
}
</style>
<script>
export default {
  name: "Header"
}
</script>