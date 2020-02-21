# Ladda

Buttons with built-in loading indicators, effectively bridging the gap between action and feedback.

[Check out the demo page](https://lab.hakim.se/ladda/).

## Installation

`npm install ladda`

### Module bundling

Ladda 2.x is distributed as a standard ES6 module. Since not all browsers/environments support native
ES6 modules, it is recommended to use a bundler such as <a href="https://rollupjs.org/">Rollup</a>,
<a href="https://parceljs.org/">Parcel</a>, or <a href="https://webpack.js.org/">Webpack</a> to create
a production-ready code bundle.

## Usage

### CSS

You will need to include ONE of the two style sheets in the **/dist** directory.
If you want the button styles used on the demo page, use the **ladda.min.css** file.
If you want to have the functional buttons without the visual style (colors, padding, etc.),
use the **ladda-themeless.min.css** file.

### HTML

Below is an example of a button using the `expand-right` animation style.

```html
<button class="ladda-button" data-style="expand-right">Submit</button>
```

When the JS code runs to bind Ladda to the button, the `ladda-button` class
will be automatically added if it doesn't already exist. Additionally, a span
with class `ladda-label` will automatically wrap the button text, resulting
in the following DOM structure:

```html
<button class="ladda-button" data-style="expand-right">
    <span class="ladda-label">Submit</span>
</button>
```

Buttons accept the following attributes:
- **data-style**: one of the button styles *[required]*
  - expand-left, expand-right, expand-up, expand-down
  - contract, contract-overlay
  - zoom-in, zoom-out
  - slide-left, slide-right, slide-up, slide-down
- **data-color**: green/red/blue/purple/mint
- **data-size**: xs/s/l/xl, defaults to medium
- **data-spinner-size**: pixel dimensions of spinner, defaults to dynamic size based on the button height
- **data-spinner-color**: a hex code or any named CSS color, defaults to `#fff`
- **data-spinner-lines**: the number of lines for the spinner, defaults to `12`

### JavaScript

Start by importing the Ladda module:

```javascript
import * as Ladda from 'ladda';
```

The following approach is recommended for JavaScript control over your buttons:

```javascript
// Create a new instance of ladda for the specified button
var l = Ladda.create(document.querySelector('.my-button'));

// Start loading
l.start();

// Will display a progress bar for 50% of the button width
l.setProgress(0.5);

// Stop loading
l.stop();

// Toggle between loading/not loading states
l.toggle();

// Check the current state
l.isLoading();

// Delete the button's ladda instance
l.remove();
```

To show the loading animation for a form that is submitted to the server
(always resulting in a page reload) the `bind()` method can be used:

```javascript
// Automatically trigger the loading animation on click
Ladda.bind('button[type=submit]');

// Same as the above but automatically stops after two seconds
Ladda.bind('button[type=submit]', {timeout: 2000});
```

Note: when using the `bind()` method on buttons that are inside a form,
loading indicators will not be shown until the form is valid.

All loading animations on the page can be stopped by using:

```javascript
Ladda.stopAll();
```

## Browser support

Ladda has been tested in Firefox, Microsoft Edge, Chrome, and Internet Explorer 11.
It also Should Work™ in Safari and Internet Explorer 10.

## Changelog

<https://github.com/hakimel/Ladda/blob/master/CHANGELOG.md>

## License

MIT
