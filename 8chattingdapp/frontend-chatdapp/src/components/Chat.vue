<template>
  <div class="card">
    <div>
        <div class="header">
            <h3>Gazua Room</h3>
            <hr>
        </div>
        <div>
          <ul class="messages" v-chat-scroll>
            <li class="message" v-for="(msg, index) in messages" :key="index">
              <div class="msgWrapper">
                <div class="msg">{{msg.message}}</div>
                <div class="username">{{msg.user}}</div>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <div class="msgContainer">      
      <b-container class="msgContainer">                    
        <b-form @submit.prevent="sendMessage">          
          <b-row>
            <b-col>
              <b-form-input type="text" placeholder="Message..." v-model="message" class="ipMsg" ></b-form-input>
            </b-col>
            <b-col>
              <b-button type="submit" class="btnSend">Send</b-button>
            </b-col>        
          </b-row>
        </b-form> 
      </b-container>           

      <b-button @click="showVoteModal">투표하기</b-button>
      <b-button @click="showTotalResult">투표결과</b-button>
    </div>    

    <b-modal ref="modalVote" @ok="handleChooseOption()">
      <b-form-group label="Select option">
        <b-form-radio-group v-model="selectedOption"
                          :options="options"
                          stacked
                          name="radiosStacked">
        </b-form-radio-group>
      </b-form-group>
    </b-modal>

    <b-modal ref="modalTotal">
      <div v-for="(option, index) in results" :key="index">
        {{option.title}} <b-badge variant="light">{{option.count}}</b-badge>
      </div>
    </b-modal>
  </div>
</template>
<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      user: 'will',
      message: '',
      messages: [        
        {user: 'admin', 'message': 'This is Chat room'}
      ],
      socket: io('localhost:3000'),
      account: '',
      contractInstance: null,
      selectedOption: null,
      options: [],
      results: []
    }
  },

  async mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    });        

    this.contractInstance = this.$web3.eth.contract(this.$config.VOTE_ABI).at(this.$config.VOTE_CA)
    this.account = await this.$getDefaultAccount()          
  },

  methods: {
    sendMessage(e) {
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      });
      this.message = '';
    },

    showVoteModal() {
      this.getOptions()
      
      this.$refs.modalVote.show()
    },

    showTotalResult() {
      this.getTotalVotes()

      this.$refs.modalTotal.show()
    },

    getOptions() {
      this.options = []
      this.contractInstance.getOptionList({}, (err, result) => {        
        for(let key in result){
          this.options.push(this.$web3.toAscii(result[key]))
        }        
      })
    },

    getTotalVotes() {
      this.results = []
      this.contractInstance.getOptionList({}, (err, result) => {        
        for(let key in result){
          const option = this.$web3.toAscii(result[key])
          this.contractInstance.totalVotesFor(option, {}, (err, result) => {            
            this.results.push({'title': option, 'count': result.toNumber()})
          })
        }
      })
    },

    handleChooseOption() {    
      if(!this.selectedOption){
        alert("please select a option")
        return
      }
      this.contractInstance.voting(this.selectedOption, {from: this.account, gas: this.$config.GAS_AMOUNT}, (error, transactionHash) => {     
            console.log("txhash",transactionHash)            
        })
      this.watchVoted((error, result) => {
        if(!error) alert("Vote completed...!")
      })
    },

    async watchVoted(cb) {
      const currentBlock = await this.getCurrentBlock()
      const eventWatcher = this.contractInstance.VoteCompleted({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
      eventWatcher.watch(cb)
    },

    getCurrentBlock() {
      return new Promise((resolve, reject ) => {
        this.$web3.eth.getBlockNumber((err, blocknumber) => {
            if(!err) resolve(blocknumber)
            reject(err)
        })
      })
    }
  }
}
</script>
<style scoped>
.card {
  height: 600px;
}

.header {  
  background: #235a06;    
  color: #fff;
  padding-top: 10px;
}

.messages {
  height: 400px;  
  border: 3px solid #235a06;
  padding: 10px 20px 5px 10px;
  overflow-y: auto;  
}

.message .msgWrapper{
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;    
  list-style: none;  
  margin: 10px 0 10px 0;
  width: 360px;
  max-width: 460px;
  text-align: left;
}

.message .username {
  font-weight: 800;
}

.msgContainer {
  margin: 10px;
  margin-bottom: 10px;
}

.ipMsg {
  width: 450px;
  height: 40px;
  font-size: 16px;
}
</style>
