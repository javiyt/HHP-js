requirejs.config({
    baseUrl: '/js',
    paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
        'bootstrap': '/js/libs/bootstrap.min',
        'player': '/js/jquery/jquery.jplayer.min',
        'playlist': '/js/jquery/jplayer.playlist.min',
        'backbone': '/js/libs/backbone',
        'underscore': '/js/libs/underscore',
        'text': '/js/libs/text.requirejs'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'bootstrap': {
            'deps': ['jquery']
        },
        'player': {
            'deps': ['jquery'],
            'exports': 'jPlayer'
        },
        'playlist': {
            'deps': ['jquery', 'player'],
            'exports': 'jPlayerPlaylist'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        }
    }
});

// Require main
define( function( require )
{
    var $ = require( 'jquery' ),
        bootstrap = require( 'bootstrap' ),
        Backbone = require( 'backbone' ),
        general = require( './modules/routers/general' );

    $(function()
    {
        general.start();
        Backbone.history.start();
    });
} );