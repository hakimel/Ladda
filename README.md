# Ladda

A set of buttons which merge loading indicators into themselves to bridge the gap between action and feedback.

[Check out the demo page](http://lab.hakim.se/ladda/).


## Instructions

Make sure the ladda.css and ladda.js files are included on your page. 

If you will be using the loading animation for a form that is submitted to the server (always resulting in a page reload) you can use the ```bind()``` method:

```javascript
// Automatically trigger the loading animation on click
Ladda.bind( 'input[type=submit]' );

// Same as the above but automatically stops after two seconds
Ladda.bind( 'input[type=submit]', { timeout: 2000 } );
```

If you want JavaScript control over your buttons you can use the following approach:

```javascript
// Create a new instance of ladda for the specified button
var l = Ladda.create( document.querySelector( '.my-button' ) );

// Start loading
l.start();

// Will display a progress bar for 50% of the button width
l.setProgress( 0.5 );

// Stop loading
l.stop();

// Toggle between loading/not loading states
l.toggle();

// Check the current state
l.isLoading();
```

All loading animations on the page can be stopped by using:

```javascript
Ladda.stopAll();
```

## Browser support

The project is tested in Chrome and Firefox. It Should Work™ in the current stable releases of Chrome, Firefox, Safari as well as IE9 and up.

## History

#### 0.3.0
- Replace spinner GIF with spin.js
- ```spinner``` and ```label``` classes are now prefixed with ```ladda-```
- Built-in progress bars

#### 0.2.0
- JS API

#### 0.1.0
- Initial release

## License

MIT licensed

Copyright (C) 2013 Hakim El Hattab, http://hakim.se
