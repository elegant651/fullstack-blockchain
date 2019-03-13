const MyNFT = require('./contracts/MyNFT')
const Auctions = require('./contracts/Auctions')

export default {
	MYNFT_CA: '0x3cd92247e5331d3b51f6cbeff4e5d3ef420f1989',
	AUCTIONS_CA: '0x5ffc6ca35a7ee8ed33228b47b49c21310e67339c',

	MYNFT_ABI: MyNFT.abi,
	AUCTIONS_ABI: Auctions.abi,

	GAS_AMOUNT: 500000
}
