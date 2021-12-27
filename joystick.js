

var term = require( 'terminal-kit' ).terminal ;

term.cyan( 'Choose your major arcana tarot card\n' ) ;
term.cyan( 'These are doorways.\n' ) ;

var items = [
	'0. The Fool' ,
	'1. The Magician' ,
	'2. The High Priestess' ,
	'3. The Empress'
] ;

term.singleColumnMenu( items , function( error , response ) {
	term( '\n' ).eraseLineAfter.green(
		"#%s selected: %s (%s,%s)\n" ,
		response.selectedIndex ,
		response.selectedText ,
		response.x ,
		response.y
	) ;
	process.exit() ;
} ) ;