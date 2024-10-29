<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Table card Manager</title>


        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                background: #EEEEEE;
                font-size: 10px;
            }

            #striped-table {
                width: 100%;
                border-collapse: collapse;
            }

            #striped-table th, #striped-table td {
                border: hidden;
                padding: 8px;
                text-align: center;
            }

            #striped-table tbody tr:nth-child(odd) {
                background-color: #bfbfbf;
                color: #1f1f1f;
            }

            #striped-table tbody tr:nth-child(even) {
                background-color: #f0f5fa;
                color: #b1b1b1;
            }

            .icon-link {
                text-decoration: none;
                display: inline-block;
                position: relative;
            }

            .icon-link img {
                filter: brightness(50%) contrast(100%);
                width: 25px;
                height: 25px;
                transition: transform 0.3s;
            }

            .icon:hover {
                transform: scale(1.33); /* Phóng to khi hover */
            }

            .mau {
                color: #1f1f1f;
                font-weight: bold;
            }

            .active {
                color: green; /* Màu xanh cho Active */
            }
            .inactive {
                color: red; /* Màu đỏ cho Inactive */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <center><h1 class="mau">Table card Manager</h1></center>

            
            <a href="addtablecard.jsp" class="icon-link">
                <img src="img/icons/add.png" alt="Add Tablecard" class="icon">
            </a>

            <br><br>

            
            <table id="striped-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name Card</th>
                        <th>ID Template</th>
                        <th>Active</th>
                        <th>Battery</th>
                        <th>Room</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${requestScope.table}" var="c" varStatus="loop">
                        <c:set var="id" value="${c.id}" />
                        <tr>
                            <td>${loop.index + 1}</td>
                            <td>${id}</td>
                            <td>${c.namecard}</td>
                            <td>${c.idtemplate}</td>
                            <td><c:choose>
                                    <c:when test="${c.active == 1}">
                                        <span class="active">Active</span>
                                    </c:when>
                                    <c:otherwise>
                                        <span class="inactive">Inactive</span>
                                    </c:otherwise>
                                </c:choose></td>
                            <td><c:choose>
                                    <c:when test="${c.battery > 20}">
                                        <img src="img/icons/pin_green.png" alt="View" class="icon" style="width: 15px; height: 15px;">
                                    </c:when>
                                    <c:otherwise>
                                        <img src="img/icons/pin_red.png" alt="View" class="icon" style="width: 15px; height: 15px;">
                                    </c:otherwise>
                                </c:choose>
                                ${c.battery}</td>
                            <td>${c.idroom}</td>
                            <td>

                                <a href="ViewTableCardServlet?id=${c.id}" class="icon-link">
                                    <img src="img/icons/eye.png" alt="View" class="icon" style="width: 15px; height: 15px;">
                                </a>



                                <a href="DeleteTableCardServlet?id=${c.id}" onclick="return confirm('Are you sure you want to delete this tablecard?');" class="icon-link">
                                    <img src="img/icons/delete.png" alt="Delete" class="icon" style="width: 15px; height: 15px;">
                                </a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
