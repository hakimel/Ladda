/*!
 * Ladda
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2018 Hakim El Hattab, http://hakim.se
 */

import {Spinner} from 'spin.js';

// All currently instantiated instances of Ladda
var ALL_INSTANCES = [];

/**
 * Creates a new instance of Ladda which wraps the target button element.
 * @param {HTMLElement} button
 * @return An API object that can be used to control the loading animation state.
 */
export function create(button) {
    if (typeof button === 'undefined') {
        console.warn("Ladda button target must be defined.");
        return;
    }

    // The button must have the class "ladda-button"
    if (!button.classList.contains('ladda-button')) {
        button.classList.add('ladda-button');
    }

    // Style is required, default to "expand-right"
    if (!button.hasAttribute('data-style')) {
        button.setAttribute('data-style', 'expand-right');
    }

    var instance = new LaddaButton(button);
    ALL_INSTANCES.push(instance);

    return instance;
}

/**
 * Binds the target buttons to automatically enter the loading state when clicked.
 *
 * @param target Either an HTML element or a CSS selector.
 * @param options
 *          - timeout Number of milliseconds to wait before
 *            automatically cancelling the animation.
 *          - callback A function to be called with the Ladda
 *            instance when a target button is clicked.
 */
export function bind(target, options) {
    var targets;

    if (typeof target === 'string') {
        targets = document.querySelectorAll(target);
    } else if (typeof target === 'object') {
        targets = [target];
    } else {
        throw new Error('target must be string or object');
    }

    options = options || {};

    for (var i = 0; i < targets.length; i++) {
        bindElement(targets[i], options);
    }
}

/**
 * Stops ALL current loading animations.
 */
export function stopAll() {
    for (var i = 0, len = ALL_INSTANCES.length; i < len; i++) {
        ALL_INSTANCES[i].stop();
    }
}

/**
* Get the first ancestor node with a given tag name from an element.
*
* @param elem An HTML element
* @param type an HTML tag type (uppercase)
*
* @return An HTML element
*/
function getAncestorOfTagType(elem, type) {
    while (elem.parentNode && elem.tagName !== type) {
        elem = elem.parentNode;
    }

    return (type === elem.tagName) ? elem : undefined;
}

function createSpinner(button) {
    var height = button.offsetHeight,
        spinnerColor,
        spinnerLines;

    if (height === 0) {
        // We may have an element that is not visible so
        // we attempt to get the height in a different way
        height = parseFloat(window.getComputedStyle(button).height);
    }

    // If the button is tall we can afford some padding
    if (height > 32) {
        height *= 0.8;
    }

    // Prefer an explicit height if one is defined
    if (button.hasAttribute('data-spinner-size')) {
        height = parseInt(button.getAttribute('data-spinner-size'), 10);
    }

    // Allow buttons to specify the color of the spinner element
    if (button.hasAttribute('data-spinner-color')) {
        spinnerColor = button.getAttribute('data-spinner-color');
    }

    // Allow buttons to specify the number of lines of the spinner
    if (button.hasAttribute('data-spinner-lines')) {
        spinnerLines = parseInt(button.getAttribute('data-spinner-lines'), 10);
    }

    var radius = height * 0.2,
        length = radius * 0.6,
        width = radius < 7 ? 2 : 3;

    return new Spinner({
        color: spinnerColor || '#fff',
        lines: spinnerLines || 12,
        radius: radius,
        length: length,
        width: width,
        animation: 'ladda-spinner-line-fade',
        zIndex: 'auto',
        top: 'auto',
        left: 'auto',
        className: ''
    });
}

function wrapContent(node, wrapper) {
    var r = document.createRange();
    r.selectNodeContents(node);
    r.surroundContents(wrapper);
    node.appendChild(wrapper);
}

function bindElement(element, options) {
    if (typeof element.addEventListener !== 'function') {
        return;
    }

    var instance = create(element);
    var timeout = -1;

    element.addEventListener('click', function() {
        // If the button belongs to a form, make sure all the
        // fields in that form are filled out
        var valid = true;
        var form = getAncestorOfTagType(element, 'FORM');

        if (typeof form !== 'undefined' && !form.hasAttribute('novalidate')) {
            // Modern form validation
            if (typeof form.checkValidity === 'function') {
                valid = form.checkValidity();
            }
        }

        if (valid) {
            // This is asynchronous to avoid an issue where disabling
            // the button prevents forms from submitting
            instance.startAfter(1);

            // Set a loading timeout if one is specified
            if (typeof options.timeout === 'number') {
                clearTimeout(timeout);
                timeout = setTimeout(function () { instance.stop(); }, options.timeout);
            }

            // Invoke callbacks
            if (typeof options.callback === 'function') {
                options.callback.apply(null, [instance]);
            }
        }

    }, false);
}

/**
 * LaddaButton class constructor
 * @param {HTMLElement} button
 */
