define( function( require, exports )
{
    var Backbone = require( 'backbone' ),
        VideoModel = require( 'modules/models/video' ),
        VideosCollection = Backbone.CollectionPager.extend(
        {
            'model': VideoModel,
            'url': '/ajax/video',
            parse: function( response )
            {
                if ( response.videos )
                {
                    return response.videos;
                }

                return response;
            }
        } );

        return VideosCollection;
} );