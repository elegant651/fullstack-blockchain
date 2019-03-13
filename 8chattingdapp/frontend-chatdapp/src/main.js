import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueChatScroll from 'vue-chat-scroll'

import Config from './config'
import Web3 from 'web3'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueChatScroll)

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
  render: h => h(App),
}).$mount('#app')
