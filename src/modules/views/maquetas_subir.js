define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        SubirTos = require( 'modules/views/maquetas_subir/tos' ),
        SubirStep1 = require( 'modules/views/maquetas_subir/form_step1' ),
        SubirStep2 = require( 'modules/views/maquetas_subir/form_step2' ),
        SubirStep3 = require( 'modules/views/maquetas_subir/form_step3' ),
        MaquetaModel = require( 'modules/models/maqueta' ),
        MaquetasSubirView = Backbone.View.extend(
        {
            'el': document.getElementById( 'formSubir' ),
            'step': 'tos',
            views: {},
            initialize: function()
            {
                this.model = new MaquetaModel();
                this.model.on( 'error', this.error, this );
                this.model.on( 'sync', this.modelSaved, this );

                this.views.tos = new SubirTos( {model: this.model} );
                this.views.step1 = new SubirStep1( {model: this.model} );
                this.views.step2 = new SubirStep2( {model: this.model} );
                this.views.step3 = new SubirStep3();

                $( window ).on( 'beforeunload', $.proxy( function( e )
                {
                    if ( 'step3' != this.step && 'tos' != this.step )
                    {
                        return 'Todavía no has acabado de subir la maqueta ¿seguro que quieres irte? Todos lo que hayas subido se perderá';
                    }
                }, this ) );
            },
            error: function( model, message )
            {
                document.getElementById( 'loading_server' ).style.display = 'none';
                if ( message )
                {
                    if ( message.status )
                    {
                        switch ( message.status )
                        {
                            case 409:
                                message = 'La maqueta ya se encuentra en nuestra base de datos, si se trata de un error ponte en contacto con nosotros';
                                break;
                            case 500:
                                message = 'Hubo un error al dar de alta la maqueta, por favor vuelve a intentarlo, si el error persiste ponte en contacto con nosotros';
                                break;
                            case 417:
                                message = 'Debes subir al menos un tema para poder guardar la maqueta';
                                break;
                        }
                    }
                    else
                    {
                        message = 'Hubo un error al dar de alta la maqueta, por favor intenta de nuevo';
                    }

                    this.$el.find( '.message' ).html( message ).removeClass( 'hide' );
                }

                this.trigger( 'error', this.step );
            },
            hideError: function()
            {
                this.$el.find( '.message' ).addClass( 'hide' );
            },
            goToStep1: function()
            {
                this.$el.removeClass( 'hide' );
                this.step = 'step1';
                this.views.step3.hide();
                this.views.step2.hide();
                this.views.step1.show();
                this.hideError();
            },
            goToStep2: function()
            {
                this.step = 'step2';
                this.hideError();
                this.views.step3.hide();
                this.views.step2.show();
                this.views.step1.hide();
            },
            goToStep3: function()
            {
                this.step = 'step3';
                this.hideError();
                this.views.step1.hide();
                this.views.step2.hide();
                this.views.step3.show();
            },
            viewStep: function( step )
            {
                if ( 'step3' == this.step )
                {
                    return;
                }
                switch( step )
                {
                    case 'step2':
                        if ( !this.setModelInfo() )
                        {
                            this.error();
                        }
                        break;
                    case 'step1':
                        if ( this.model.get( 'tos' ) || this.model.get( 'id_maqueta' ) )
                        {
                            this.goToStep1();
                        }
                        else
                        {
                            this.error();
                        }
                        break;
                    case 'step3':
                        if ( this.model.get( 'temas' ).length == 0 )
                        {
                            this.error( this.model, 'Debes subir al menos un tema para poder guardar la maqueta' );
                        }
                        else if ( !this.setModelInfo() )
                        {
                            this.error();
                        }
                        break;
                    default:
                        this.views.step1.hide();
                        this.views.step2.hide();
                        this.views.step3.hide();
                        break;
                }

                window.scrollTo( 0, 0 );
            },
            setModelInfo: function()
            {
                var form = this.serializeForm();

                form.descripcion = this.views.step1.getDescription();

                this.model.save( form );
                document.getElementById( 'loading_server' ).style.display = 'block';
                if ( !this.model.isValid() )
                {
                    this.error();
                    return false;
                }

                if ( _.has( window, 'MaquetaTemas' ) )
                {
                    this.model.addTemas( window.MaquetaTemas );
                }

                return true;
            },
            modelSaved: function()
            {
                document.getElementById( 'loading_server' ).style.display = 'none';
                switch ( this.step )
                {
                    case 'step1':
                        this.goToStep2();
                        break;
                    case 'step2':
                        this.goToStep3();
                        break;
                }
            }
        } );

    return MaquetasSubirView;
} );