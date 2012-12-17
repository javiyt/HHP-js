define( function( require )
{
    var $ = require( 'jquery' ),
        _ = require( 'underscore' ),
        Backbone = require( 'backbone' ),
        VideoModel = Backbone.Model.extend(
        {
            'urlRoot': '/ajax/video',
            'defaults': {
                'video_id': 0,
                'grupo': '',
                'titulo': '',
                'descripcion': ''
            },
            validate: function( attrs )
            {
                var errors = [];

                if ( !this.isNew() )
                {
                    return;
                }

                for ( var i in this.defaults )
                {
                    if ( _.isEmpty( attrs[i] ) )
                    {
                        errors.push( 'El campo ' + i + ' es obligatorio' );
                    }
                }

                if ( 0 < errors.length )
                {
                    return errors;
                }
            },
            parse: function( response )
            {
                if ( 0 == response.id )
                {
                    this.trigger( 'error', this, response.message );
                    return;
                }

                return response;
            },
            getYoutubeVideoInformation: function()
            {
                var url = 'http://gdata.youtube.com/feeds/api/videos/' + this.get( 'video_id' ) + '?v=2&alt=json-in-script';
                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    beforeSend: function()
                    {
                        this.trigger( 'video:search' );
                    },
                    complete: function()
                    {
                        this.trigger( 'video:searched' );
                    },
                    success: function( response )
                    {
                        var data = {
                            grupo: '',
                            titulo: response.entry.title['$t'],
                            descripcion: response.entry['media$group']['media$description']['$t']
                        },
                        tmp;

                        if ( -1 != data.titulo.indexOf( '-' ) )
                        {
                            tmp = data.titulo.split( '-' );
                            data.titulo = tmp[1];
                            data.grupo = tmp[0];
                        }

                        this.set( data, {silent: true} );
                        this.trigger( 'video:info_found' );
                    },
                    error: function()
                    {
                        this.trigger( 'error', this, 'Error intentando obtener la información del video, inténtelo de nuevo' );
                    },
                    context: this
                });
            }
        });

    return VideoModel;
});