import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const token = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(token)
    // user: JSON.parse(window.localStorage.getItem(token))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(token, state.user)
      //   window.localStorage.setItem(token, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
