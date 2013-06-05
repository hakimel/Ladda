# Ladda

A set of buttons which merge loading indicators into themselves to bridge the gap between action and feedback.

[Check out the demo page](http://lab.hakim.se/ladda/).


## Instructions

```javascript
// Create a new instance of ladda for the specified button
var l = Ladda.create( button );

// Start loading
l.start();

// Stop loading
l.stop();

// Toggle between loading/not loading states
l.toggle();

// Check the current state
l.isLoading();
```


## History

#### 0.2.0
- JS API

#### 0.1.0
- Initial release

## License

MIT licensed

Copyright (C) 2013 Hakim El Hattab, http://hakim.se