define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        MaquetaModel = require( 'modules/models/maqueta' ),
        MaquetasCollection = Backbone.CollectionPager.extend(
        {
            'model': MaquetaModel,
            'url': '/ajax/maqueta',
            parse: function( response )
            {
                if ( response.maquetas )
                {
                    return response.maquetas;
                }

                return response;
            }
        } );

        return MaquetasCollection;
} );