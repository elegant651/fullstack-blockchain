import Web3 from 'web3'

const getWeb3 = new Promise(function (resolve, reject) {
  const web3js = window.web3
  if (typeof web3js !== 'undefined') {
    const web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {    
    reject(new Error('Unable to connect to Metamask'))
  }
})
.then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          reject(new Error('Unable to retrieve network ID'))
        } else {          
          result = {...result, networkId}
          resolve(result)
        }
      })
    })
})
.then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = {...result, coinbase}
          resolve(result)
        }
      })
    })
})
.then(result => {
    return new Promise(function (resolve, reject) {      
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = {...result, balance}
          resolve(result)
        }
      })
    })
})

export default getWeb3