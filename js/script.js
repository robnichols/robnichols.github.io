(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* -------------------------
/*          Gif Hover
/* ------------------------- */

var GifLinks = (function() {

  'use strict';
  var body;
  var container;

  function extend( target, source ) {

    for ( var key in source ) {
      if ( !( key in target ) ) {
        target[ key ] = source[ key ];
      }
    }

    return target;
  }

  function applyProperties( target, properties ) {

    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }


  function init( elements, preload ) {

    if ( elements.length ) {

      for( var i = 0; i < elements.length; i++ ) {

        if ( preload === true ) {
          preloadAndTrack( elements[ i ] );
        } else {
          track( elements[ i ] );
        }
      }

    } else {

       if ( preload === true ) {
        preloadAndTrack( elements );
      } else {
        track( elements );
      }
    }
  }

  function preloadAndTrack( element ) {

    var awesomeGif = element.getAttribute( 'data-src' );
    if ( awesomeGif ) {

      var img = new Image();
      img.onload = function() {

        element.className += ' preloaded';
        track( element );
      };

      img.src = awesomeGif;
    }
  }

  function track( element ) {

    element.addEventListener( 'mouseover',  function() { startPartying( this ); }, false );
    element.addEventListener( 'touchstart', function() { startPartying( this ); }, false);

    element.addEventListener( 'mouseout',     function() { stopPartying(); }, false);
    element.addEventListener( 'touchmove',    function( event ) { event.preventDefault(); stopPartying(); }, false);
    element.addEventListener( 'click',        function() { stopPartying(); }, false);
    element.addEventListener( 'dblclick',     function() { stopPartying(); }, false);

    addClasses( element );
  }

  function addClasses( element ) {

    element.className += ' giflink ready';

    if ( element.href ) {
      element.className += ' has-link';
    } else {
      element.className += ' no-link';
    }
  }

  function createContainer() {

    var containerProperties = {
      'backgroundPosition': '50% 50%',
      'backgroundSize': 'cover',
      'pointerEvents': 'none',
      'position': 'fixed',
      'zIndex': '-1',
      'display': 'none',
      'height': '100%',
      'width': '100%',
      'margin': '0px',
      'left': '0px',
      'top': '0px',
    };

    container = document.createElement( 'div' );
    applyProperties( container, containerProperties );
    body.appendChild( container );
  }

  function startPartying( element ) {

    var awesomeGif = element.getAttribute( 'data-src' );
    if( awesomeGif ) {
      container.style.backgroundImage = 'url(' + awesomeGif + ')';
      container.style.display = 'block';
    } else {
      console.log( "Sorry, an element doesn't have a data-src!" );
    }
  }

  function stopPartying() {

    container.style.display = 'none';
    container.style.backgroundImage = '';
  }


  function main( elements, options ) {
    body = document.body;
    createContainer();

    var preload = true;
    if ( options && options.preload ) {
      preload = !!options.preload;
    }

    init( elements, preload );
  }

  return extend( main, {

  });

})();

var elements = document.querySelectorAll( 'article a' );
GifLinks( elements );

/* -------------------------
/*          Gif Hover
/* ------------------------- */


},{}]},{},[1])