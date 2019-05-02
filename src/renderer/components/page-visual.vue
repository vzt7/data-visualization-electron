<template>
  <div class="page-visual">
    <common-sidebar class="common-sidebar" :currentItem.sync="currentItem"></common-sidebar>
    <div class="page-visual__content" v-if="isLoaded">

      <!-- pie -->
      <div class="page-visual__section" v-if="currentItem === '1-1-1'">
        <!-- <chart-pie-stu-selector :selectedStu.sync="chartPieSelectedStu"></chart-pie-stu-selector> -->
        <chart-pie-base class="chart-pie" :selectedStu.sync="chartPieSelectedStu"></chart-pie-base>
      </div>

        <!-- pie - 就业预测 -->
      <div class="page-visual__section" v-if="currentItem === '1-1-2'">
        <chart-pie-stu-selector :selectedStu.sync="chartPieSelectedStu"></chart-pie-stu-selector>
        <chart-pie-prediction class="chart-pie-prediction" :selectedStu.sync="chartPieSelectedStu"></chart-pie-prediction>
      </div>

        <!-- map-1 基于 L7 的地图(需要验证KEY 需要网络) -->
      <div class="page-visual__section" v-if="currentItem === '1-2-1'">
        <chart-map-selector v-if="mapSceneLoaded" class="chart-map-selector" :selectedItems.sync="chartMapSelectedItems" :mapType="1"></chart-map-selector>
        <chart-map class="chart-map map-container" :selectedItems="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map>
      </div>

        <!-- map-2 基于 G2 的地图 -->
      <div class="page-visual__section" v-if="currentItem === '1-2-2'">
        <chart-map-selector v-if="mapSceneLoaded" class="chart-map-selector" :selectedItems.sync="chartMapSelectedItems" :mapType="2"></chart-map-selector>
        <chart-map-2 class="chart-map-2 map-container" :selectedItems.sync="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map-2>
      </div>

        <!-- map-3 基于 G2 的地图（行为轨迹） -->
      <div class="page-visual__section" v-if="currentItem === '1-3-1'">
        <chart-map-selector v-if="mapSceneLoaded" class="chart-map-selector" :selectedItems.sync="chartMapSelectedItems" :mapType="2"></chart-map-selector>
        <chart-map-3 class="chart-map-3 map-container" :selectedItems.sync="chartMapSelectedItems" :mapSceneLoaded.sync="mapSceneLoaded"></chart-map-3>
      </div>

    </div>
    <div class="page-visual__tip" v-else>
      <Steps class="page-visual__tip-steps" :current="0" status="error">
        <Step title="数据未读取" content=""></Step>
      </Steps>
    </div>
  </div>
</template>

<script>
import Sidebar from "./common/sidebar";

import ChartPieBase from "./visual-charts/pie/pie-base";
import ChartPiePrediction from "./visual-charts/pie/pie-prediction";
import ChartPieStuSelector from './visual-charts/pie/stu-selector';

import ChartMap from "./visual-charts/map/map";
import ChartMap2 from './visual-charts/map/map-2';
import ChartMap3 from './visual-charts/map/map-3';
import ChartMapSelector from "./visual-charts/map/map-selector";

export default {
  name: "page-visual",
  props: {},
  components: {
    "common-sidebar": Sidebar,
    "chart-pie-base": ChartPieBase,
    "chart-pie-prediction": ChartPiePrediction,
    "chart-pie-stu-selector": ChartPieStuSelector,
    "chart-map": ChartMap,
    "chart-map-2": ChartMap2,
    "chart-map-3": ChartMap3,
    "chart-map-selector": ChartMapSelector,
  },
  data() {
    return {
      currentItem: '1-1-1',
      mapSceneLoaded: false,
      chartPieSelectedStu: {},
      chartMapSelectedItems: [],
    }
  },
  computed: {
    isLoaded() {
      return this.$store.state.Common.stuData &&
      // this.$store.state.Common.stuTermData &&
      this.$store.state.Map.mapData;
    },
    stuData() {
      return this.$store.state.Common.stuData;
    }
  },
  created() {
    // stu-selector 默认选择第一个
    if(this.stuData && this.stuData.length > 1) this.chartPieSelectedStu = this.stuData[0];
  },
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
  .chart-map-selector {
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
