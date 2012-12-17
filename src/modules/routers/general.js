define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        LoginView = require( 'modules/views/login' ),
        GeneralRouter = Backbone.Router.extend({
        'routes': {
            'olvidar': 'forgottenPassword',
            'conectar': 'login',
            'registrar': 'registrar'
        },
        'loginView': {},
        initialize: function()
        {
            this.loginView = new LoginView();
            this.loginView.on( 'loginView:hidden', this.goToHome, this );
        },
        forgottenPassword: function()
        {
            this.loginView.showForgotten();
        },
        login: function()
        {
            this.loginView.showLogin();
        },
        registrar: function()
        {
            this.loginView.showRegister();
        }
    });

    exports.start = function()
    {
        new GeneralRouter();
    };
});