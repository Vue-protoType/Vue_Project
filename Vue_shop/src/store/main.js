import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
      cartListNum:sessionStorage.getItem('Num'),
      orderAddress:sessionStorage.getItem('Address')
    },
    mutations:{
      gainNum(state,payload){
        sessionStorage.setItem('Num',payload.Num)
      },
      orderAddress(state,payload){
        sessionStorage.setItem('Address',payload.addressId)
      }
    }
})
