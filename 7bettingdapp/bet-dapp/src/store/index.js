import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../network/getWeb3'
import pollWeb3 from '../network/pollWeb3'
import getContract from '../network/getContract'

Vue.use(Vuex)
export const store = new Vuex.Store({
 strict: true,
 state,
 mutations: {
 	registerWeb3Instance (state, data) {
	  console.log('registerWeb3instance', data)
	  const result = data
	  let newWeb3 = state.web3
	  newWeb3.coinbase = result.coinbase
	  newWeb3.networkId = result.networkId
	  newWeb3.balance = parseInt(result.balance, 10)
	  newWeb3.isInjected = result.injectedWeb3
	  newWeb3.web3Instance = result.web3
	  state.web3 = newWeb3
	  pollWeb3()
	},

	updateWeb3Instance (state, data) {
	  console.log('updateWeb3Instance', data)
	  state.web3.coinbase = data.coinbase
	  state.web3.balance = parseInt(data.balance, 10)
	},

	registerContractInstance (state, data) {
	  console.log('contract instance: ', data)
	  state.contractInstance = () => data
	}

 },
 actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        console.log('commit result')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.error('error', e)
      })
    },

    updateWeb3 ({commit}, data) {
      commit('updateWeb3Instance', data)
    },

    getContractInstance ({commit}) {
      getContract.then(result => {
      	commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    }
 }
})
