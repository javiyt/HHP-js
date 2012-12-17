define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        videoView = require( 'modules/views/videos' ),
        videosRouter = Backbone.Router.extend({
        'routes': {
            'agregar': 'agregarVideo'
        },
        'view': null,
        initialize: function()
        {
            this.view = new videoView();

            this.view.on( 'modal:hide', this.goToHome, this );
        },
        goToHome: function()
        {
            this.navigate( '', {trigger: true} );
        },
        agregarVideo: function()
        {
            this.view.showForm();
        }
    });

    exports.start = function()
    {
        new videosRouter();
    };
});