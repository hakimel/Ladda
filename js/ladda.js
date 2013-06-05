/*!
 * Ladda 0.2.0
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 */
window.Ladda = (function() {

	function create( button ) {

		if( typeof button === 'undefined' ) {
			throw "Button target must be defined.";
		}

		return {

			start: function() {

				button.setAttribute( 'data-loading', '' );

				return this; // chain

			},

			stop: function( status ) {

				button.removeAttribute( 'data-loading' );

				// TODO use status (success/error) to exit in different ways

				return this; // chain

			},

			toggle: function() {

				if( this.isLoading() ) {
					this.stop();
				}
				else {
					this.start();
				}

			},

			isLoading: function() {

				return button.hasAttribute( 'data-loading' );

			}

		};

	}

	// Public API
	return {

		create: create

	}

})();