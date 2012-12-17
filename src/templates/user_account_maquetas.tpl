<td>
    <a href="/maqueta/<%= URL%>" target="_blank"><%= grupo %> - <%= titulo %></a>
</td>
<td>
    <a href="/maqueta-editar/<%= URL %>#step1" class="editar"><i class="icon-pencil"></i> Editar</a>
    <a href="#" class="eliminar"><i class="icon-remove"></i> Eliminar</a>
    <% if ( 1 != estado ){ %>
        <span class="label label-important">Esperando aprobación</span>
    <% } %>
</td>