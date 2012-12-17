define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        TemaModel = Backbone.Model.extend(
        {
            'defaults': {
                'id_maqueta': 0,
                'orden': 0,
                'type': '',
                'name': ''
            },
            urlRoot: function()
            {
                return '/ajax/maqueta/' + this.get( 'id_maqueta' ) + '/tema';
            }
        } );

    return TemaModel;
} );