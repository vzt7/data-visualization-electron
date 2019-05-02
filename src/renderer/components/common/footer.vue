<template>
  <footer class="footer" v-if="this.$route.path === '/'">
    <p>Front-End Tech Stack & Lib includes Webpack, Electron, Vue.js, G2, L7, iView and so on</p>
    <p>© Copyright 2019 , Hubei Wuhan , xxx .</p>
  </footer>
</template>

<script>

export default {
  name: "common-footer",
  data() {
    return {};
  },
};

</script>

<style lang='scss'>

.footer {
  &>p {
    padding: 30px 0;
    &:last-child {
      padding: 0 0 30px 0;
    }
    text-align: center;
    background-color: #f4f5f5;
  }
}

</style>