function LaddaButton(button) {
    this._button = button;
    // The text contents must be wrapped in a ladda-label
    // element, create one if it doesn't already exist
    this._laddaLabel = this._button.querySelector('.ladda-label');

    if (!this._laddaLabel) {
        this._laddaLabel = document.createElement('span');
        this._laddaLabel.className = 'ladda-label';
        wrapContent(this._button, this._laddaLabel);
    }

    this._statusEl = document.createElement('span');
    this._statusEl.className = 'ladda-label';
    this._spinnerWrapper = this._button.querySelector('.ladda-spinner');

    // Wrapper element for the spinner
    if (!this._spinnerWrapper) {
        this._spinnerWrapper = document.createElement('span');
        this._spinnerWrapper.className = 'ladda-spinner';
    }

    this._button.appendChild(this._spinnerWrapper);

    this._timer = null; // Timer used to delay starting/stopping the spinner
    this._statusTimer = null; // Timer used to delay removing a success/failure status
    this._spinner = null;
    this._removing = false;
}

/**
 * Enter the loading state.
 */
LaddaButton.prototype.start = function () {
    // Create the spinner if it doesn't already exist
    if (!this._spinner) {
        this._spinner = createSpinner(this._button);
    }

    this._clearStatus();
    clearTimeout(this._timer);
    clearTimeout(this._statusTimer);

    this._button.disabled = true;
    this._button.setAttribute('data-loading', '');
    this._spinner.spin(this._spinnerWrapper);

    this.setProgress(0);

    return this; // chain
};

/**
 * Enter the loading state after a delay.
 * @param {number} delay
 */
LaddaButton.prototype.startAfter = function (delay) {
    clearTimeout(this._timer);
    this._timer = setTimeout(function () { this.start(); }.bind(this), delay);

    return this; // chain
};

LaddaButton.prototype._clearStatus = function () {
    if (this._button.hasAttribute('data-success') || this._button.hasAttribute('data-failed')) {
        this._button.disabled = false;
        this._button.removeAttribute('data-success');
        this._button.removeAttribute('data-failed');
        this._button.removeChild(this._statusEl);
        this._laddaLabel.style.display = 'block';
    }
};

/**
 * Exit the loading, success, or failure state.
 */
LaddaButton.prototype.stop = function () {
    if (this.isLoading()) {
        this._button.disabled = false;
        this._button.removeAttribute('data-loading');
    } else {
        this._clearStatus();
    }

    clearTimeout(this._timer);
    clearTimeout(this._statusTimer);

    if (this._spinner) {
        if (this._removing) {
            this._spinner.stop();
            this._spinner = null;
        } else {
            // Kill the animation after a delay to make sure it
            // runs for the duration of the button transition
            this._timer = setTimeout(function () { this._spinner.stop(); }.bind(this), 375);
        }
    }

    return this; // chain
};

/**
 * Toggle the loading state on/off.
 */
LaddaButton.prototype.toggle = function () {
    return this.isLoading() ? this.stop() : this.start();
};

/**
 * Sets the width of the visual progress bar inside of this Ladda button
 *
 * @param {number} progress in the range of 0-1
 */
LaddaButton.prototype.setProgress = function (progress) {
    // Cap it
    progress = Math.max(Math.min(progress, 1), 0);

    var progressElement = this._button.querySelector('.ladda-progress');

    // Remove the progress bar if we're at 0 progress
    if (progress === 0 && progressElement && progressElement.parentNode) {
        progressElement.parentNode.removeChild(progressElement);
    } else {
        if (!progressElement) {
            progressElement = document.createElement('div');
            progressElement.className = 'ladda-progress';
            this._button.appendChild(progressElement);
        }

        progressElement.style.width = ((progress || 0) * this._button.offsetWidth) + 'px';
    }
};

LaddaButton.prototype.isLoading = function () {
    return this._button.hasAttribute('data-loading');
};

LaddaButton.prototype.remove = function () {
    this._removing = true;
    this.stop();
    ALL_INSTANCES.splice(ALL_INSTANCES.indexOf(this), 1);
};

/**
 * Stops any progress and changes the button color to green with a check mark.
 *
 * @param {number} timeout The time in milliseconds before the button returns to its default state.
 * If timeout is 0 the button will remain in a success state until the stop() method is called.
 */
LaddaButton.prototype.succeed = function (timeout) {
    if (timeout === undefined) {
        timeout = 1250;
    }

    this.stop();
    this._button.disabled = true;
    this._button.setAttribute('data-success', '');

    this._statusEl.textContent = '✔';
    this._button.appendChild(this._statusEl);
    this._laddaLabel.style.display = 'none';

    if (timeout !== 0) {
        this._statusTimer = setTimeout(function () { this.stop(); }.bind(this), timeout);
    }

    return this; // chain
};

/**
 * Stops any progress and changes the button color to red with a failure icon.
 *
 * @param {number} timeout The time in milliseconds before the button returns to its default state.
 * If timeout is 0 the button will remain in a failure state until the stop() method is called.
 */
LaddaButton.prototype.fail = function (timeout) {
    if (timeout === undefined) {
        timeout = 1250;
    }

    this.stop();
    this._button.disabled = true;
    this._button.setAttribute('data-failed', '');

    this._statusEl.textContent = '✘';
    this._button.appendChild(this._statusEl);
    this._laddaLabel.style.display = 'none';

    if (timeout !== 0) {
        this._statusTimer = setTimeout(function () { this.stop(); }.bind(this), timeout);
    }

    return this; // chain
};
