<template>
  <div id="pie-container">
    <div id="pie-container__sex" class="pie-section"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";

export default {
  name: "chart-pie",
  props: {},
  data() {
    return {
      presetData: [],
    };
  },
  created() {
  },
  mounted() {
    this.setPieOfSex();
  },
  computed: {
    stuData() {
      return this.$store.state.Common.stuData;
    }
  },
  methods: {
    setPieOfSex() {
      let data = [{
        item: '男',
        count: 0,
        percent: 0,
      }, {
        item: '女',
        count: 0,
        percent: 0,
      }];
      this.stuData.map(stu => data[stu.xb].count++);
      
      this.setPie(data, 'pie-container__sex');      
    },
    setPie(data, mountNode) {
      const total = data.reduce((a, b) => a.count + b.count);
      data.map(t => t.percent = t.count / total);
      const chart = new G2.Chart({
        container: mountNode,
        forceFit: true,
        animate: false
      });
      chart.source(data);
      chart.coord("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.guide().html({
        position: ["50%", "50%"],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">Total<br><span style="color:#8c8c8c;font-size:20px">${total}</span></div>`,
        alignX: "middle",
        alignY: "middle"
      });
      let interval = chart
        .intervalStack()
        .position("percent")
        .color("item")
        .label("percent", {
          formatter: function formatter(val, item) {
            return item.point.item + ": " + val;
          }
        })
        .tooltip("item*percent", function(item, percent) {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.render();
      // interval.setSelected(data[0]);
    }
  }
};
</script>

<style lang="scss">

#pie-container {
  display: flex;
  flex-flow: row nowrap;
}

.pie-section {
  flex: 1 0 50%;
}

</style>
