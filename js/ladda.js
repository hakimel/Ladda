//fgnass.github.com/spin.js#v1.3

/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(['./spin'],factory)

  /* Browser global */
  else root.Ladda = factory()
}
(this, function(Spinner) {
  "use strict";
  var Ladda;
  var ALL_INSTANCES = [];
  function create( button ) {

    if( typeof button === 'undefined' ) {
      throw "Button target must be defined.";
    }

    // Create the spinner
    var spinner = new Spinner( {
      color: '#fff',
      lines: 12,
      radius: 8,
      length: 5,
      width: 3,
      zIndex: 'initial',
      top: 'auto',
      left: 'auto',
      className: ''
    } );

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

        button.removeAttribute( 'disabled', '' );
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

  // Public API
  Ladda = {

    bind: bind,
    create: create,
    stopAll: stopAll

  };
  return Ladda

}));
