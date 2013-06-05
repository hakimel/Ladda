/*!
 * Ladda 0.2.0
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 */
window.Ladda = (function() {

	var ALL_INSTANCES = [];

	/**
	 * Creates a new instance of Ladda which wraps the 
	 * target button element.
	 *
	 * @return An API object that can be used to control
	 * the loading animation state.
	 */
	function create( button ) {

		if( typeof button === 'undefined' ) {
			throw "Button target must be defined.";
		}

		var instance = {

			start: function() {

				button.setAttribute( 'disabled', '' );
				button.setAttribute( 'data-loading', '' );

				return this; // chain

			},

			stop: function( status ) {

				button.removeAttribute( 'disabled', '' );
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

		ALL_INSTANCES.push( instance );

		return instance;

	}

	/**
	 * Binds the target buttons to automatically enter the 
	 * loading state when clicked.
	 *
	 * @param target Either an HTML element or a CSS selector.
	 * @param options 
	 *          - timeout Number of milliseconds to wait before
	 *            automatically cancelling the animation.
	 */
	function bind( target, options ) {

		options = options || {};

		var targets = [];

		if( typeof target === 'string' ) {
			targets = [].slice.call( document.querySelectorAll( target ) );
		}
		else if( typeof target === 'object' && typeof target.nodeName === 'string' ) {
			targets = [ targets ];
		}

		for( var i = 0, len = targets.length; i < len; i++ ) {

			(function() {
				var element = targets[i];

				// Make sure we're working with a DOM element
				if( typeof element.addEventListener === 'function' ) {
					var instance = Ladda.create( element );
					var timeout = -1;

					element.addEventListener( 'click', function() {
						
						instance.start();

						// Set a loading timeout if one is specified
						if( typeof options.timeout === 'number' ) {
							clearTimeout( timeout );
							timeout = setTimeout( instance.stop, 2000 );
						}

					}, false );
				}
			})();

		}

	}

	/**
	 * Stops ALL current loading animations.
	 */
	function stopAll() {

		for( var i = 0, len = ALL_INSTANCES.length; i < len; i++ ) {
			ALL_INSTANCES[i].stop();
		}

	}

	// Public API
	return {

		bind: bind,
		create: create,
		stopAll: stopAll

	}

})();