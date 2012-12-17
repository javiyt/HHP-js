define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        videoModel = require( 'modules/models/video' ),
        videosView = Backbone.View.extend(
        {
            'el': document.getElementById( 'video_page' ),
            'elements': {
                'form': document.getElementById( 'modalForm' ),
                'video_marcado': document.getElementById( 'video_marcado' )
            },
            'events': {
                'click #gotoStep2': 'formStep2',
                'click #saveVideo': 'saveVideo',
                'click #marcar_video': 'marcarVideo'
            },
            showForm: function()
            {
                this.hideErrorMessage();
                this.hideSearchMessage();
                $( '.step1', this.elements.form ).removeClass( 'hide' );
                $( '.step2', this.elements.form ).addClass( 'hide' );
                $( 'input', this.elements.form ).val( '' );
                $( this.elements.form ).modal( 'show' ).on( 'hidden', $.proxy( function()
                {
                    this.trigger( 'modal:hide' );
                }, this ) );
            },
            closeForm: function()
            {
                $( this.elements.form ).modal( 'hide' );
            },
            formStep2: function( e )
            {
                var url = document.getElementById( 'inputURL' ).value,
                    video_id = this.ytVidId( url ),
                    model;

                e.preventDefault();
                this.hideErrorMessage();
                if ( false == video_id )
                {
                    this.showErrorMessage( {}, 'URL de youtube no válida' );
                    return;
                }

                this.model = new videoModel( {video_id: video_id} );

                this.model.on( 'video:search', this.showSearchMessage, this );
                this.model.on( 'video:searched', this.hideSearchMessage, this );
                this.model.on( 'error', this.showErrorMessage, this );
                this.model.on( 'video:info_found', this.showFormStep2, this );
                this.model.on( 'change', this.closeForm, this );

                this.model.getYoutubeVideoInformation();
            },
            showErrorMessage: function( model, message )
            {
                $( '.alert', this.elements.form ).html( message ).addClass( 'alert-error' ).removeClass( 'hide alert-info' ).show();
            },
            hideErrorMessage: function()
            {
                $( '.alert', this.elements.form ).html( '' ).removeClass( 'alert-error' ).addClass( 'hide' ).hide();
            },
            showSearchMessage: function()
            {
               $( '.alert', this.elements.form ).html( 'Buscando información del video' ).addClass( 'alert-info' ).removeClass( 'hide alert-error' ).show();
            },
            hideSearchMessage: function()
            {
                $( '.alert', this.elements.form ).html( '' ).removeClass( 'alert-info' ).addClass( 'hide' ).hide();
            },
            showFormStep2: function()
            {
                $( '.step1', this.elements.form ).addClass( 'hide' );
                $( '.step2', this.elements.form ).removeClass( 'hide' );

                document.getElementById( 'inputGrupo' ).value = this.model.get( 'grupo' );
                document.getElementById( 'inputTitulo' ).value = this.model.get( 'titulo' );
                document.getElementById( 'inputDescripcion' ).value = this.model.get( 'descripcion' );
            },
            saveVideo: function()
            {
                var video_info = {
                    'grupo': document.getElementById( 'inputGrupo' ).value,
                    'titulo': document.getElementById( 'inputTitulo' ).value,
                    'descripcion': document.getElementById( 'inputDescripcion' ).value
                };

                this.model.set( video_info, {silent: true} );
                $( '.alert', this.elements.form ).html( 'Guardando video en HipHop-Producciones.net' ).addClass( 'alert-info' ).removeClass( 'hide' ).show();
                this.model.save();
            },
            ytVidId: function( url )
            {
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
                        match = url.match( regExp );

                return ( match && match[7].length == 11 )  ? match[7] : false;
            },
            marcarVideo: function( e )
            {
                var video_id = e.currentTarget.getAttribute( 'data-video' );

                e.preventDefault();

                this.model = new videoModel( {id: video_id, inadecuado: 1} );

                this.model.on( 'sync', this.videoMarcado, this );

                this.$el.find( '.loading' ).removeClass( 'hide' );
                this.model.save();
            },
            videoMarcado: function( model )
            {
                this.$el.find( '.loading' ).addClass( 'hide' );

                if ( model.get( 'result' ) )
                {
                    $( this.elements.video_marcado ).addClass( 'alert-success' ).append( '<span>Gracias por avisarnos de contenido inapropiado, nuestro equipo lo revisará</span>' ).removeClass( 'hide' );
                }
                else
                {
                    $( this.elements.video_marcado ).addClass( 'alert-error' ).append( '<span>Hubo un error marcando el video</span>' ).removeClass( 'hide' );
                }

                window.scrollTo( 0, 0 );
            }
        } );

    return videosView;
});