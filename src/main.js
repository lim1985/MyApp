import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store/'
// import debounce from 'lodash.debounce'
import { VueAxios } from "@/utils/request"
// import './mock'

import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'

import '@/permission' // permission control
import '@/utils/filter' // base filter

import {User_ID, ACCESS_TOKEN, DEFAULT_COLOR, DEFAULT_THEME, DEFAULT_LAYOUT_MODE, DEFAULT_COLOR_WEAK, SIDEBAR_TYPE } from "@/store/mutation-types"
import config from '@/defaultConfig'
import moment from 'moment'//导入文件
import LUbox from '@/assets/js/LIm_UBOX'
//  var debounce = require('lodash.debounce');
// import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$LUBOX = LUbox;//赋值使用
Vue.config.productionTip = false
// axios.defaults.withCredentials=true;
Vue.use(Storage, config.storageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(Viser)
// Vue.use(debounce)

// Vue.component('PhoneModal', PhoneModal)
new Vue({
  router,
  store,
  // components: {  
  //   PhoneModal,  
  //   // Myselect
  //   // OrgModal
  // },
  mounted () {
    
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, false))
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
   
    console.log(`来自main.js文件`)
    console.log(Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_USERID', Vue.ls.get(User_ID))
  },
  render: h => h(App)
}).$mount('#app')
