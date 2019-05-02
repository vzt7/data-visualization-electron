export default {
  state: {
    stuData: null, // 学生入学数据
    stuTermData: null, // 学生学期数据
  },
  mutations: {
    setStuData(state, data) {
      state.stuData = data;
    },
    setStuTermData(state, data) {
      state.stuTermData = data;
    },
  },
  actions: {
    setStuData(context, data) {
      context.commit('setStuData', data)
    },
    setStuTermData(context, data) {
      context.commit('setStuTermData', data)
    },
  }
}