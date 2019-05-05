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
  mounted() {
    this.checkAMap();
  },
  methods: {
    async getData() {
      this.$Notice.info({
        // name: 'loading',
        title: "数据装载中...",
        // duration: 0,
      });
      // 读取数据，数据暂存在vuex
      await this.$store.commit("setStuData", Object.values(data.stuData).sort((a, b) => b.Unemployment - a.Unemployment)); // 以待就业概率降序排序
      await this.$store.commit("setMapData", Object.values(data.mapData));
      this.$Notice.success({ title: "数据已装载" });
    },
    checkAMap() {
      let timeNow = Date.now();
      let checker = setInterval(() => {
        if(window.AMap) {
          // 高德地图加载完成
          clearInterval(checker);
          this.$Notice.success({ title: "高德地图已装载" });
        }
        if(Date.now() - timeNow > (20 * 1000) && !window.AMap) {
          // 高德地图超过 20s 未加载完成
          this.$Notice.error({
            title: "高德地图加载失败",
            desc: `请检查网络`
          });
        }
      }, 1000);
      return checker;
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
