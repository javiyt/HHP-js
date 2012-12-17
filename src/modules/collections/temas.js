define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        TemaModel = require( 'modules/models/tema' ),
        TemasCollection = Backbone.Collection.extend(
        {
            model: TemaModel
        } );

    return TemasCollection;
} );