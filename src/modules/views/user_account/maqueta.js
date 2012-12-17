define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        MaquetaModel = require( 'modules/models/maqueta' ),
        MaquetasTemplate = require( 'text!templates/user_account_maquetas.tpl' ),
        MaquetaView = Backbone.View.extend(
        {
            'tagName': 'tr',
            'template': _.template( MaquetasTemplate ),
            'events': {
                'click a.eliminar': 'removeMaqueta'
            },
            initialize: function()
            {
                this.model.on( 'destroy', this.destroy, this );
                this.model.on( 'error', this.error, this );
            },
            removeMaqueta: function( e )
            {
                if ( confirm( '¿Seguro que quieres borrar la maqueta: ' + this.model.get( 'grupo' ) + ' - ' + this.model.get( 'titulo' ) + '?' ) )
                {
                    this.model.destroy( {wait: true} );
                }
                e.preventDefault();
            },
            render: function()
            {
                this.el.innerHTML = this.template( this.model.toJSON() );
                return this.el;
            },
            destroy: function()
            {
                this.undelegateEvents();
                this.remove();
            },
            error: function()
            {
                alert( 'Hubo un error borrando la maqueta, vuelva a intentarlo más tarde o contacta con el equipo de HHP' );
            }
        } );

        return MaquetaView;
} );