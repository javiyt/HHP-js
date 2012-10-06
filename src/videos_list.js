require( ['./main'], function( main)
{
    require( ['modules/routers/videos_list'], function( videos )
    {
        videos.start();
    } );
});