

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

        <style>
            body{

                font-family: Arial, Helvetica, sans-serif;
                background: #f2f2f2;
                font-size: 10px;
            }
            /* table {
                 border-collapse: collapse;
                 width: 100%;
             }
     
             th, td {
                 border: hidden;
                 padding: 8px;
                 text-align: center;
                 font-size: 10px;
             }
     
             th {
                 background: #bfbfbf;
                 color: #fffffb
             }*/
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
                color: #fffffb;
            }

            #striped-table tbody tr:nth-child(even) {
                background-color: #f0f5fa;
                color: #b0b0b0
            }
            .icon-link {
                text-decoration: none; /* loại bỏ gạch chân mặc định */
                display: inline-block;
                position: relative;
            }

            .icon-link i {
                margin-right: 5px; /* tạo khoảng cách giữa biểu tượng và văn bản */
            }
            .icon-link img {
                filter: brightness(20%) contrast(10%);
                /* Giảm độ sáng và độ trong của hình ảnh icon */
            }
            .icon {
                width: 30px;
                height: 30px;
                transition: transform 0.3s;
                margin-left: 5px;
            }

            .icon:hover {
                transform: scale(2); /* Phóng to 133% khi con chuột hover vào */
            }
            .mau{
                color: #bfbfbf;
                font-weight: bold;
            }
        </style>

    </head>
    <body>
        <div class=" container">

            <center><h1 class="mau">Table size list</h1></center>  


            <a href="addtem.jsp" class="icon-link">
                <img src="img/icons/add.png" alt="Update" class="icon" style="cursor: pointer;width: 25px; height: 25px;">
            </a>
            <br>
            <br>
            <table id="striped-table" >
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
                            <a href="viewtem.jsp?id=${c.id}" class="icon-link">
                                <img src="img/icons/eye.png" alt="View" class="icon" style="cursor: pointer;width: 15px; height: 15px;">
                            </a>
                            <a href="updatetem.jsp?id=${c.id}" class="icon-link">
                                <img src="img/icons/Renew.png" alt="Update" class="icon" style="cursor: pointer;width: 15px; height: 15px;">
                            </a>
                            <a href="deletetem.jsp?id=${c.id}" class="icon-link">
                                <img src="img/icons/delete.png" alt="Delete" class="icon" style="cursor: pointer; width: 15px; height: 15px;">

                            </a>
                        </td>
                    </tr>

                </c:forEach>





            </table>
    </body>
</html>

