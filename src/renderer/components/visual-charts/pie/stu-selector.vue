<template>
  <div class="stu-selector">
    <Select filterable @on-change="onSelect" :value="0">
      <Option
        v-for="(item, index) in stuData"
        :value="index"
        :key="item.sno"
      >{{ `${item.sno} - ${(~~(item.Unemployment * 10000) / 100).toFixed(2)}% (Unemployment)` }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'stu-selector',
  props: {
    selectedStu: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    stuData() {
      return this.$store.state.Common.stuData;
    }
  },
  methods: {
    onSelect(index) {
      this.$emit('update:selectedStu', this.stuData[index]);
    }
  }
}
</script>

<style lang="scss" scoped>



</style>

