<template>
  <Menu class="menu" mode="horizontal" theme="light" :active-name="currentRoute">
    <!-- <MenuItem class="menu__item" name="/setting" :replace="false">
      <Icon type="ios-analytics"/>Setting
    </MenuItem> -->
    <MenuItem class="menu__item" name="/visual" to="/visual" :replace="false">
      <Icon type="md-pie"/>Visual
    </MenuItem>
    <MenuItem class="menu__item" name="/" to="/" :replace="false">
      <Icon type="md-barcode"/>Index
    </MenuItem>
  </Menu>
</template>

<script>
export default {
  name: "common-header",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  &__item {
    float: right !important;
  }
}
</style>
