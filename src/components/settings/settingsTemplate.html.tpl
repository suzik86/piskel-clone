<div class="modal" tabindex="-1" role="dialog" id="settings-dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Key bindings</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="settings-form" action="" method="get">

        <% for(let key in keys) { %>
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="key-<%=key%>"><%=keys[key].name%></label>
              <input type="text" class="form-control" name="<%=key%>" id="key-<%=key%>" value="<%=keys[key].key%>" required>
            </div>
          </div>
      <% } %>


        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="settings-save">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
