define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        VideoModel = require( 'modules/models/video' ),
        VideosTemplate = require( 'text!templates/user_account_videos.tpl' ),
        VideoView = Backbone.View.extend(
        {
            'tagName': 'tr',
            'template': _.template( VideosTemplate ),
            'events': {
                'click a.eliminar': 'removeVideo'
            },
            initialize: function()
            {
                this.model.on( 'destroy', this.destroy, this );
                this.model.on( 'error', this.error, this );
            },
            removeVideo: function( e )
            {
                if ( confirm( '¿Seguro que quieres borrar la video: ' + this.model.get( 'grupo' ) + ' - ' + this.model.get( 'titulo' ) + '?' ) )
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
                alert( 'Hubo un error borrando la video, vuelva a intentarlo más tarde o contacta con el equipo de HHP' );
            }
        } );

        return VideoView;
} );