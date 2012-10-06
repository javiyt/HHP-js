define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        LoginView = require( 'modules/views/login' ),
        GeneralRouter = Backbone.Router.extend({
        'routes': {
            'olvidar': 'forgottenPassword',
            'conectar': 'login'
        },
        'loginView': {},
        initialize: function()
        {
            this.loginView = new LoginView();
            this.loginView.on( 'loginView:hidden', this.goToHome, this );
        },
        goToHome: function()
        {
            this.navigate( '', {trigger: true} );
        },
        forgottenPassword: function()
        {
            this.loginView.showForgotten();
        },
        login: function()
        {
            this.loginView.showLogin();
        }
    });

    exports.start = function()
    {
        new GeneralRouter();
    };
});