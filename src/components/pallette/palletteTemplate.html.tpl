<% for(var i = 0; i < list.length; i++) { %>
  <button class="btn btn-light-blue form-check-label" data-color="<%=list[i].color%>" id="<%=list[i].id%>">
      <span class="badge" style="background-color: <%=list[i].color%>"> </span> <%=list[i].name%>
  </button>
<% } %>
