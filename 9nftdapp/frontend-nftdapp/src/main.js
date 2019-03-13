import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Web3 from 'web3'

import Config from './config'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
  created() {
  	const web3js = window.web3
    if(typeof web3js !== 'undefined') {
      this.$web3 = new Web3(web3js.currentProvider)
    }

    this.$getDefaultAccount = () => {
    	return new Promise((resolve, reject) => {
    		this.$web3.eth.getAccounts((err, data) => {
    			if(!err) resolve(data[0])
    			reject(err)
    		})
    	})
    }
    this.$config = Config
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
