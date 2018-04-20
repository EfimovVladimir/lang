<%--
  Created by IntelliJ IDEA.
  User: efimovvv
  Date: 13.03.2017
  Time: 13:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
    <p>simple jsp page</p>
    <h3> <% out.println("Your IP address is " + request.getRemoteAddr());  %> </h3>
  </body>
</html>
