define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        TemaView = require( 'modules/views/maquetas_subir/tema' ),
        MaquetaTemasView = Backbone.View.extend(
        {
            el: document.getElementById( 'maqueta_temas' ),
            initialize: function()
            {
                this.collection.on( 'add', this.addTema, this );
                this.collection.on( 'reset', this.addTemas, this );
            },
            addTema: function( model )
            {
                var view = new TemaView( {model: model} );

                this.$el.find( 'tbody' ).append( view.render() );
            },
            addTemas: function()
            {
                this.$el.find( 'tbody' ).html( '' );
                this.collection.each( this.addTema, this );
            }
        } );

        return MaquetaTemasView;
} );