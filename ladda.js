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

			start: function( status ) {

				button.setAttribute( 'data-loading', '' );

				return this; // chain

			},

			stop: function( status ) {

				button.removeAttribute( 'data-loading' );

				return this; // chain

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