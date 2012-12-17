define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        FormAbstract = require( 'modules/views/maquetas_subir/form_abstract' ),
        fileupload = require( 'fileupload' ),
        TemasView = require( 'modules/views/maquetas_subir/temas' ),
        MaquetasSubirStep2View = FormAbstract.extend(
        {
            'el': document.getElementById( 'form_step_2' ),
            'elements': {
                'progress': document.getElementById( 'progressall' ),
                'allbar': document.getElementById( 'progressall-bar' ),
                'guardar': document.getElementById( 'guardar_maqueta' ),
                'error_upload': document.getElementById( 'error_upload' ),
                'file_upload': document.getElementById( 'fileupload' )
            },
            initialize: function()
            {
                this.startUpload();
                new TemasView( {collection: this.model.get( 'temas' ) } );

                this.model.on( 'change:id_maqueta', this.updateId, this );

                this.model.get( 'temas' ).on( 'reset', this.showSave, this );
            },
            showSave: function()
            {
                if ( this.model.get( 'temas' ).length > 0 )
                {
                    this.removeClass( this.elements.guardar, this.CLASS_HIDE );
                }
            },
            updateId: function()
            {
                var oFileUpload = this.elements.file_upload;

                $( oFileUpload ).fileupload( {url: oFileUpload.dataset.url.replace( /\/maqueta\/[0-9]+\/tema/, '/maqueta/' + this.model.get( 'id_maqueta' ) +'/tema' )} );
            },
            startUpload: function()
            {
                $( this.elements.file_upload ).fileupload(
                {
                    'dataType': 'json',
                    'sequentialUploads': true,
                    change: $.proxy(function ( e, data )
                    {
                        _.each( data.files, function( file )
                        {
                            this.model.addTema( file );
                        }, this );
                    }, this),
                    done: $.proxy(function ( e, data )
                    {
                        var model = this.model.get( 'temas' ).where( {original_file: data.files[0].name} );
                        if ( model.length > 0 )
                        {
                            model[0].set( {id: data.result.id} );
                        }

                    }, this ),
                    fail: $.proxy(function( e, data )
                    {
                        var model = this.model.get( 'temas' ).where( {original_file: data.files[0].name} );
                        this.model.get( 'temas' ).remove( model );

                        this.showError( data.jqXHR.status );
                    }, this ),
                    start: $.proxy(function()
                    {
                        var oElements = this.elements;

                        this.addClass( oElements.error_upload, this.CLASS_HIDE );
                        this.addClass( oElements.guardar, this.CLASS_HIDE );
                        this.removeClass( oElements.progress, this.CLASS_HIDE );
                    }, this),
                    stop: $.proxy(function()
                    {
                        var oElements = this.elements;

                        this.addClass( oElements.progress, this.CLASS_HIDE );
                        if ( this.model.get( 'temas' ).length )
                        {
                            this.removeClass( oElements.guardar, this.CLASS_HIDE );
                        }
                    }, this),
                    progress: $.proxy( function( e, data )
                    {
                        var model = this.model.get( 'temas' ).where( {original_file: data.files[0].name} );
                        if ( model.length > 0 )
                        {
                            model[0].set( 'loaded', data.loaded );
                        }

                    }, this ),
                    progressall: $.proxy( function( e, data )
                    {
                        var progress = ( ( data.loaded * 100 ) / data.total );

                        this.elements.allbar.style.width = progress + '%';
                    }, this ),
                    add: function ( e, data )
                    {
                        data.submit();
                    }
                });
            },
            showError: function( status )
            {
                var message = 'Hubo un error subiendo el tema, vuelva a intentarlo',
                    oErrorUpload = this.elements.error_upload;

                switch( status )
                {
                    case 415:
                        message = 'Tipo de archivo no permitido';
                        break;
                    case 403:
                        message = 'El usuario no tiene permisos para subir el archivo';
                        break;
                }

                oErrorUpload.innerHTML = message;
                this.removeClass( oErrorUpload, this.CLASS_HIDE );
            }
        } );

        return MaquetasSubirStep2View;
} );