<template>
  <div class="page-visual">
    <common-sidebar class="common-sidebar" :currentItem.sync="currentItem"></common-sidebar>
    <div class="page-visual__content" v-if="hasCsvData">
      <div class="page-visual__section" v-if="currentItem === '1-1'">
        <chart-pie class="chart-pie"></chart-pie>
      </div>
      <div class="page-visual__section" v-if="currentItem === '1-2'">
        <!-- 基于 L7 的地图(需要验证KEY 需要网络) -->
        <chart-map-controller v-if="mapSceneLoaded" class="chart-map-controller" :selectedItems.sync="chartMapSelectedItems" :mapType="1"></chart-map-controller>
        <chart-map class="chart-map map-container" :selectedItems="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map>
      </div>
      <div class="page-visual__section" v-if="currentItem === '1-3'">
        <!-- 基于 G2 的地图 -->
        <chart-map-controller v-if="mapSceneLoaded" class="chart-map-controller" :selectedItems.sync="chartMapSelectedItems" :mapType="2"></chart-map-controller>
        <chart-map-2 class="chart-map-2 map-container" :selectedItems.sync="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map-2>
      </div>
      <div class="page-visual__section" v-if="currentItem === '1-4'">
        <!-- 基于 G2 的地图（行为轨迹） -->
        <chart-map-controller v-if="mapSceneLoaded" class="chart-map-controller" :selectedItems.sync="chartMapSelectedItems" :mapType="2"></chart-map-controller>
        <chart-map-3 class="chart-map-3 map-container" :selectedItems.sync="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map-3>
      </div>
    </div>
    <div class="page-visual__tip" v-else>
      <Steps class="page-visual__tip-steps" :current="0" status="error">
        <Step title="读取数据" content=""></Step>
        <Step title="查看图表" content=""></Step>
      </Steps>
    </div>
  </div>
</template>

<script>
import Sidebar from "./common/sidebar";
import ChartMap from "./chart/map";
import ChartMap2 from './chart/map-2';
import ChartMap3 from './chart/map-3';
import ChartMapController from "./chart/map-controller";
import ChartPie from "./chart/pie";

export default {
  name: "page-visual",
  props: {},
  components: {
    "common-sidebar": Sidebar,
    "chart-pie": ChartPie,
    "chart-map": ChartMap,
    "chart-map-2": ChartMap2,
    "chart-map-3": ChartMap3,
    "chart-map-controller": ChartMapController,
  },
  data() {
    return {
      currentItem: '1-1',
      mapSceneLoaded: false,
      chartMapSelectedItems: [],
    }
  },
  computed: {
    hasCsvData() {
      return this.$store.state.Common.csvData !== null;
    }
  },
  beforeCreate() {
    if(this.hasCsvData === null) this.$router.push('/');
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.page-visual {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  .common-sidebar {
    flex: 0 0 240px;
  }
  &__content {
    flex: 1 1 auto;
  }
  &__content, &__tip, &__section {
    width: 100%;
    height: 100%;
  }
  &__tip {
    display: flex;
    justify-content: center;
    align-items: center;
    &-steps {
      width: 400px;
    }
  }

  &__section {
    position: relative;
  }
  
  .map-container {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .chart-map-controller {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 3;
  }
  .chart-pie {
    flex: 1 1 auto;
  }
}
</style>
