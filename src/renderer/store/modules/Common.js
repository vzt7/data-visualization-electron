export default {
  state: {
    csvData: null,
  },
  mutations: {
    setCsvData(state, data) {
      state.csvData = data;
    },
  },
  actions: {
    setCsvData(context, data) {
      context.commit('setCsvData', data)
    },
  }
}