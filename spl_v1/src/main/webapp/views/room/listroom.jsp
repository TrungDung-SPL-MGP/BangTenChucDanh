<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Room Manager</title>
    
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f2f2f2;
            font-size: 14px;
        }
        #striped-table {
            width: 100%;
            border-collapse: collapse;
        }
        #striped-table th, #striped-table td {
            border: none;
            padding: 8px;
            text-align: center;
        }
        #striped-table tbody tr:nth-child(odd) {
            background-color: #bfbfbf;
            color: #fffffb;
        }
        #striped-table tbody tr:nth-child(even) {
            background-color: #f0f5fa;
            color: #b0b0b0;
        }
        .icon {
            width: 25px;
            height: 25px;
            transition: transform 0.3s;
        }
        .icon:hover {
            transform: scale(1.5);
        }
        .mau {
            color: #bfbfbf;
            font-weight: bold;
        }
    </style>

    <script>
        function searchById() {
            const input = document.getElementById("searchInput").value.toLowerCase();
            const rows = document.querySelectorAll("#striped-table tbody tr");
            rows.forEach(row => {
                const idCell = row.cells[1].textContent.toLowerCase();
                row.style.display = idCell.includes(input) ? "" : "none";
            });
        }

        function logout() {
            alert("Back to home!");
            window.location.href = "welcome.jsp";
        }
    </script>
</head>
<body>
    <div class="container">
        <center><h1 class="mau">Meeting Room Management</h1></center>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <a href="addroom.jsp" class="icon-link">
                <img src="img/icons/add.png" alt="Add Room" class="icon">
            </a>
            <input type="text" id="searchInput" onkeyup="searchById()" class="form-control" placeholder="Search by ID" style="max-width: 200px;">
        </div>

        <table id="striped-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name Room</th>
                    <th>Template</th>
                    <th>Size</th>
                    <th>Date Starts</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Room</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${requestScope.room}" var="c" varStatus="loop">
                    <tr>
                        <td>${loop.index + 1}</td>
                        <td>${c.id}</td>
                        <td>${c.nameroom}</td>
                        <td>${c.idtemplate}</td>
                        <td>${c.idsize}</td>
                        <td>${c.datestart}</td>
                        <td>${c.width}</td>
                        <td>${c.height}</td>
                        <td>${c.room}</td>
                        <td>
                            <a href="viewroom.jsp?id=${c.id}" class="icon-link">
                                <img src="img/icons/eye.png" alt="View" class="icon">
                            </a>
                            <a href="deleteroom.jsp?id=${c.id}" class="icon-link">
                                <img src="img/icons/delete.png" alt="Delete" class="icon">
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>
