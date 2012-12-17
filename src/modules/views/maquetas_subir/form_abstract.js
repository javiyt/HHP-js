define( function( require, exports )
{
    var $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        FormViewAbstract = Backbone.View.extend(
        {
            show: function()
            {
                this.el.style.display = 'block';
            },
            hide: function()
            {
                this.el.style.display = 'none';
            }
        } );

        return FormViewAbstract;
} );