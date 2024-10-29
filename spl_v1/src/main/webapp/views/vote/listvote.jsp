<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Vote Manager</title>
        
        <!-- PopperJS and Bootstrap -->
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
        </style>
    </head>
    <body>
        <div class="container">
            <center><h1 class="mau">Meeting Vote</h1></center>

            
            <a href="addvote.jsp" class="icon-link">
                <img src="img/icons/add.png" alt="Add Vote" class="icon">
            </a>

            <br><br>

           
            <table id="striped-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name Room</th>
                        <th>Name Card</th>
                        <th>Meeting Content</th>
                        <th>Vote</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${requestScope.vote}" var="c" varStatus="loop">
                        <c:set var="id" value="${c.id}" />
                        <tr>
                            <td>${loop.index + 1}</td>
                            <td>${id}</td>
                            <td>${c.idroom}</td>
                            <td>${c.idcard}</td>
                            <td>${c.meetingcontent}</td>
                            <td>${c.vote}</td>
                            <td>${c.votedate}</td>
                            <td>
                               
                                <a href="ViewVoteServlet?id=${c.id}" class="icon-link">
                                    <img src="img/icons/eye.png" alt="View" class="icon" style="width: 15px; height: 15px;">
                                </a>

                                
                                
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
