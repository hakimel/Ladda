# Ladda

A set of buttons which merge loading indicators into themselves to bridge the gap between action and feedback.

[Check out the demo page](http://lab.hakim.se/ladda/).


## Instructions

Make sure the files in **/dist** (ladda.min.css, ladda.min.js and spin.min.js) are all included on your page.

#### HTML

Ladda buttons must be given the class ```ladda-button``` and the button label needs to have the ```ladda-label``` class. Below is an example of a button which will use the expand-right animation style.

```html
<button class="ladda-button" data-style="expand-right"><span class="ladda-label">Submit</span></button>
```

Buttons accepts three attributes:
- **data-style**: one of the button styles, full list in [demo](http://lab.hakim.se/ladda/) *[required]*
- **data-color**: green/red/blue/purple/mint
- **data-size**: xs/s/l/xl, defaults to medium

#### JavaScript

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

## Module

The spinner and Ladda can be loaded as a module using either Common.js or AMD.

```javascript
// Using Require.js
define(['ladda'], function(Ladda) {
	// Make Buttons Here
});
```
## Browser support

The project is tested in Chrome and Firefox. It Should Work™ in the current stable releases of Chrome, Firefox, Safari as well as IE9 and up.

## History

#### 0.4.2
- Add size options
- Add mint color
- All settings now applied via data-* attributes

#### 0.4.1
- Add disable/enable buttons

#### 0.4.0
- Common.js / AMD module
- Grunt build file
- Now using Sass

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
