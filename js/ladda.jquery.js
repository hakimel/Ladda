/*!
 * Ladda for jQuery
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2014 Hakim El Hattab, http://hakim.se
 */

(function( Ladda, $ ) {
	if ($ === undefined)
		return console.error( 'jQuery required for Ladda.jQuery' );

	var arr = [];

	$ = $.extend( $, {
		ladda: function( arg ) {
			if( arg === 'stopAll' )
				Ladda.stopAll();
		}
	});

	$.fn = $.extend( $.fn, {
		ladda: function( arg ) {
			var args = arr.slice.call( arguments, 1 );

			if( arg === 'bind' ) {
				args.unshift( $( this ).selector );
				Ladda.bind.apply( Ladda, args );
			}
			else {
				$( this ).each( function() {
					var $this = $( this ), ladda;

					if( arg === undefined )
						$this.data( 'ladda', Ladda.create( this ) );
					else {
						ladda = $this.data( 'ladda' );
						ladda[arg].apply( ladda, args );
					}
				});
			}

			return this;
		}
	});	
}( this.Ladda, this.jQuery ));