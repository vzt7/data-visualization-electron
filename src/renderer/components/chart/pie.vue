<template>
  <div id="pie-container" ref="pieContainer"></div>
</template>

<script>
import G2 from "@antv/g2";

export default {
  name: "chart-pie",
  props: {},
  data() {
    return {
      data: [
        {
          item: "test1",
          count: 1,
          percent: 44
        },
        {
          item: "test2",
          count: 5,
          percent: 55
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.setPie();
  },
  methods: {
    getData() {
      
    },
    setPie() {
      const total = this.data.reduce((a, b) => a.count + b.count);
      const chart = new G2.Chart({
        container: "pie-container",
        forceFit: true,
        animate: false
      });
      chart.source(this.data);
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
            return item.item + ": " + val;
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
      interval.setSelected(this.data[0]);
    }
  }
};
</script>

<style lang="scss">
</style>
