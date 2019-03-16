<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import provincePosArray from '../../lib/province-pos.js';

/* eslint-disable */
export default {
  name: "chart-map",
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
        'fromMap': self => self.mapFromPointsLayer ? self.mapFromPointsLayer.show() : self.setMapFromPoints(self.mapScene, self.stuFromObj),
        'toMap': self => self.mapToPointsLayer ? self.mapToPointsLayer.show() : self.setMapToPoints(self.mapScene, self.stuToObj),
        'fromToMap': self => self.mapLinesLayer ? self.mapLinesLayer.show() : self.setMapLines(self.mapScene, self.stuFromToArray),
        'fromMap2': self => self.mapFromPolygonsLayerArr ? self.mapFromPolygonsLayerArr.map(layer => layer.show()) : self.setMapFromPolygons(self.mapScene, self.stuFromObj),
        'toMap2': self => self.mapToPolygonsLayerArr ? self.mapToPolygonsLayerArr.map(layer => layer.show()) : self.setMapToPolygons(self.mapScene, self.stuToObj),
      },
      changeItemsRemoveMapObj: {
        'fromMap': self => self.mapFromPointsLayer.hide(),
        'toMap': self => self.mapToPointsLayer.hide(),
        'fromToMap': self => self.mapLinesLayer.hide(),
        'fromMap2': self => self.mapFromPolygonsLayerArr.map(layer => layer.hide()),   
        'toMap2': self => self.mapToPolygonsLayerArr.map(layer => layer.hide()),
      },
      mapScene: null,
      mapFromPointsLayer: null,
      mapToPointsLayer: null,
      mapLinesLayer: null,
      mapFromPolygonsLayerArr: null,
      mapToPolygonsLayerArr: null,
    };
  },
  async mounted() {
    [this.stuFromObj, this.stuToObj, this.stuFromToArray] = await [...this.getFromToData()];
    this.setMap();
    // this.setMapGuideChart(this.stuFromObj);
    // console.log(this.stuFromObj, this.stuToObj);
  },
  destroyed() {
    Object.values(this.changeItemsRemoveMapObj).map(fn => {
      try {
        fn(this)
      } catch(err) {
        // err
      }
    });
  },
  computed: {
  },
  watch: {
    selectedItems(newArr, oldArr) {
      let removeArr = oldArr.filter(item => newArr.indexOf(item) < 0);
      let appendArr = newArr.filter(item => oldArr.indexOf(item) < 0);
      appendArr.forEach(item => this.changeItemsAppendMapObj[item](this));
      removeArr.forEach(item => this.changeItemsRemoveMapObj[item](this));
    },
  },
  methods: {
    getFromToData() {
      // 获取渲染数据

      // 没有就业去向的
      const stuFromObj = {};
      // 有就业去向的
      const stuFromToArray = [];
      // 有就业去向的（groupby）
      const stuToObj = {};
      this.$store.state.Common.csvData.map(stu => {
        let fromPos = provincePosArray.find(prov => stu.from && stu.from.includes(prov.name));
        let toPos = provincePosArray.find(prov => stu.to && stu.to.includes(prov.name));
        if(fromPos && !toPos) {
          if(stuFromObj[fromPos.name]) stuFromObj[fromPos.name].count += 1;
          else {
            stuFromObj[fromPos.name] = { name: fromPos.name, count: 1 };
            stuFromObj[fromPos.name].geoCoord = fromPos.geoCoord;
          }
        }
        if(fromPos && toPos) {
          stuFromToArray.push({
            from: fromPos.geoCoord,
            to: toPos.geoCoord,
          });
          if(stuToObj[toPos.name]) stuToObj[toPos.name].count += 1;
          else {
            stuToObj[toPos.name] = { name: toPos.name, count: 1 };
            stuToObj[toPos.name].geoCoord = toPos.geoCoord;
          }
        }
      });
      this.$store.dispatch('setMapData', { stuFromObj, stuFromToArray });
      return [stuFromObj, stuToObj, stuFromToArray];
    },
    setMap() {
      // L7 和 turf 等地图相关依赖从 index.html / script标签 引入
      const scene = new L7.Scene({
        id: 'map',
        mapStyle: 'light',
        center: [116.2825, 39.9],
        pitch: 0,
        zoom: 4,
      });
      this.mapScene = scene;
      scene.on('loaded', () => {
        this.$emit('update:mapSceneLoaded', true);
      });
    },
    setMapLines(scene, stuFromToArray) {
      let features = [];
      // let obj = {};
      // for(let row of stuFromToArray) {
      //   let temp = obj[row.from.join('')+row.to.join('')];
      //   if(temp) temp.count += 1;
      //   else {
      //     obj[row.from.join('')+row.to.join('')] = {
      //       count: 1,
      //       from: row.from,
      //       to: row.to,
      //     }
      //   }
      // }
      // for(let val of Object.values(obj)) {
      //   if(val.from && val.to) {
      //     let from = turf.point(val.from);
      //     let to = turf.point(val.to);
      //     let greatCircle = turf.greatCircle(from, to, {
      //       'npoints': val.count < 100 ? 100 : val.count*5,
      //     });
      //     features.push(greatCircle);
      //   }
      // }
      for(let row of stuFromToArray) {
        if(row.from && row.to) {
          // 过滤掉为 null 的情况
          let from = turf.point(row.from);
          let to = turf.point(row.to);
          let greatCircle = turf.greatCircle(from, to);
          features.push(greatCircle);
        }
      }
      let fc = turf.featureCollection(features);
      this.mapLinesLayer = scene.LineLayer({
        zIndex: 2
      })
      .source(fc)
      .color('rgb(13,64,140)')
      .style({
        opacity: 0.6
      })
      .render();
    },
    setMapPoints(scene, stuObj, pointsColorArr, opacity=0.4) {
      let features = [];
      for(let key of Object.keys(stuObj)) {
        let obj = stuObj[key];
        features.push({
          type: 'Feature',
          properties: {
            name: obj.name,
            type: obj.name,
            value: obj.count,
          },
          geometry: {
            type: 'MultiPoint',
            coordinates: [
              obj.geoCoord,
            ]
          }
        });
      }
      let fc = turf.featureCollection(features);
      return scene.PointLayer({
        zIndex: 2,
      }).source(fc, {
        scale: {
          min: 0,
          max: 1000,
          type: 'linear',
        }
      }).shape('2d:circle')
        .size('value', [2, 50])
        .color('type',  pointsColorArr.reverse())
        .style({
          // stroke: 'rgb(255, 255, 255)',
          // strokeWidth: 1,
          opacity
        }).render();
    },
    setMapPolygons(scene, stuObj, polygonsColorArr) {
      let mapObj = require('../../lib/china-pos.json');
      let geoObj = {
        'type': 'FeatureCollection',
        'features': [],
      }
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
      });
      // geoObj.features.splice(12);
      // for(let item of Object.values(stuObj)) {
      //   // 从china-pos.json 中获得构成多边形的经纬度
      //   let temp = mapObj.features.find(prov => prov.properties.name.includes(item.name));
      //   geoObj.features.push({
      //     'type': 'Feature',
      //     'geometry': {
      //       'type': 'Polygon',
      //       'coordinates': temp.geometry.coordinates,
      //     },
      //     'properties': {
      //       'name': item.name,
      //       'count': item.count,
      //     }
      //   });
      // }
      let layer1 = scene.PolygonLayer().source(geoObj)
        .color('count', polygonsColorArr)
        // .color('percent', function(p) {
        //   console.log(p);
        //   switch(p) {
        //     case p>0.8: return polygonsColorArr[5];
        //     case p>0.6: return polygonsColorArr[4];
        //     case p>0.4: return polygonsColorArr[3];
        //     case p>0.2: return polygonsColorArr[2];
        //     case p>0.1: return polygonsColorArr[1];
        //     default: return polygonsColorArr[0];
        //   };
        // })
        .shape('fill').active(false).style({
          opacity: 1
        }).render();
      let layer2 = scene.PolygonLayer().source(geoObj).shape('line').color('#fff').style({
        opacity: 0.1
      }).render();
      return [layer1, layer2];
    },
    setMapFromPoints(scene, stuFromObj) {
      let colorArr = ["#FFF4F2", "#FFDFDB", "#FAADAA", "#F77472", "#F04850"];
      this.mapFromPointsLayer = this.setMapPoints(scene, stuFromObj, colorArr, 0.5);
    },
    setMapToPoints(scene, stuToObj) {
      let colorArr = ["#D63147", "#BD223E", "#A81642", "#820C37", "#5C0023"];
      this.mapToPointsLayer = this.setMapPoints(scene, stuToObj, colorArr, 0.85);
    },
    setMapFromPolygons(scene, stuFromObj) {
      let colorArr = ["#FFF5B8", "#FFDC7D", "#FFAB5C", "#F27049", "#D42F31", "#730D1C"];
      this.mapFromPolygonsLayerArr = this.setMapPolygons(scene, stuFromObj, colorArr);
    },
    setMapToPolygons(scene, stuToObj) {
      let colorArr = ["#FFF5B8", "#FFDC7D", "#FFAB5C", "#F27049", "#D42F31", "#730D1C"];
      this.mapToPolygonsLayerArr = this.setMapPolygons(scene, stuToObj, colorArr);
    },
  }
}
</script>

<style lang="scss" scoped>
  #map {
    width: 150%;
    height: 150%;
    margin: -60px 0 0 -240px;
    overflow: hidden;
  }
</style>
