define( function( require, exports )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        MaquetasCollection = require( 'modules/collections/maquetas' ),
        MaquetaView = require( 'modules/views/user_account/maqueta' ),
        UsersAccountMaquetasView = Backbone.View.extend(
        {
            'el': document.getElementById( 'table_maquetas' ),
            'scrollOffset': 100,
            initialize: function()
            {
                this.collection = new MaquetasCollection();

                this.collection.on( 'reset', this.renderMaquetas, this );
                this.collection.on( 'add', this.renderOne, this );
                this.collection.on( 'fetch:start', this.showLoading, this );
                this.collection.on( 'fetch:complete', this.hideLoading, this );

                if ( window.Maquetas )
                {
                    this.collection.reset( window.Maquetas );
                }

                this.scrolling();
            },
            renderMaquetas: function()
            {
                var $body = this.$el.find( 'tbody' ),
                    views =[],
                    view = {};

                this.collection.each( function( model )
                {
                    view = new MaquetaView( {model: model} );
                    views.push( view.render() );
                } );

                $body.append( views );
            },
            renderOne: function( model )
            {
                var view = new MaquetasView( {model: model} );
                this.$el.find( 'tbody' ).append( view.render() );
            },
            showLoading: function()
            {
                $( document.getElementById( 'loading_maquetas' ) ).removeClass( 'hide' );
            },
            hideLoading: function()
            {
                $( document.getElementById( 'loading_maquetas' ) ).addClass( 'hide' );
            }
        });

    return UsersAccountMaquetasView;
} );