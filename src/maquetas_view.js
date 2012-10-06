require( ['./main'], function( main)
{
    require( ['modules/routers/maquetas_view'], function( maquetas )
    {
        maquetas.start();
    } );
});