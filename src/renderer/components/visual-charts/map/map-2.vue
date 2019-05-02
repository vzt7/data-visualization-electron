<template>
  <div class="map-container">
    <div id="map"></div>
    <div id="map-guide"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';

import transFn from './transMapFromToData.js';

export default {
  name: "chart-map-2",
  props: {
    selectedItems: {
      type: Array
    },
    mapSceneLoaded: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      stuFromObj: {},
      stuToObj: {},
      stuFromToArray: [],
      changeItemsAppendMapObj: {
        'fromMap': self => self.setMap(self.stuFromObj) && self.mapGuideChart ? self.mapGuideChart.changeData(self.getGuideViewData(self.stuFromObj)).repaint() : self.setMapGuideChart(self.getGuideViewData(self.stuFromObj)),
        'toMap': self => self.setMap(self.stuToObj) && self.mapGuideChart ? self.mapGuideChart.changeData(self.getGuideViewData(self.stuToObj)).repaint() : self.setMapGuideChart(self.getGuideViewData(self.stuToObj)),
      },
      changeItemsRemoveMapObj: {
        'fromMap': self => self.mapChart.destroy() && self.mapGuideChart.clear().repaint(),
        'toMap': self => self.mapChart.destroy() && self.mapGuideChart.clear().repaint(),
      },
      mapChart: null,
      mapGuideChart: null,
    };
  },
  async mounted() {
    [this.stuFromObj, this.stuToObj, this.stuFromToArray] = [...this.getFromToData()];
    // this.setMap();
    this.$emit('update:mapSceneLoaded', true);
  },
  watch: {
    selectedItems(newArr, oldArr) {
      console.log(...arguments);
      let removeArr = oldArr.filter(item => newArr.indexOf(item) < 0);
      let appendArr = newArr.filter(item => oldArr.indexOf(item) < 0);
      removeArr.forEach(item => this.changeItemsRemoveMapObj[item](this));
      appendArr.forEach(item => this.changeItemsAppendMapObj[item](this));
    }
  },
  methods: {
    getFromToData() {
      return transFn.call(this);
    },
    setMap(stuObj) {
      let chart = new G2.Chart({
        container: 'map',
        forceFit: true,
        height: 700,
        padding: [55, 20]
      });

      chart.tooltip({
        showTitle: false
      });
      // 同步度量
      chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      });
      chart.axis(false);
      chart.legend('trend', {
        position: 'top'
      });

      // 使用mapObj映射出geoObj.features.geometry
      let mapObj = require('../../../lib/china-pos.json');
      let geoObj = {
        'type': 'FeatureCollection',
        'features': [],
      }
      let viewData = [];
      mapObj.features.map(prov => {
        let sameName = Object.values(stuObj).find(x => prov.properties.name.includes(x.name));
        let count = sameName ? sameName.count : 0;
        geoObj.features.push({
          'type': 'Feature',
          'geometry': {
            'type': prov.geometry.type,
            'coordinates': prov.geometry.coordinates,
          },
          'properties': {
            'name': prov.properties.name,
            'count': count,
          }
        });
        viewData.push({
          'province': prov.properties.name,
          'count': count,
        });
      });

      // 绘制世界地图背景
      let ds = new View.DataSet();
      let chinaMap = ds.createView('back').source(geoObj, {
        type: 'GeoJSON'
      });
      let chinaMapView = chart.view();
      chinaMapView.source(chinaMap);
      chinaMapView.tooltip(false);
      chinaMapView.polygon().position('longitude*latitude').style({
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 1
      });
      let userDv = ds.createView().source(viewData).transform({
        geoDataView: chinaMap,
        field: 'province',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          obj.trend = obj.count;
          return obj;
        }
      });
      let userView = chart.view();
      userView.source(userDv, {
        'province': {
          alias: '省份'
        },
        'trend': {
          alias: '总计'
        }
      });
      userView.polygon().position('longitude*latitude').color('trend', '#BAE7FF-#1890FF-#0050B3').opacity('value').tooltip('province*trend').animate({
        leave: {
          animation: 'fadeOut'
        }
      });
      chart.render();

      this.mapChart = chart;
      return chart;
    },
    setGuide(viewData) {
      let chart = new G2.Chart({
        container: 'map-guide',
        forceFit: true,
        height: 350
      });
      chart.source(viewData, {
        'count': {
          alias: '人数'
        }
      });
      chart.axis('name', {
        label: {
          offset: 12
        }
      });
      chart.coord().transpose();
      chart.interval().position('name*count');
      chart.render();
      return chart;
    },
    getGuideViewData(stuObj) {
      return Object.values(stuObj).sort((x, y) => y.count - x.count).slice(0, 10).reverse();
    },
    setMapGuideChart(data) {
      this.mapGuideChart = this.setGuide(this.getGuideViewData(data));
    }
  }
}
</script>

<style lang="scss" scoped>
  #map {
    width: 950px;
  }
  #map-guide {
    position: absolute;
    right: 30px;
    top: 0;
    width: 300px;
  }
</style>
