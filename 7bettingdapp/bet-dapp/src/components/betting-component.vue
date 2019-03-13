<template>
 <div class="betting">
   <h1>Bet Dapp Test</h1>   
   Amount: <input v-model="amount" placeholder="0 Ether">
   <ul>
     <li v-on:click="_clickNumber">1</li>
     <li v-on:click="_clickNumber">2</li>
     <li v-on:click="_clickNumber">3</li>
     <li v-on:click="_clickNumber">4</li>
     <li v-on:click="_clickNumber">5</li>
  </ul>
  <div v-if="pending" id="loader">Loading...</div>
  <div class="event" v-if="winEvent">
    Won: {{ winEvent._result }}
    Amount: {{ winEvent._amount }} Wei
  </div>
 </div>
</template>

<script>
export default {
  name: 'betting-component',
  data() {
    return {
      amount: null,
      pending: false,
      winEvent: null
    }
  },  

  mounted () {
    this.$store.dispatch('getContractInstance')
  },

  methods: {
    _clickNumber (event) {
      console.log('betting number', event.target.innerHTML, this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().bet(event.target.innerHTML, {
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.error(err)
          this.pending = false
        } else {
          const Won = this.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.error('won', error)
            } else {
              this.winEvent = result.args
              this.winEvent._amount = parseInt(result.args._amount, 10)
              this.pending = false
            }
          })
        }
      })
    }
  }

 
}
</script>

<style scoped>
.betting {
 margin-top: 50px;
 text-align:center;
}
ul {
 margin: 25px;
 list-style-type: none;
 display: grid;
 grid-template-columns: repeat(5, 1fr);
 grid-column-gap:25px; 
}
li{
 padding: 20px;
 margin-right: 3px;
 border-radius: 30%;
 cursor: pointer;
 background-color:#fff;
 color: #4b08e0;
 box-shadow:3px 5px 1px #4b08e0;
}
li:hover{
 background-color:#4b08e0;
 color:white;
 box-shadow:0px 0px 1px #4b08e0;
}
li:active{
 opacity: 0.7;
}
*{
 color: #444444;
}
</style>

