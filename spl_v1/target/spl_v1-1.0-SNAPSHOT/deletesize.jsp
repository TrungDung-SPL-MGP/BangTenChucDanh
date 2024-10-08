<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Delete Size</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <h1>Delete Size</h1>
            <form action="DeleteSizeServlet" method="POST">
                <input type="hidden" name="id" value="${param.id}" /> 

                <p>Are you sure you want to remove this size?</p>

                <button type="submit" class="btn btn-danger">Delete</button>
                <a href="size" class="btn btn-secondary">Cancel</a>
            </form>
        </div>
    </body>
</html>
