import Web3 from 'web3'
import {address, ABI} from './betContract'
const getContract = new Promise(function (resolve, reject) {
 const web3 = new Web3(window.web3.currentProvider)
 const betContract = web3.eth.contract(ABI)
 const betContractInstance = betContract.at(address)
 resolve(betContractInstance)
})
export default getContract
