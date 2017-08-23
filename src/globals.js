// Below is an example of exposing a library globally so that it can be used in
// the content of a Kinetic Core form. The library itself will determine
// somewhat how this happens, for example some like the one shown below return
// something that you have to manually add to 'window'. Some libraries might add
// themselves to the window when loaded or some might decorate something else,
// like a jQuery plugin.
// Note that the example below shows jquery but jquery is not currently
// configured as a dependency so for this code to work jquery needs to be added
// as a dependency and installed.

// import jquery from 'jquery';
// window.$ = jquery;
// window.jQuery = jquery;
