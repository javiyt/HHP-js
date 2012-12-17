define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        FormAbstract = require( 'modules/views/maquetas_subir/form_abstract' ),
        nicEdit = require( 'nicedit' ),
        MaquetasSubirStep1View = FormAbstract.extend(
        {
            'el': document.getElementById( 'form_step_1' ),
            'editor': {},
            initialize: function()
            {
                    this.editor = new nicEdit(
                    {
                        buttonList : ['bold','italic'],
                        iconsPath : '/js/libs/nicEditorIcons.gif'
                    }
                    ).panelInstance( 'descripcion' );
            },
            getDescription: function()
            {
                var content = this.editor.instanceById( 'descripcion' ).getContent();

                return ( content != '<br>' ) ? content : '';
            }
        } );

        return MaquetasSubirStep1View;
} );