import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLooged: false,
    user:{
      name: '',
      photo: '',
      email: ''
    }
  },
  mutations: {
    setUserInfo(state,value){
      state.user.name= value.name
      state.user.photo= value.photo
      state.user.email = value.email


      state.isLooged = true
    },
    
  },
  actions: {
    logIn({commit}, value){
      commit('setUserInfo',value)
      
    }

  },
  modules: {
  },
  getters: {
    getLogIn(state){
      return state.isLooged
    },
    getUserInfo(state){
      return state.user
    }
  }
})
