<template>
  <v-container grid-list-md text-xs-center>
  	<v-layout row wrap>
      <v-flex v-for="(auction, index) in auctions" :key="index" xs4>
      	<v-card>
          <v-img :src="auction.image" height="200px"></v-img>
          
      		<div>Title: {{auction.title}}</div>
          <div>Price: {{auction.price}} Ether</div>
          <div>TokenId: {{auction.tokenId}}</div>
          <div>Owner: {{auction.owner}}</div>
          <div>Active: {{auction.active}}</div>
          <div>Finalized: {{auction.finalized}}</div>        
      	</v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {     
      ciMyNFT: null,
      ciAuctions: null, 
      auctions: []
    }
  },

  mounted() {    
    this.ciAuctions = this.$web3.eth.contract(this.$config.AUCTIONS_ABI).at(this.$config.AUCTIONS_CA)
    this.ciMyNFT = this.$web3.eth.contract(this.$config.MYNFT_ABI).at(this.$config.MYNFT_CA)
    this.getAuctions()
  },

  methods: {
	  
    getAuctions() {
      this.ciAuctions.getCount({}, (error, result) => {        
        const count = result

        for(let i=0; i<count; i++) {

          this.ciAuctions.getAuctionById(i, {}, (err, result) => {

            this.ciMyNFT.ownerOf(result[3], {}, (error, owner) => {

              this.auctions.push({
                title: result[0],
                price: this.$web3.fromWei(result[1], 'ether'),
                image: 'https://gateway.ipfs.io/ipfs/'+result[2],
                tokenId: result[3],
                owner: owner,
                active: result[6],
                finalized: result[7]
              })
            })            
            
          })
        }
      })
    }	
  }
}
</script>