<template>
  <div class="index">
    <!-- <img src="../assets/scuec.jpg" alt="SCUEC" class="index__logo"> -->
    <div class="index__hello">
      <p class="index__title">
        Data<span class="index__title-force"><span class="text-offset">V</span>isuali<span class="text-offset">z</span>a<span class="text-offset">t</span>ion</span> of SCUEC
      </p>
      <Upload
        v-if="onLoaded && loadPercent >= 100"
        class="index__selector"
        :before-upload="handleSelect"
        :show-upload-list="false"
        :format="['csv']"
        :on-format-error="handleFormatError"
        accept="file"
        action="//"
      >
        <Button
          class="index__btn"
          icon="md-analytics"
          size="large"
          ghost
        >{{ file !== null ? `已选择：${file.name}` : '选择你的 .csv 文件'}}</Button>
      </Upload>
      <p v-else class="index__loading">{{ '外部依赖加载中... ' + loadPercent + '%' }}</p>
    </div>
  </div>
</template>

<script>
import csvToJsObject from "../lib/csv-to-js-object.js";
import { setTimeout } from 'timers';

export default {
  name: "page-index",
  props: {},
  data() {
    return {
      file: null,
      loadingStatus: false,
      onLoaded: false,
      loadPercent: 0,
    };
  },
  created() {
    window.onload = () => {
      this.onLoaded = true;
      let fn = () => {
        if(this.loadPercent < 100) {
          this.loadPercent ++;
          window.requestAnimationFrame(fn);
        }
      }
      window.requestAnimationFrame(fn);
    }
  },
  computed: {
  },
  methods: {
    handleSelect(file) {
      // 只允许选择 csv 格式的文件
      if (file.name.split(".").pop() !== "csv") this.handleFormatError(file);
      else {
        this.file = file;
        this.read();
      }
      return false;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "你所选择的 " + file.name + " 不是 .csv 格式，请重试"
      });
    },
    async read() {
      // 这里是获取csv里数据的过程，不上传，数据暂存在vuex
      this.loadingStatus = true;

      // 读取 csv 文件并转为 js对象，存入store
      await this.readCsv(this.file)
        .then(data => this.getCsvAsJsObject(data))
        .then(csvData => this.$store.dispatch("setCsvData", csvData));
      this.loadingStatus = false;
      this.$Notice.success({
        title: "成功",
        desc: `已从 ${this.file.name} 中读取数据`
      });
    },
    readCsv(file) {
      return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.onload = event => {
          // this.csv = new CSV(data);
          res(event.target.result);
        };
        reader.readAsText(file, "gbk");
      });
    },
    getCsvAsJsObject(csvText) {
      return csvToJsObject(csvText);
    }
  }
};
</script>

<style lang="scss" scoped>
$index-bg: '../assets/index-bg.jpg';
$title-force-color: #02b0e5;
$button-border-color: #02b0e5;

@mixin item-selected($color: #fff) {
  color: $color;
  letter-spacing: 2px;
  transform: translateY(-5px);
}

.index {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: gray;
  background-image: url($index-bg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  &__selector {
    display: flex;
    justify-content: center;
  }

  &__btn {
    margin: 50px 0;
  }

  // &__logo
  // position absolute
  // left 10px
  // top 10px
  // width 130px
  // height 100px
  &__hello {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }

  &__title {
    padding: 20px 0 40px 0;
    font-size: 50px;
    font-weight: 550;
    color: #fff;
    text-align: center;
    animation: letter-spacing-trans 1.5s 0.5s both;

    @keyframes letter-spacing-trans {
      from {
        letter-spacing: 0;
      }

      to {
        letter-spacing: 7px;
      }
    }

    &>p>span {
      font-size: 70px;
    }

    &-force {
      position: relative;
      color: $title-force-color;

      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: -75%;
        bottom: -30px;
        width: 60%;
        border-bottom: 3px solid $title-force-color;
      }
    }

    .text-offset {
      display: inline-block;
      padding: 0 2px;
      transform: translateY(0);

      &:nth-child(1) {
        animation: wave--down 3s 0.7s infinite alternate;
      }

      &:nth-child(2) {
        animation: wave--up 4s 0.7s infinite alternate;
      }

      &:nth-child(3) {
        animation: wave--down 2s 0.7s ease-out infinite alternate;
      }

      @keyframes wave--up {
        0% {
          transform: translateY(0);
        }

        // 30%
        // transform translateY(-15px)
        100% {
          transform: translateY(20px);
        }
      }

      @keyframes wave--down {
        0% {
          transform: translateY(0);
        }

        // 30%
        // transform translateY(20px)
        100% {
          transform: translateY(-20px);
        }
      }
    }
  } // title

  &__loading {
    margin: 50px 0;
    font-size: 18px;
    font-weight: 550;
    text-align: center;
    color: #fff;
  }
}
</style>


