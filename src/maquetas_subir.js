require( ['./main'], function( main)
{
    require( ['modules/routers/maquetas_subir'], function( maquetas )
    {
        maquetas.start();
    } );
});