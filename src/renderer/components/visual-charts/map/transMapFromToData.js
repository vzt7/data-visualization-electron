import provincePosArray from '../../../lib/province-pos.js';

export default function() {
  // 获取渲染数据

  // 没有就业去向的
  const stuFromObj = {};
  // 有就业去向的
  const stuFromToArray = [];
  // 有就业去向的（groupby）
  const stuToObj = {};
  console.log(this.$store.state)
  const stateMapData = this.$store.state.Map.mapData;
  if(stateMapData && stateMapData.stuFromToArray) return [stateMapData.stuFromObj, stateMapData.stuToObj, stateMapData.stuFromToArray];
  stateMapData.map(stu => {
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
  this.$store.dispatch('setMapData', { stuFromObj, stuToObj, stuFromToArray });
  return [stuFromObj, stuToObj, stuFromToArray];
}
