<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Update Size</title>
</head>
<body>
    <h2>Update Size</h2>

    <form action="UpdateSizeServlet" method="post">
        Size ID: <input type="text" name="id" value="${size.id}" readonly><br>
        Name: <input type="text" name="namesize" value="${size.namesize}"><br>
        Width: <input type="text" name="width" value="${size.width}"><br>
        Height: <input type="text" name="height" value="${size.height}"><br>

        <input type="submit" value="Update">
    </form>
</body>
</html>
