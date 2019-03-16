<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
require('./map-3-point-info.scss');
const markets = require('../../lib/markets-pos.json')

import transPosFn from '../../lib/amap-bdmap-pos-trans.js';

/* eslint-disable */
export default {
  name: "chart-map-3",
  props: {
    mapSceneLoaded: {
      type: Boolean,
      default: false,
    }
  },
  created() {
  },
  async mounted() {
    let arr = [[114.393114, 30.485042], [114.391114, 30.485542]]
    await this.setMap();
    this.setAllMarketPoints();
    // this.setMapPoints(arr);
    // this.setMapLines(arr);
    // this.setPointInfo();
  },
  data() {
    return {
      marketIcon: require('../../assets/market.png')
    };
  },
  methods: {
    setMap() {
      let map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 16,
        center: [114.393114, 30.485042],
      });
      this.map = map;
      return map;
    },
    setMapPoints(pointsArr) {
      let markers = pointsArr.map(p => {
        let marker = new AMap.Marker({ position: p });
        this.map.add(marker);
        return {
          element: marker,
          position: p
        }
      });
      this.markers = markers;
      return markers;
    },
    setMapLines(pointsArr) {
      pointsArr = [...new Set(pointsArr)];
      let polyline = new AMap.Polyline({
        path: pointsArr,
        strokeColor: "#3366FF", //线颜色
        strokeWeight: 2,        //线宽
        strokeStyle: "solid",   //线样式
      });
      this.map.add(polyline);
    },
    setPointInfo() {
      
      let title = 'title test';
      let content = {
        position: [114.393114, 30.485042],
        count: 6,
        last: '2019年1月16日20:29:14',
        total: 12,
      };
      
      // 实现自定义窗体内容，返回拼接后的字符串
      function createInfoWindow (title, content, fn){
        // 内容拼接
        let div = document.createElement('div');
        div.className = 'point-info'
        div.innerHTML = `
          <div class='point-info--close' onclick='closePointInfo()'>x</div>
          <p>地点：${content.position.join(',')}</p>
          <p>消费次数：${content.count}</p>
          <p>最后消费时间：${content.last}</p>
          <p>总消费金额：${content.total}</p>
        `;
        return div;
      }
      // 创建 infoWindow 实例 
      let infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content),  //传入 dom 对象，或者 html 字符串
        offset: new AMap.Pixel(16, -50)
      });
      // let position = new AMap.LngLat(114.393114, 30.485042);
      // infoWindow.open(this.map, position);
      window['closePointInfo'] = () => infoWindow.close();
      this.markers.map(marker => {
        marker.element.on('click', () => infoWindow.open(this.map, marker.position));
      });
    },
    setAllMarketPoints() {
      let data = markets.map(item => item.slice(3, 6));
      let markersData = {};
      data.filter(item => item[0] && item[1] && item[2]).map(item => {
        if(markersData[item[0]]) {
          // markers[item[0]]['coord'].push(item.slice(1));
        } else {
          markersData[item[0]] = {
            'name': item[0],
            // 'coord': [item.slice(1)]
            'coord': transPosFn(...item.slice(1))
          };
        }
      });
      // let markerArr = [];
      let markers = Object.keys(markersData).map(key => {
        let item = markersData[key];
        let coord = [item.coord.lng, item.coord.lat];
        let name = item.name;
        let marker = new AMap.Marker({
          position: coord,
          title: name,
          icon: this.marketIcon,
          // offset: markerArr.indexOf(coord.toString()) > -1 ? new AMap.Pixel(100*Math.random(), 100*Math.random()) : new AMap.Pixel(0, 0),
        });
        this.map.add(marker);
        // markerArr.push(coord.toString());
        return marker;
      });
      
      // let markers = data.filter(item => item[0] && item[1] && item[2]).map(item => {
      //   let coord = transPosFn(...item.slice(1));
      //   let marker = new AMap.Marker({
      //     position: [coord.lng, coord.lat],
      //     title: item[0],
      //   });
      //   this.map.add(marker);
      //   return {
      //     element: marker,
      //     position: [coord.lng, coord.lat],
      //     name: item[0]
      //   }
      // });
      // console.log(markers);
      return markers;
    }
  }
}
</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
