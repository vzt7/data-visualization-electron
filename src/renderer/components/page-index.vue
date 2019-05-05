<template>
  <div class="index">
    <!-- <img src="../assets/scuec.jpg" alt="SCUEC" class="index__logo"> -->
    <div class="index__hello">
      <p class="index__title">
        Data<span class="index__title-force"><span class="text-offset">V</span>isuali<span class="text-offset">z</span>a<span class="text-offset">t</span>ion</span> of SCUEC
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-index",
  props: {},
  data() {
    return {}
  },
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
        animation: wave--down 4s 0.7s infinite alternate;
      }

      &:nth-child(2) {
        animation: wave--up 5s 0.7s infinite alternate;
      }

      &:nth-child(3) {
        animation: wave--down 3s 0.7s linear infinite alternate;
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


