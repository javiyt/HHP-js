define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        UsersAccountView = require( 'modules/views/users_account' ),
        UsersRouter = Backbone.Router.extend({
            'routes': {
                '*default': 'showTab'
            },
            showTab: function( tab )
            {
                $( 'a[href="#' + tab + '"]' ).tab( 'show' );
            }
        });

    exports.start = function()
    {
        new UsersRouter();
    };
});