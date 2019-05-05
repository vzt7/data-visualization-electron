<template>
  <p class="index__loading">高德地图依赖加载中... {{ loadPercent >= 100 ? 'OK' : loadPercent + ' %' }}</p>
</template>

<script>
export default {
  name: 'amap-checker',
  props: {},
  data() {
    return {
      loadPercent: 0,
    };
  },
  mounted() {
    this.checkMapLoadStatus();
  },
  methods: {
    loadAnimation() {
      if(this.loadPercent < 100) {
        this.loadPercent ++;
        return window.requestAnimationFrame(this.loadAnimation);
      }
    },
    checkMapLoadStatus() {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
