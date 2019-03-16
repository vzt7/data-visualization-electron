<template>
  <div class="map-controller">
    <CheckboxGroup v-if="mapType === 1" class="map-controller__checkbox-group" v-model="selected">
      <Checkbox label="fromMap">
        <!-- <Icon type="logo-twitter"></Icon> -->
        <span>未就业分布（籍贯）</span>
      </Checkbox>
      <Checkbox label="toMap">
        <!-- <Icon type="logo-facebook"></Icon> -->
        <span>就业分布（就业地）</span>
      </Checkbox>
      <Checkbox label="fromToMap">
        <!-- <Icon type="logo-github"></Icon> -->
        <span>就业去向（籍贯->就业地）</span>
      </Checkbox>
      <Checkbox label="fromMap2">
        <!-- <Icon type="logo-snapchat"></Icon> -->
        <span>未就业分布2（籍贯）</span>
      </Checkbox>
      <Checkbox label="toMap2">
        <!-- <Icon type="logo-snapchat"></Icon> -->
        <span>就业分布2（就业地）</span>
      </Checkbox>
    </CheckboxGroup>
    <RadioGroup v-else class="map-controller__checkbox-group" v-model="selected2">
      <Radio label="fromMap">
        <!-- <Icon type="logo-apple"></Icon> -->
        <span>未就业分布（籍贯）</span>
      </Radio>
      <Radio label="toMap">
        <!-- <Icon type="logo-android"></Icon> -->
        <span>就业分布（就业地）</span>
      </Radio>
    </RadioGroup>
  </div>
</template>

<script>
export default {
  name: "map-controller",
  props: {
    selectedItems: {
      type: Array
    },
    mapType: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      selected: [],
      selected2: '',
    };
  },
  watch: {
    selected(val) {
      this.$emit('update:selectedItems', val);
    },
    selected2(val) {
      this.$emit('update:selectedItems', [val]);
    }
  },
  destroyed() {
    this.$emit('update:selectedItems', []);
  }
}
</script>

<style lang="scss" scoped>
  .map-controller {
    &__checkbox-group {
      display: flex;
      flex-flow: column nowrap;
    }
  }
</style>