define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        videoView = require( 'modules/views/videos' ),
        videosRouter = Backbone.Router.extend({
        'routes': {
            'ver/:video_id': 'viewVideo',
            'marcar/:video_id': 'marcarVideo',
            '*home': 'goToHome'
        },
        'view': null,
        initialize: function()
        {
            this.view = new videoView();

            this.view.on( 'video:closed', this.goToHome, this );
        },
        goToHome: function()
        {
            this.navigate( '' );
        },
        marcarVideo: function( video_id )
        {
            this.view.marcarVideo( video_id );
        },
        viewVideo: function( video_id )
        {
            this.view.showVideo( video_id );
        }
    });

    exports.start = function()
    {
        new videosRouter();
    };
});