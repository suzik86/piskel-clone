<% for(var i = 0; i < list.length; i++) { %>
  <button class="btn btn-light-blue form-check-label" data-tool="<%=list[i].id%>" id="tool-button-<%=list[i].id%>">
      <i class="<%=list[i].image%>"></i> <%=list[i].name%>
  </button>
<% } %>
