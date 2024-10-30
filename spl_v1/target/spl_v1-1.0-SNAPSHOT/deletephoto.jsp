<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.spl.bt.dao.PhotoDAO" %>
<%@ page import="com.spl.bt.dto.Photo" %>
<%
    int photoID = Integer.parseInt(request.getParameter("photoID"));
    PhotoDAO photoDAO = new PhotoDAO();
%>
<!DOCTYPE html>
<html>
<head>
    <title>Delete Photo</title>
</head>
<body>
    <h1>Delete Photo</h1>
    <p>Are you sure you want to delete this photo?</p>
    <form action="photos" method="post">
        <input type="hidden" name="action" value="delete">
        <input type="hidden" name="photoID" value="<%= photoID %>">
        <button type="submit">Yes, Delete</button>
        <a href="listphoto.jsp">Cancel</a>
    </form>
</body>
</html>
