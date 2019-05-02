<template>
  <Menu :active-name="currentItem" :open-names="['1']" @on-select="menuSelect">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-analytics"/>Base
      </template>
      <MenuGroup title="统计相关">
        <MenuItem name="1-1-1">Stu Info</MenuItem>
        <MenuItem name="1-1-2">Prediction</MenuItem>
      </MenuGroup>
      <MenuGroup title="就业去向">
        <MenuItem name="1-2-1">L7 Map</MenuItem>
        <MenuItem name="1-2-2">G2 Map</MenuItem>
      </MenuGroup>
      <MenuGroup title="行为轨迹">
        <MenuItem name="1-3-1">Trace</MenuItem>
        <!-- <MenuItem name="1-5">Option 4</MenuItem> -->
      </MenuGroup>
    </Submenu>
    <!-- <Submenu name="2">
      <template slot="title">
        <Icon type="ios-cog"/>Prediction
      </template>
      <MenuItem name="2-1">就业预测</MenuItem>
      <Submenu name="3">
        <template slot="title">Submenu</template>
        <MenuItem name="3-1">Option 7</MenuItem>
        <MenuItem name="3-2">Option 8</MenuItem>
      </Submenu>
    </Submenu> -->
  </Menu>
</template>

<script>
export default {
  name: "common-sidebar",
  props: {
    currentItem: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    menuSelect(name) {
      this.$emit('update:currentItem', name);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
