/*!
 * Ladda jQuery 0.6.0
 * http://secondstreet.com/
 * MIT Licensed
 *
 * Ladda is based upon the MIT licensed Ladda. http://lab.hakim.se/ladda
 *
 * Ladda, Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 * Ladda jQuery, Copyright (C) 2013 Second Street Media, http://secondstreet.com
 */

(function( $ ) {

	var createSpinner = function( $el ) {

		var height = $el.height();

		// If the button is tall we can afford some padding
		if( height > 32 ) {
			height *= 0.8;
		}

		// Prefer an explicit height if one is defined
		if( $el.attr( 'data-spinner-size' ) ) {
			height = parseInt( $el.attr( 'data-spinner-size' ), 10 );
		}

		var lines = 12;
		var radius = height * 0.2;
		var length = radius * 0.6;
		var width = radius < 7 ? 2 : 3;

		return new Spinner( {
			color: '#fff',
			lines: lines,
			radius: radius,
			length: length,
			width: width,
			className: ''
		} );

	};

	$.fn.ladda = function( options, progress ) {

		return $( this ).each( function() {
			// Conveniently cached jQuery element
			var $this = $( this );
			// Wrapper element for the spinner
			var $spinnerWrapper;
			// Timeout used to delay stopping of the spin animation

			if( typeof $this.attr( 'data-ladda' ) === 'undefined' ) { // If it hasn't been initialized yet
				// The text contents must be wrapped in a ladda-label
				// element, create one if it doesn't already exist
				if( $this.find( '.ladda-label' ).length < 1 ) {
					$this.wrapInner( '<span class="ladda-label" />' );
				}

				// Create the wrapper element for the spinner
				$spinnerWrapper = $( '<span class="ladda-spinner" />' );
				$this.append( $spinnerWrapper );

				// Mark it as initialized
				$this.attr( 'data-ladda', '' );
			}
			else {
				$spinnerWrapper = $this.find( '.ladda-spinner' );
			}

			// Create the spinner
			var spinner = createSpinner( $this );

			if( typeof options === 'string' ) {
				// Controlling loading explicitely
				switch( options ) {
					case 'start':

						clearTimeout( $this.data( 'spinnerTimeout' ) );
						spinner.spin( $spinnerWrapper.get( 0 ) );

						return $this // chain
							.prop( 'disabled', true )
							.attr( 'data-loading', '' )
							.ladda( 'setProgress', 0 );

					case 'stop':
						
						clearTimeout( $this.data( 'spinnerTimeout' ) );
						$this.find( '.ladda-spinner' ).empty();
						
						return $this // chain
							.prop( 'disabled', false )
							.removeAttr( 'data-loading' );

					case 'toggle':

						if( $this.ladda( 'isLoading' ) ) return $this.ladda( 'stop' ); // chain
						return $this.ladda( 'start' ); // chain

					case 'setProgress':

						var $progressElement = $this.find( '.ladda-progress' );

						// Remove the progress bar if we're at 0 progress
						if( progress === 0 && $progressElement.length > 0 ) {
							$progressElement.remove();
						}
						else {
							if ( $progressElement.length < 1 ) {
								$progressElement = $( '<div class="ladda-progress" />' );
								$this.append( $progressElement );
							}

							$progressElement.width( ( progress || 0 ) * $this.outerWidth() );
						}

						return $this; // chain

					case 'enable':

						return $this // chain
							.ladda( 'stop' );

					case 'disable':

						return $this // chain
							.ladda( 'stop' )
							.prop( 'disabled', true );

					case 'isLoading':
					
						return ( typeof $this.attr( 'data-loading' ) === undefined ); // boolean

					default:

						return $this; // chain
				}
			}
			else {
				// Binds the target buttons to automatically enter the
				// loading state when clicked.

				var timeout = -1;

				$this.click( function() {
					$this.ladda( 'start' );

					// Set a loading timeout if one is specified
					if( typeof options.timeout === 'number' ) {
						clearTimeout( timeout );
						timeout = setTimeout( function() { $this.ladda( 'stop' ); }, options.timeout );
						$this.data( 'spinnerTimeout', timeout );
					}

					// Invoke callbacks
					if( typeof options.callback === 'function' ) {
						options.callback.apply( null, [ $this ] );
					}
				} );
			}

		} );

	};
}( jQuery ));
