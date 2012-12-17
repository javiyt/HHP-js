define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        UsersAccountView = require( 'modules/views/users_account' ),
        UsersRouter = Backbone.Router.extend({
            'routes': {
                'ver/:video_id': 'viewVideo',
                '*default': 'showTab'
            },
            'view': {},
            initialize: function()
            {
                this.view = new UsersAccountView();
            },
            showTab: function( tab )
            {
                $( 'a[href="#' + tab + '"]' ).tab( 'show' );
            },
            viewVideo: function( video_id )
            {
                $( 'a[href="#videos"]' ).tab( 'show' );
                this.view.viewVideo( video_id );
            }
        });

    exports.start = function()
    {
        new UsersRouter();
    };
});