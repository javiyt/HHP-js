<td>
    <% if ( 0 !== parseInt( orden ) || 'audio/mp3' == type ) { %>
        <input type="text" name="orden" id="orden-<%= cid %>" value="<%= orden %>" class="input-mini" <% if ( typeof id !== 'undefined' && 0 != id ) { %> disabled="disabled" <% } %>required>
    <% } else{ %>
        <input type="hidden" name="orden" id="orden-<%= cid %>" value="0">
    <% } %>
</td>
<td>
    <input type="text" name="nombre" id="nombre-<%= cid %>" value="<%= nombre_tema %>" class="input-xlarge" <% if ( typeof id !== 'undefined' && 0 != id ) { %> disabled="disabled" <% } %>required>
</td>
<td>
    <a href="#" class="eliminar btn btn-warning"><i class="icon-remove icon-white"></i> Eliminar</a>
</td>