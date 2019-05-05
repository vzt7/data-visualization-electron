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
import { setTimeout } from 'timers';

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
      predChart: null,
    };
  },
  mounted() {
    this.setPie(this.selectedStu);
  },
  watch: {
    selectedStu(stu) {
      // 当前选择变化时修改数据
      setTimeout(() => {
        // 延迟 400ms 修改
        this.predChart.changeData(this.initDataOfPredChart(stu));
      }, 400);
    }
  },
  methods: {
    initDataOfPredChart(selectedStu) {
      return [{
        item: '升学',
        percent: ~~(selectedStu.Promotion * 100000) / 1000,
      }, {
        item: '待就业',
        percent: ~~(selectedStu.Unemployment * 100000) / 1000,
      }, {
        item: '签约就业',
        percent: ~~(selectedStu.EmploymentWithContract * 100000) / 1000,
      }, {
        item: '未签约就业',
        percent: ~~(selectedStu.EmploymentWithoutContract * 100000) / 1000,
      }];
    },
    setPie(selectedStu) {
      let data = this.initDataOfPredChart(selectedStu);
      let chart = new G2.Chart({
        container: 'pie-container',
        forceFit: true,
        // height: window.innerHeight
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            // val = val * 100 + '%';
            return val.toFixed(2) + '%';
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
        return {
          name: item,
          value: percent + '%'
        };
      }).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
      // interval.setSelected(data[1]);
      this.predChart = chart;
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
