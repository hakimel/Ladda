/*!
 * Ladda 0.4.0
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 */
(function( root, factory ) {

	// CommonJS
	if( typeof exports === 'object' )  {
		module.exports = factory();
	}
	// AMD module
	else if( typeof define === 'function' && define.amd ) {
		define( [ './spin' ], factory );
	}
	// Browser global
	else {
		root.Ladda = factory( root.Spinner );
	}

}
(this, function( Spinner ) {
	'use strict';

	// All currently instantiated instances of Ladda
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

		// Create the spinner
		var spinner = createSpinner( button.getAttribute( 'data-size' ) );

		// Wrapper element for the spinner
		var spinnerWrapper = document.createElement( 'span' );
		spinnerWrapper.className = 'ladda-spinner';
		button.appendChild( spinnerWrapper );

		// Timeout used to delay stopping of the spin animation
		var spinnerTimeout;

		var instance = {

			start: function() {

				button.setAttribute( 'disabled', '' );
				button.setAttribute( 'data-loading', '' );

				clearTimeout( spinnerTimeout );
				spinner.spin( spinnerWrapper );

				this.setProgress( 0 );

				return this; // chain

			},

			stop: function() {

				button.removeAttribute( 'disabled' );
				button.removeAttribute( 'data-loading' );

				// Kill the animation after a delay to make sure it
				// runs for the duration of the button transition
				clearTimeout( spinnerTimeout );
				spinnerTimeout = setTimeout( function() { spinner.stop(); }, 1000 );

				return this; // chain

			},

			toggle: function() {

				if( this.isLoading() ) {
					this.stop();
				}
				else {
					this.start();
				}

				return this; // chain

			},

			setProgress: function( progress ) {

				var progressElement = button.querySelector( '.ladda-progress' );

				// Remove the progress bar if we're at 0 progress
				if( progress === 0 && progressElement && progressElement.parentNode ) {
					progressElement.parentNode.removeChild( progressElement );
				}
				else {
					if( !progressElement ) {
						progressElement = document.createElement( 'div' );
						progressElement.className = 'ladda-progress';
						button.appendChild( progressElement );
					}

					progressElement.style.width = ( ( progress || 0 ) * button.offsetWidth ) + 'px';
				}

			},

			enable: function() {

				this.stop();

				return this; // chain

			},

			disable: function () {

				this.stop();
				button.setAttribute( 'disabled', '' );

				return this; // chain

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
					var instance = create( element );
					var timeout = -1;

					element.addEventListener( 'click', function() {

						instance.start();

						// Set a loading timeout if one is specified
						if( typeof options.timeout === 'number' ) {
							clearTimeout( timeout );
							timeout = setTimeout( instance.stop, options.timeout );
						}

						// Invoke callbacks
						if( typeof options.callback === 'function' ) {
							options.callback.apply( null, [ instance ] );
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

	function createSpinner( size ) {

		var lines = 12,
			radius = 8,
			length = 5,
			width = 3;

		switch( size ) {
			case 'xs':
				radius = 6;
				length = 4;
				width = 2;
				break;
			case 's':
				radius = 6;
				length = 4;
				width = 2;
				break;
			case 'xl':
				radius = 8;
				length = 6;
				break;
		}

		return new Spinner( {
			color: '#fff',
			lines: lines,
			radius: radius,
			length: length,
			width: width,
			zIndex: 'initial',
			top: 'auto',
			left: 'auto',
			className: ''
		} );

	}

	// Public API
	return {

		bind: bind,
		create: create,
		stopAll: stopAll

	};

}));
