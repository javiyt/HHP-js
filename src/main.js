requirejs.config({
    baseUrl: '/js',
    paths: {
        'jquery': '/js/libs/jquery-1.8.3.min',
        'bootstrap': '/js/libs/bootstrap.min',
        'backbone-orig': '/js/libs/backbone',
        'backbone-lib': '/js/libs/backbone.debug',
        'backbone': '/js/libs/backbone.hhp',
        'underscore': '/js/libs/underscore',
        'text': '/js/libs/text.requirejs',
        'nicedit': '/js/libs/nicEdit',
        'player': '/js/jquery/jquery.jplayer.min',
        'playlist': '/js/jquery/jplayer.playlist.min',
        'jquery.ui.widget': '/js/jquery/jquery.ui.widget',
        'jquery.iframe': '/js/jquery/jquery.iframe-transport',
        'fileupload': '/js/jquery/jquery.fileupload'
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
        'backbone-orig': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'backbone-lib': {
            'deps': ['backbone-orig'],
            'exports': 'Backbone'
        },
        'backbone': {
            'deps': ['backbone-orig'],
            'exports': 'Backbone'
        },
        'nicedit': {
            'exports': 'nicEditor'
        },
        'jquery.ui.widget': {
            'deps': ['jquery']
        },
        'jquery.iframe': {
            'deps': ['jquery', 'jquery.ui.widget']
        },
        'fileupload': {
            'deps': ['jquery', 'jquery.ui.widget', 'jquery.iframe']
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