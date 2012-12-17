define( function( require, exports )
{
    var _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        TemaModel = require( 'modules/models/tema' ),
        TemasCollection = require( 'modules/collections/temas' ),
        MaquetaModel = Backbone.Model.extend(
        {
            'urlRoot': '/ajax/maqueta',
            'idAttribute': 'id_maqueta',
            'defaults': {
                'grupo': '',
                'titulo': '',
                'descripcion': '',
                'pais': 0,
                'temas': ''
            },
            initialize: function()
            {
                this.set( {'temas': new TemasCollection()}, {'silent': true} );
            },
            addTema: function( file )
            {
                var max = this.get( 'temas' ).max( function( model ){ return model.get( 'orden' ); } ),
                    neworden = ( max ) ? max.get( 'orden' ) : 0;

                this.get( 'temas' ).add( new TemaModel(
                {
                    'name': this.processFilename( file.name ),
                    'size': file.size,
                    'type': file.type,
                    'id_maqueta': this.get( 'id_maqueta' ),
                    'orden': ( 'audio/mp3'  == file.type ) ? ++neworden : 0,
                    'original_file': file.name
                } ) );
            },
            addTemas: function( temas )
            {
                this.get( 'temas' ).reset( temas );
            },
            processFilename: function( name )
            {
                var finalName = name.replace( /\.[^/.]+$/, '' ).replace( /[0-9]+(\s|)(-|_|\.|)(\s|)/, '' );

                return ( finalName.toLowerCase() + '' ).replace( /^([a-z])|\s+([a-z])/g, function ( $1 )
                {
                    return $1.toUpperCase();
                });
            },
            validate: function( attrs )
            {
                var mandatory = ['grupo', 'titulo', 'descripcion', 'pais'],
                    i = 0,
                    len = mandatory.length,
                    attr;

                for ( i = ( len - 1); i >= 0; i-- )
                {
                    attr = attrs[mandatory[i]];
                    if ( _.isEmpty( attr ) )
                    {
                        return 'El campo ' + ( mandatory[i].charAt( 0 ).toUpperCase() + mandatory[i].substr( 1 ) ) + ' está vacío';
                    }
                }
            }
        } );

        return MaquetaModel;
} );