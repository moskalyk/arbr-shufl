const axios = require('axios')

// prolly foolish, stay 
const indexedChannel = {
	0: 'channel', // the fool
	1: 'channel', // the fool
	2: 'channel', // the fool
	3: 'channel', // the fool
	4: 'channel', // the fool
	5: 'channel', // the fool
	6: '1349976', // the fool
	7: 'channel', // the fool
	8: 'channel', // the fool
	9: 'channel', // the fool
	10: 'channel', // the fool
	11: 'channel', // the fool
	12: 'channel', // the fool
	13: 'channel', // the fool
	14: 'channel', // the fool
	15: 'channel', // the fool
	16: 'channel', // the fool
	17: 'channel', // the fool
	18: 'channel', // the fool
	19: 'channel', // the fool
	20: 'channel', // the fool
	21: '1347580' // the world
}

class Shufl {

	constructor(){}

	async nftPortExport(imageList){
		const portedNFTs = []
		const results = await Promise.all(
			imageList.map(
			  	async (image) => {
			  		if(image != undefined){
				  		const ref = await axios.post(
					  		'https://api.nftport.xyz/v0/recommendations/similar_nfts/urls', 
					  		{url: image, page_number: 1, page_size: 50}, 
					  		{
					  			headers: {
					  				Authorization: '90959bcc-3bba-4cd3-9760-a669635f0985',
					  				'Content-Type': 'application/json'
					  			}
					  		}
					  	)

					  	// console.log(ref)

					  	ref.data.nfts.map((nft) => portedNFTs.push(nft))

				  		return ref
			  		}
				}
			)
		)
		return portedNFTs
	}

	async pullChannel(channel) {
		const res = await axios(`https://api.are.na/v2/channels/${channel}`)
		const imageList = res.data.contents.map((block) => {
			if(block.class == 'Image'){
				return block['image']['square'].url
			}
		})
		return imageList
	}

	getShuffledNFTs(nfts){
		console.log('--NFTs--')
		const indexes = []
		// get random array of numbers
		Array.from(Array(22).keys()).map(() => {
			const randIndex = Math.floor(Math.random() * (nfts.length - 1))
			// TODO: remove duplicates, add more images to 22
			indexes.push(randIndex)
		})
		// console.log(indexes)
		// loop on nft list and push to shuffledRecommendations
		const shuffledRecommendations = indexes.map((i) => {
			return nfts[i].cached_file_url
		})

		return shuffledRecommendations
	}

	async indexedArch(tarot){
		// get indexed channel from tarot
		const channel = indexedChannel[tarot]
		
		// get channel contents, check for images
		// pass iamges in a promise.all() to get all paths
		const imageList = await this.pullChannel(channel)
		
		// assemble into list
		const nfts = await this.nftPortExport(imageList)
		
		// select top 22 from a random index
		const shuffledRecommendations = this.getShuffledNFTs(nfts)
		
		// return list
		return shuffledRecommendations
	}
}



module.exports = Shufl