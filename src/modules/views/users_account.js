define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        UsersAccountMaquetasView = require( 'modules/views/user_account/maquetas' ),
        UsersAccountVideosView = require( 'modules/views/user_account/videos' ),
        VideosView = require( 'modules/views/videos' ),
        UsersAccountView = Backbone.View.extend({
            'views': {},
            initialize: function()
            {
                this.views.maquetas = new UsersAccountMaquetasView();
                this.views.videos = new UsersAccountVideosView();
                this.views.videoVisor = new VideosView();
            },
            viewVideo: function( video_id )
            {
                this.views.videoVisor.showVideo( video_id );
            }
        });

    return UsersAccountView;
});