define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        MaquetasSubirView = require( 'modules/views/maquetas_subir' ),
        MaquetasSubirRouter = Backbone.Router.extend(
        {
            'view': {},
            'routes': {
                'step:step': 'step',
                '*default': 'tos'
            },
            'defaultStep': 'tos',
            initialize: function()
            {
                this.initView();
                this.view.on( 'error', this.viewError, this );

                this.navigate( this.defaultStep, {trigger: true} );
            },
            initView: function()
            {
                this.view = new MaquetasSubirView();
            },
            viewError: function( step )
            {
                this.navigate( step );
            },
            tos: function()
            {
                this.view.viewStep( 'tos' );
            },
            step: function( step )
            {
                this.view.viewStep( 'step' + step );
            }
        });


    exports.start = function()
    {
        new MaquetasSubirRouter();
    };

    exports.router = MaquetasSubirRouter;
} );