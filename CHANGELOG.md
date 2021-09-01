# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.2] - 2021-09-01
### Changed
- Set package type to `module` to better support native ES module imports.
- Code cleanup and documentation improvements.

## [2.0.1] - 2018-05-14
### Added
- Support for reassigning `$spinnerSize` Sass variable (PR [#81])
- Re-included Sass files in the npm package

## [2.0.0] - 2018-05-13
### Added
- Built-in TypeScript definitions
- Support for the `style-src 'self';` Content Security Policy

### Changed
- Rewritten as a native ES6 module using spin.js v4

### Removed
- Deprecated jQuery API
- Deprecated `enable` and `disable` methods
- Bower support
- Support for Internet Explorer 9 (not supported by spin.js v4)

## [1.0.6] - 2018-02-04
### Added
- Support for forms with `novalidate` attribute (issue [#80])

### Fixed
- Protruding outline in Chrome on buttons with a progress bar

## [1.0.5] - 2017-09-24
### Added
- Validation for URL input fields in IE 9

### Fixed
- Detection of required HTML5 inputs in IE 9
- Bug where the `stop()` method would remove a button's disabled state even though Ladda was already stopped (issue [#68])

## [1.0.4] - 2017-08-27
### Fixed
- Incorrect return value for jQuery `isLoading` argument (PR [#62], issue [#65])

Note that the Ladda jQuery API is deprecated - it is recommended to use the plain JavaScript API instead.

## [1.0.3] - 2017-08-27
### Changed
- Code cleanup and performance improvements

### Deprecated
- Undocumented `enable` and `disable` instance methods

## [1.0.2] - 2017-08-27
### Added
- Support for right-to-left text direction (PR [#66])

### Deprecated
- jQuery API

## [1.0.1] - 2017-07-11
### Fixed
- Bug where focus outline protruded outside button in Chrome

### Removed
- Unnecessary `toArray()` function

## [1.0.0] - 2016-03-08
### Added
- `data-spinner-lines` attribute for controlling the number of lines in the spinner (PR [#50])

### Changed
- The `ladda-button` class and `data-style` attribute are now automatically set if missing (PR [#52])
- `ladda-label` now wraps existing elements instead of reinserting them using `innerHTML` (PR [#55])
- `checkValidity` is now used to validate forms where supported (PR [#58])

## [0.9.8] - 2015-04-05
### Added
- `main` field to package.json for easier CommonJS loading (PR [#47])
- Validity check for email inputs (PR [#48])

### Changed
- Updated spin.js to v2.0.2 (PR [#49])

## [0.9.7] - 2015-01-17
### Fixed
- The Ladda theme is now baked into the output ladda.min.css file again. Was broken after upgrading grunt Sass in v0.9.5.

## [0.9.6] - 2015-01-16
### Removed
- Unintended references to non-existing sourcemap files that were introduced in v0.9.5 as part of the grunt Sass upgrade.

## [0.9.5] - 2015-01-16
### Fixed
- Validation of required select, radio, and checkbox inputs (PR [#43])
- The `ladda-spinner` element is no longer created if it already exists (PR [#44])

## [0.9.4] - 2014-06-21
### Added
- `remove()` method to Ladda instances to stop memory leaks (PR [#36])

### Changed
- Updated from spin.js v1.3 to v2.0 (PR [#37])

## [0.9.3] - 2014-04-16
### Added
- jQuery wrapper (PR [#33])

### Fixed
- Overlay effect in Safari
- Missing CommonJS requirement

## [0.9.2] - 2013-12-03
### Fixed
- Spinner height is now calculated when spinning starts as opposed to when Ladda is initialized. This fixes spinner sizing issues with buttons that are initially hidden.

## [0.9.1] - 2013-11-27
### Fixed
- Issue where loading animations did not start for buttons outside of forms. This only affected use through the `Ladda.bind()` method.

## [0.9.0] - 2013-10-23
### Changed
- Ladda now confirms that all `required` fields in its parent form are filled out before starting the spinning animation. Note that this only applies to buttons bound using `Ladda.bind()`.

### Removed
- jQuery dependencies

## [0.8.0] - 2013-09-05
### Added
- `data-spinner-color` attribute for configuring spinner color

### Changed
- Disabled pointer events on spinner element

### Fixed
- Array conversion bug which prevented binding Ladda to a selector
- Default `z-index` value, was `initial` but should be `auto`

## [0.7.0] - 2013-07-19
### Added
- `startAfter(delay)` method

### Changed
- Limit progress value to number between `0` and `1`

### Fixed
- Issue that prevented forms from submitting
- Error that caused IE 8 to blow up on page load (still not supported, though)

## [0.6.0] - 2013-07-07
### Added
- `data-spinner-size` attribute for setting explicit pixel size of spinner

### Changed
- `ladda-label` wrapper is now automatically created if it doesn't exist

## [0.5.2] - 2013-06-27
### Added
- bower.json

### Fixed
- Error when passing element to `Ladda.create()`

## [0.5.1] - 2013-06-19
### Added
- Bootstrap integration example

## [0.5.0] - 2013-06-19
### Changed
- Split visual and functional styles into separate stylesheets for framework compatibility (issue [#20])
- Spinner size is now automatically calculated using JavaScript

## [0.4.2] - 2013-06-14
### Added
- Size options (issue [#15])
- Mint color preset

### Changed
- All settings are now applied via `data-*` attributes

## [0.4.1] - 2013-06-14
### Added
- `enable` and `disable` helper methods

## [0.4.0] - 2013-06-14
### Added
- Common.js / AMD module support
- Grunt build file and minified files in /dist folder

### Changed
- Migrated from plain CSS to Sass

## [0.3.0] - 2013-06-08
### Added
- Built-in progress bars which can be controlled using `setProgress` method

### Changed
- Replaced spinner GIF with spin.js
- `spinner` and `label` classes are now prefixed with `ladda-`

### Removed
- Hardcoded timeout

## [0.2.0] - 2013-06-05
### Added
- Simple JavaScript API
- Instructions in readme
- MIT license

## [0.1.0] - 2013-06-05
- Initial release

[Unreleased]: https://github.com/hakimel/Ladda/compare/2.0.2...HEAD
[2.0.2]: https://github.com/hakimel/Ladda/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/hakimel/Ladda/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/hakimel/Ladda/compare/1.0.6...2.0.0
[1.0.6]: https://github.com/hakimel/Ladda/compare/1.0.5...1.0.6
[1.0.5]: https://github.com/hakimel/Ladda/compare/1.0.4...1.0.5
[1.0.4]: https://github.com/hakimel/Ladda/compare/1.0.3...1.0.4
[1.0.3]: https://github.com/hakimel/Ladda/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/hakimel/Ladda/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/hakimel/Ladda/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/hakimel/Ladda/compare/0.9.8...1.0.0
[0.9.8]: https://github.com/hakimel/Ladda/compare/0.9.7...0.9.8
[0.9.7]: https://github.com/hakimel/Ladda/compare/0.9.6...0.9.7
[0.9.6]: https://github.com/hakimel/Ladda/compare/0.9.5...0.9.6
[0.9.5]: https://github.com/hakimel/Ladda/compare/0.9.4...0.9.5
[0.9.4]: https://github.com/hakimel/Ladda/compare/0.9.3...0.9.4
[0.9.3]: https://github.com/hakimel/Ladda/compare/0.9.2...0.9.3
[0.9.2]: https://github.com/hakimel/Ladda/compare/0.9.1...0.9.2
[0.9.1]: https://github.com/hakimel/Ladda/compare/0.9.0...0.9.1
[0.9.0]: https://github.com/hakimel/Ladda/compare/0.8.0...0.9.0
[0.8.0]: https://github.com/hakimel/Ladda/compare/0.7.0...0.8.0
[0.7.0]: https://github.com/hakimel/Ladda/compare/0.6.0...0.7.0
[0.6.0]: https://github.com/hakimel/Ladda/compare/0.5.2...0.6.0
[0.5.2]: https://github.com/hakimel/Ladda/compare/0.5.1...0.5.2
[0.5.1]: https://github.com/hakimel/Ladda/compare/0.5.0...0.5.1
[0.5.0]: https://github.com/hakimel/Ladda/compare/0.4.2...0.5.0
[0.4.2]: https://github.com/hakimel/Ladda/compare/0.4.1...0.4.2
[0.4.1]: https://github.com/hakimel/Ladda/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/hakimel/Ladda/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/hakimel/Ladda/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/hakimel/Ladda/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/hakimel/Ladda/tree/0.1.0

[#81]: https://github.com/hakimel/Ladda/pull/81
[#80]: https://github.com/hakimel/Ladda/issues/80
[#68]: https://github.com/hakimel/Ladda/issues/68
[#66]: https://github.com/hakimel/Ladda/pull/66
[#65]: https://github.com/hakimel/Ladda/issues/65
[#62]: https://github.com/hakimel/Ladda/pull/62
[#58]: https://github.com/hakimel/Ladda/pull/58
[#55]: https://github.com/hakimel/Ladda/pull/55
[#52]: https://github.com/hakimel/Ladda/pull/52
[#50]: https://github.com/hakimel/Ladda/pull/50
[#49]: https://github.com/hakimel/Ladda/pull/49
[#48]: https://github.com/hakimel/Ladda/pull/48
[#47]: https://github.com/hakimel/Ladda/pull/47
[#44]: https://github.com/hakimel/Ladda/pull/44
[#43]: https://github.com/hakimel/Ladda/pull/43
[#37]: https://github.com/hakimel/Ladda/pull/37
[#36]: https://github.com/hakimel/Ladda/pull/36
[#33]: https://github.com/hakimel/Ladda/pull/33
[#20]: https://github.com/hakimel/Ladda/issues/20
[#15]: https://github.com/hakimel/Ladda/issues/15
