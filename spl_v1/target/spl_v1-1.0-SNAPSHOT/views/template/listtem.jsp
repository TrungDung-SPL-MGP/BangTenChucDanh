

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Size Manager</title>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
        <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #b3d9ff;
            color: white;
        }
    </style>


    <body>
        <div class=" container">

            <center><h1 class="mau" style="color: #b3d9ff">Table size list</h1></center>  


            <a href="addsize.jsp">
                <button style="background-color: #007bff; color: white;">Add Size</button>
            </a>
            <table  >
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
                <c:forEach items="${requestScope.listtem}" var="c" varStatus="loop"  >
                    <c:set var="id" value="${c.id}"/>
                    <tr>
                        <td>${loop.index + 1}</td>
                        <td>${id}</td>
                        <td>${c.nametem}</td>
                        <td>${c.idphoto}</td>
                        <td>${c.idsize}</td>
                        <td>
                            <a href="updatesize.jsp?id=${c.id}">
                                <button style="background-color: #ffc107; color: white;">Update</button>
                            </a>
                            |   
                            <a href="deletesize.jsp?id=${c.id}">
                                <button style="background-color: #dc3545; color: white;">Delete</button>
                            </a>
                        </td>
                    </tr>

                </c:forEach>





            </table>
    </body>
</html>

