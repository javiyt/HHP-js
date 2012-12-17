define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        VideosCollection = require( 'modules/collections/videos' ),
        VideoView = require( 'modules/views/user_account/video' ),
        UsersAccountVideosView = Backbone.View.extend(
        {
            'el': document.getElementById( 'table_videos' ),
            'scrollOffset': 100,
            initialize: function()
            {
                this.collection = new VideosCollection();

                this.collection.on( 'reset', this.renderVideos, this );
                this.collection.on( 'add', this.renderOne, this );
                this.collection.on( 'fetch:start', this.showLoading, this );
                this.collection.on( 'fetch:complete', this.hideLoading, this );

                if ( window.Videos )
                {
                    this.collection.reset( window.Videos );
                }

                this.scrolling();
            },
            renderVideos: function()
            {
                var $body = this.$el.find( 'tbody' ),
                    views =[],
                    view = {};

                this.collection.each( function( model )
                {
                    view = new VideoView( {model: model} );
                    views.push( view.render() );
                } );

                $body.append( views );
            },
            renderOne: function( model )
            {
                var view = new VideosView( {model: model} );
                this.$el.find( 'tbody' ).append( view.render() );
            },
            showLoading: function()
            {
                $( document.getElementById( 'loading_videos' ) ).removeClass( 'hide' );
            },
            hideLoading: function()
            {
                $( document.getElementById( 'loading_videos' ) ).addClass( 'hide' );
            }
        });

    return UsersAccountVideosView;
} );