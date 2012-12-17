define( function( require, exports )
{
    var jPlayerPlaylist = require( 'playlist' );

    exports.start = function()
    {
        var myPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        }, maquetaPlaylist, {
            playlistOptions: {
                enableRemoveControls: false
            },
            swfPath: "js",
            supplied: "mp3"
        });
    };
} );