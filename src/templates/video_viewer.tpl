<div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <span><%= title %></span>
</div>
<div class="modal-body video-container">
    <iframe width="<%= width %>" height="<%= height %>" src="http://www.youtube.com/embed/<%= video_id %>?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
<div class="modal-footer">
    <a href="#marcar/<%= video_id %>" class="btn btn-danger">Marcar como borrado o inapropiado</a>
    <div class="loading hide pull-right"></div>
</div>