define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        MaquetasSubirView = require( 'modules/views/maquetas_subir' ),
        MaquetasEditarView = MaquetasSubirView.extend(
        {
            'step': 'step1'
        } );

    return MaquetasEditarView;
} );