<template>
  <div class="pie-prediction">
    <div class="stu-info">
      <p v-for="(key, index) in Object.keys(selectedStu)" :key="index">{{ `${key}: ${selectedStu[key]}` }}</p>
    </div>
    <div id="pie-container" ref="pieContainer"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";

import StuSelector from './stu-selector'

export default {
  name: "chart-pie-predict",
  components: {
    'stu-selector': StuSelector,
  },
  props: {
    selectedStu: { // 当前所选择的学生
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      stuData: this.$store.state.Common.stuData,
    };
  },
  created() {
    console.log(this.selectedStu);
  },
  mounted() {
    this.setPie();
  },
  methods: {
    setPie() {
      let temp = {
      }
      let data = [{
        item: '升学',
        percent: +this.selectedStu.Promotion.toFixed(2)
      }, {
        item: '待就业',
        percent: +this.selectedStu.Unemployment.toFixed(2)
      }, {
        item: '签约就业',
        percent: +this.selectedStu.EmploymentWithContract.toFixed(2)
      }, {
        item: '未签约就业',
        percent: +this.selectedStu.EmploymentWithoutContract.toFixed(2)
      }];
      let chart = new G2.Chart({
        container: 'pie-container',
        forceFit: true,
        // height: window.innerHeight
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      let interval = chart.intervalStack().position('percent').color('item').label('percent', {
        formatter: function formatter(val, item) {
          return item.point.item + ': ' + val;
        }
      }).tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      }).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
      // interval.setSelected(data[1]);
    }
  }
};
</script>

<style lang="scss">

.pie-prediction {
  display: flex;
  flex-flow: row nowrap;
}

.stu-info {
  flex: 0 1 400px;
  padding: 50px 0 0 100px;
  font-size: 15px;
}

#pie-container {
  flex: 1 1 auto;
}

</style>
