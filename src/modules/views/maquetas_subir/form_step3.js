define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        FormAbstract = require( 'modules/views/maquetas_subir/form_abstract' ),
        MaquetasSubirStep3View = FormAbstract.extend(
        {
            'el': document.getElementById( 'form_step_3' )
        } );

        return MaquetasSubirStep3View;
} );