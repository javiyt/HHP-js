define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        videoModel = require( 'modules/models/video' ),
        videoTpl = require( 'text!templates/video_viewer.tpl' ),
        videosView = Backbone.View.extend(
        {
            'el': document.getElementById( 'main_container' ),
            'elements': {
                'modal': document.getElementById( 'modalVideo' ),
                'form': document.getElementById( 'modalForm' ),
                'video_marcado': document.getElementById( 'video_marcado' )
            },
            'size': {
                'width': 0,
                'height': 0
            },
            'offset': 30,
            'events': {
                'click #agregar_video': 'showForm',
                'click #form_video .step1 a': 'formStep2',
                'click #form_video .step2 a': 'saveVideo'
            },
            'template': _.template( videoTpl ),
            initialize: function()
            {
                this.resizeWindow();

                $( window ).on( 'resize', $.proxy( this.resizeWindow, this ) );

                $( this.elements.modal ).on( 'hidden', $.proxy( this.hideVideo, this ) );
            },
            resizeWindow: function()
            {
                var outerWidth = $( 'body' ).outerWidth();
               switch ( true )
                {
                    case ( outerWidth <= 480 ):
                    case ( outerWidth <= 768 ):
                        this.size = {'width': 420, 'height': 236};
                        break;
                    case ( outerWidth <= 980 ):
                        this.size = {'width': 640, 'height': 360};
                        break;
                    case ( outerWidth <= 1200 ):
                    default:
                        this.size = {'width': 853, 'height': 480};
                        this.offset = 45;
                        break;
                }
            },
            showVideo: function( video_id )
            {
                var current = $( 'a[data-rel="' + video_id + '"]', this.$el ),
                template_data = {
                    'width':  this.size.width,
                    'height': this.size.height,
                    'video_id': current.attr( 'data-rel' ),
                    'title': current.attr( 'data-title' )
                };

                $( this.elements.modal ).html( this.template( template_data ) ).width(  ( this.size.width + this.offset ) + 'px' ).modal( 'show' );
                $( this.elements.video_marcado ).addClass( 'hide' ).removeClass( 'alert-error alert-success' ).find( 'span' ).remove();
            },
            hideVideo: function()
            {
                $( '.video-container', this.elements.modal ).html( '' );
                this.trigger( 'video:closed' );
            },
            showForm: function( e )
            {
                this.hideErrorMessage();
                this.hideSearchMessage();
                $( '.step1', this.elements.form ).removeClass( 'hide' );
                $( '.step2', this.elements.form ).addClass( 'hide' );
                $( 'input', this.elements.form ).val( '' );
                $( this.elements.form ).modal( 'show' );

                e.preventDefault();
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
            marcarVideo: function( video_id )
            {
                this.model = new videoModel( {id: video_id, inadecuado: 1} );

                this.model.on( 'sync', this.videoMarcado, this );

                $( '.loading', this.elements.modal ).removeClass( 'hide' );
                this.model.save();
            },
            videoMarcado: function( model )
            {
                $( this.elements.modal ).modal( 'hide' );

                if ( model.get( 'result' ) )
                {
                    $( this.elements.video_marcado ).addClass( 'alert-success' ).append( '<span>Gracias por avisarnos de contenido inapropiado, nuestro equipo lo revisará</span>' ).removeClass( 'hide' );
                }
                else
                {
                    $( this.elements.video_marcado ).addClass( 'alert-error' ).append( '<span>Hubo un error marcando el video</span>' ).removeClass( 'hide' );
                }
            }
        } );

    return videosView;
});