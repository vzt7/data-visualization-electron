<template>
  <div id="app" class="layout" ref="app">
    <common-header class="header"></common-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import Throttle from "lodash.throttle";
import Header from "./components/common/header";
import Footer from "./components/common/footer";

import data from './config/data.conf.js';

export default {
  name: "app",
  components: {
    "common-header": Header,
    "common-footer": Footer,
  },
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$Notice.info({
        title: "等待",
        desc: `加载数据中`
      });
      // 读取数据，数据暂存在vuex
      this.$store.commit("setStuData", Object.values(data.stuData))
      this.$store.commit("setMapData", Object.values(data.mapData))
      this.$Notice.success({
        title: "成功",
        desc: `已加载数据`
      });
    },
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
}
  
</style>
