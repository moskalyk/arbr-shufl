const term = require( 'terminal-kit' ).terminal ;
const Shufl = require('./index.js')
const shufl = new Shufl()

term.cyan( 'Choose your major arcana tarot card\n' ) ;
term.cyan( 'Let the portals take you..\n' ) ;

var items = [
	'0. The Fool' ,
	'1. The Magician' ,
	'2. The High Priestess' ,
	'3. The Empress',
	'4. The Emperor',
	'5. The Heirophant',
	'6. The Lovers',
	'21. The World' ,
] ;

var tarotChannels

term.singleColumnMenu( items , async function( error , response ) {
	try{
		const nfts = await shufl.indexedArch(response.selectedIndex)

		nfts.map((nft) => {
			term( '\n' ).red(nft)
		})

		term( '\n' ).eraseLineAfter.green(
			"#%s selected: %s (%s,%s)\n" ,
			response.selectedIndex ,
			response.selectedText 
		) ;
		process.exit() ;
	}catch(e){
		console.log(e)
		process.exit() ;
	}
} ) ;