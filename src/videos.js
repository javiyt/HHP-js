require( ['./main'], function( main)
{
    require( ['modules/routers/videos'], function( videos )
    {
        videos.start();
    } );
});