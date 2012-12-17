require( ['./main'], function( main)
{
    require( ['modules/routers/maquetas_editar'], function( maquetas )
    {
        maquetas.start();
    } );
});