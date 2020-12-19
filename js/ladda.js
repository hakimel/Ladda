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
 * Creates a new instance of Ladda which wraps the
 * target button element.
 *
 * @return An API object that can be used to control
 * the loading animation state.
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

    // The text contents must be wrapped in a ladda-label
    // element, create one if it doesn't already exist
    var laddaLabel = button.querySelector('.ladda-label');
    if (!laddaLabel) {
        laddaLabel = document.createElement('span');
        laddaLabel.className = 'ladda-label';
        wrapContent(button, laddaLabel);
    }

    // The spinner component
    var spinnerWrapper = button.querySelector('.ladda-spinner');

    // Wrapper element for the spinner
    if (!spinnerWrapper) {
        spinnerWrapper = document.createElement('span');
        spinnerWrapper.className = 'ladda-spinner';
    }

    button.appendChild(spinnerWrapper);

    // Timer used to delay starting/stopping
    var timer;
    var spinner;

    var instance = {
        /**
         * Enter the loading state.
         */
        start: function() {
            // Create the spinner if it doesn't already exist
            if (!spinner) {
                spinner = createSpinner(button);
            }

            button.disabled = true;
            button.setAttribute('data-loading', '');

            clearTimeout(timer);
            spinner.spin(spinnerWrapper);

            this.setProgress(0);

            return this; // chain
        },

        /**
         * Enter the loading state, after a delay.
         */
        startAfter: function(delay) {
            clearTimeout(timer);
            timer = setTimeout(function() { instance.start(); }, delay);

            return this; // chain
        },

        /**
         * Exit the loading state.
         */
        stop: function() {
            if (instance.isLoading()) {
                button.disabled = false;
                button.removeAttribute('data-loading');   
            }

            // Kill the animation after a delay to make sure it
            // runs for the duration of the button transition
            clearTimeout(timer);

            if (spinner) {
                timer = setTimeout(function() { spinner.stop(); }, 1000);
            }

            return this; // chain
        },

        /**
         * Toggle the loading state on/off.
         */
        toggle: function() {
            return this.isLoading() ? this.stop() : this.start();
        },

        /**
         * Sets the width of the visual progress bar inside of
         * this Ladda button
         *
         * @param {number} progress in the range of 0-1
         */
        setProgress: function(progress) {
            // Cap it
            progress = Math.max(Math.min(progress, 1), 0);

            var progressElement = button.querySelector('.ladda-progress');

            // Remove the progress bar if we're at 0 progress
            if (progress === 0 && progressElement && progressElement.parentNode) {
                progressElement.parentNode.removeChild(progressElement);
            } else {
                if (!progressElement) {
                    progressElement = document.createElement('div');
                    progressElement.className = 'ladda-progress';
                    button.appendChild(progressElement);
                }

                progressElement.style.width = ((progress || 0) * button.offsetWidth) + 'px';
            }
        },

        isLoading: function() {
            return button.hasAttribute('data-loading');
        },

        remove: function() {
            clearTimeout(timer);
            button.disabled = false;
            button.removeAttribute('data-loading');

            if (spinner) {
                spinner.stop();
                spinner = null;
            }

            ALL_INSTANCES.splice(ALL_INSTANCES.indexOf(instance), 1);
        },

        /**
         * This method will stop the progress and then change the color of the button to green and show the check mark.
         * @param {boolean} permanentResult 
         * Default value is TRUE.
         * If set to true the button will stay disabled and the color stays green after the progress stops
         * also you can detemine a time in milliseconds to turn the button to the default state.
         * @param {number} timeout 
         * Default value is 1000 milliseconds = 1 second.
         * The time in milliseconds that will return the button to its default state.
         */
        loadingSuccessful: function(permanentResult = true, timeout = 1000){
            instance.stop();
            button.disabled = true;

            var resElement = button.querySelector('.ladda-successful');
            if(!resElement){
                resElement = document.createElement('div');
                resElement.className = 'ladda-successful';
                button.appendChild(resElement);
            }

            var labelEle = document.createElement('span');
            labelEle.className = 'ladda-label';
            labelEle.textContent = '✔';
            button.appendChild(labelEle);

            laddaLabel.style.display = 'none';
            button.setAttribute('data-success', '');

            if(!permanentResult){
                setTimeout(() => {
                    button.removeAttribute('data-success');
                    button.disabled = false;
                    laddaLabel.style.display = 'block';
                    button.removeChild(labelEle);
                }, timeout);
            }

            return this;    //chain
        },
        
        /**
         * @param {boolean} permanentResult
         * Default value is TRUE.
         * If set to true the button will stay disabled and the color stays green after the progress stops
         * also you can detemine a time in milliseconds to turn the button to the default state.
         * @param {number} timeout
         * Default value is 1000 milliseconds = 1 second.
         * The time in milliseconds that will return the button to its default state.
         */
        loadingFailed: function(permanentResult = true, timeout = 1000){
            instance.stop();
            button.disabled = true;
            
            var resElement = button.querySelector('.ladda-failed');
            if(!resElement){
                resElement = document.createElement('div');
                resElement.className = 'ladda-failed';
                button.appendChild(resElement);
            }
            
            button.setAttribute('data-failed', '');
            
            var labelEle = document.createElement('span');
            labelEle.className = 'ladda-label';
            button.appendChild(labelEle);
            labelEle.innerHTML = '✘';

            laddaLabel.style.display = 'none';

            if(!permanentResult){
                setTimeout(() => {
                    button.removeAttribute('data-failed');
                    button.disabled = false;
                    laddaLabel.style.display = 'block';
                    button.removeChild(labelEle);
                }, timeout);
            }
            return this;    //chain
        }
    };

    ALL_INSTANCES.push(instance);

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
* Get the first ancestor node from an element, having a
* certain type.
*
* @param elem An HTML element
* @param type an HTML tag type (uppercased)
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
                timeout = setTimeout(instance.stop, options.timeout);
            }

            // Invoke callbacks
            if (typeof options.callback === 'function') {
                options.callback.apply(null, [instance]);
            }
        }

    }, false);
}
