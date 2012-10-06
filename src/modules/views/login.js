define( function( require )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        LoginView = Backbone.View.extend(
        {
            'el': document.getElementById( 'conectarModal' ),
            'elements': {
                'conectar': document.getElementById( 'formConectar' ),
                'recuperar': document.getElementById( 'formRecuperar' )
            },
            'events': {
                'click button.conectar': 'sendForm',
                'click button.recuperar': 'sendForm'
            },
            initialize: function()
            {
                this.$el.on( 'hidden', $.proxy( function(){
                    this.trigger( 'loginView:hidden' );
                }, this ) );
            },
            showModal: function()
            {
                this.$el.modal( 'show' );
            },
            showLogin: function()
            {
                $( this.elements.conectar ).removeClass( 'hide' );
                $( this.elements.recuperar ).addClass( 'hide' );
                this.$el.find( 'button.conectar' ).removeClass( 'hide' );
                this.$el.find( 'button.recuperar' ).addClass( 'hide' );

                this.showModal();
            },
            showForgotten: function()
            {
                $( this.elements.conectar ).addClass( 'hide' );
                $( this.elements.recuperar ).removeClass( 'hide' );
                this.$el.find( 'button.conectar' ).addClass( 'hide' );
                this.$el.find( 'button.recuperar' ).removeClass( 'hide' );

                this.showModal();
            },
            sendForm: function( e )
            {
                var form = $( e.currentTarget ).attr( 'data-rel' );

                $( document.getElementById( form ) ).submit();
            }
        });

    return LoginView;
});