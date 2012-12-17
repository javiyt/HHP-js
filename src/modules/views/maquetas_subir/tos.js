define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        FormAbstract = require( 'modules/views/maquetas_subir/form_abstract' ),
        MaquetasTosView = FormAbstract.extend(
        {
            'el': document.getElementById( 'step_terminos' ),
            'events': {
                'click #continuar': 'setAccepted'
            },
            setAccepted: function( e )
            {
                this.model.set( { 'tos': true}, {silent: true} );
                this.el.style.display = 'none';
            }
        } );

    return MaquetasTosView;
} );