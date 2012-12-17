define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        template = require( 'text!templates/maquetas_temas.tpl' ),
        MaquetaTemaView = Backbone.View.extend(
        {
            'tagName': 'tr',
            'template': _.template( template ),
            'events': {
                'blur input': 'changeTemaInfo',
                'click a.eliminar': 'removeTema'
            },
            initialize: function()
            {
                this.render();
                this.model.on( 'change:loaded', this.changeProgress, this );
                this.model.on( 'change:name', this.render, this );
                this.model.on( 'remove destroy', this.remove, this );
            },
            render: function()
            {
                var data = this.model.toJSON();

                data.cid = this.model.cid;
                if ( !data.nombre_tema )
                {
                    data.nombre_tema = data.name;
                }

                this.el.innerHTML = this.template( data );

                return this.el;
            },
            changeTemaInfo: function()
            {
                this.model.set(
                {
                    'orden': document.getElementById( 'orden-' + this.model.cid ).value,
                    'name': document.getElementById( 'nombre-' + this.model.cid ).value
                } );
            },
            changeProgress: function()
            {
                var progress = ( ( this.model.get( 'size' ) * 100 )  / this.model.get( 'loaded' ) );

                if ( 100 == progress || 0 == progress )
                {
                    this.$el.find( '.progress' ).addClass( 'hide' );
                }
                else
                {
                    this.$el.find( '.bar' ).css( 'width', progress + '%' );
                }
            },
            remove: function()
            {
                this.$el.remove();
            },
            removeTema: function( e )
            {
                if ( confirm( '¿Está seguro que desea eliminar el tema: ' + this.model.get( 'name' ) + '?' ) )
                {
                    this.model.destroy();
                }
                e.preventDefault();
            }
        } );

        return MaquetaTemaView;
} );