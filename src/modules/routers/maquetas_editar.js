define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        MaquetasEditarView = require( 'modules/views/maquetas_editar' ),
        MaquetasSubirRouter = require( 'modules/routers/maquetas_subir' ),
        MaquetasEditarRouter = MaquetasSubirRouter.router.extend(
        {
            'defaultStep': 'step1',
            initView: function()
            {
                this.view = new MaquetasEditarView();
            }
        });


    exports.start = function()
    {
        new MaquetasEditarRouter();
    };
} );