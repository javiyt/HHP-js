require( ['./main'], function( main)
{
    require( ['modules/routers/users_account'], function( users )
    {
        users.start();
    } );
});