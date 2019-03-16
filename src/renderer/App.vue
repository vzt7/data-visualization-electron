<template>
  <div id="app" class="layout" ref="app">
    <common-header class="header"></common-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <footer class="footer" v-if="this.$route.path === '/'">
      <p>Front-End Tech Stack & Lib includes Webpack, Vue.js, G2, L7, iView and so on</p>
      <p>© Copyright 2019 , Hubei Wuhan , xxx .</p>
    </footer>
  </div>
</template>

<script>
import Throttle from "lodash.throttle";

import Header from "./components/common/header";

export default {
  name: "app",
  components: {
    "common-header": Header
  },
  data() {
    return {};
  },
  mounted() {
    // this.addBaseEvent();
  },
  computed: {
    isReaded() {
      return this.$store.state.csvData !== null;
    }
  },
  methods: {
    addBaseEvent() {
      this.$refs.app.addEventListener(
        "mousemove",
        Throttle(e => {
          this.showHeader = e.y < 60;
        }, 200)
      );
    }
  }
};
</script>

<style lang='scss'>
html, body, #app {
  width: 100%;
  height: 100%;
  min-width: 1024px;
  overflow: hidden;
}
  

#app {
  display: flex;
  flex-flow: column nowrap;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.header {
  flex: 0 0 auto;
}
  

.content {
  flex: 1 0 400px;
}

.footer {
  flex: 0 0 auto;
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
