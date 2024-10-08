<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String photoDirectory = "img/logo/"; // Đường dẫn tới thư mục chứa hình ảnh
    File folder = new File(getServletContext().getRealPath(photoDirectory));
    File[] files = folder.listFiles();
%>
<!DOCTYPE html>
<html>
<head>
    <title>List of Photos</title>
</head>
<body>
    <h1 style="color: red ; text-align: center">List of Photos</h1>

    <c:forEach var="file" items="${files}">
        <div>
            <img src="${pageContext.request.contextPath}/${photoDirectory}/${file.name}" alt="${file.name}">
        </div>
    </c:forEach>
</body>
</html>