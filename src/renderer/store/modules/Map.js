export default {
  state: {
    mapData: null,
  },
  mutations: {
    setMapData(state, data) {
      state.mapData = data;
    }
  },
  actions: {
    setMapData(context, data) {
      context.commit('setMapData', data)
    }
  }
}