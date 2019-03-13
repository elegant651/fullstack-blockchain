<template>
 <div class='metamask-info'>
   <p>연결 상태 : {{ web3.isInjected }}</p>
   <p>네트워크: {{ web3.networkId }}</p>
   <p>코인베이스 주소: {{ web3.coinbase }}</p>
   <p>잔액: {{ web3.balance }}</p>
 </div>
</template>
<script>
export default {
 name: 'dapp-metamask',
 computed: {
   web3 () {
     return this.$store.state.web3
     }
   }
}
</script>
<style scoped>
</style>
