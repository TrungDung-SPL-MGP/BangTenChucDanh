<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.spl.bt.dao.PhotoDAO" %>
<%@ page import="com.spl.bt.dto.Photo" %>
<%
    PhotoDAO photoDAO = new PhotoDAO();
    List<Photo> photos = photoDAO.getAllPhotos();
%>
<!DOCTYPE html>
<html>
<head>
    <title>Photo List</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f2f2f2;
            font-size: 14px;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            text-align: center;
        }
        #search-container {
            margin: 20px 0;
            text-align: center;
        }
        #searchTitle {
            padding: 8px;
            width: 250px;
            font-size: 14px;
        }
        #striped-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        #striped-table th, #striped-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        #striped-table thead {
            background-color: #333;
            color: white;
        }
        #striped-table tbody tr:nth-child(odd) {
            background-color: #bfbfbf;
            color: #ffffff;
        }
        #striped-table tbody tr:nth-child(even) {
            background-color: #f0f5fa;
            color: #666;
        }
        .icon {
            width: 20px;
            height: 20px;
            margin-left: 5px;
            transition: transform 0.3s;
        }
        .icon:hover {
            transform: scale(1.5);
        }
    </style>
    <script>
        function searchByTitle() {
            const input = document.getElementById("searchTitle").value.toLowerCase();
            const rows = document.querySelectorAll("#striped-table tbody tr");
            rows.forEach(row => {
                const titleCell = row.cells[1].textContent.toLowerCase();
                row.style.display = titleCell.includes(input) ? "" : "none";
            });
        }
    </script>
</head>
<body>
    <h1>Photo List</h1>

    <div id="search-container">
        <input type="text" id="searchTitle" onkeyup="searchByTitle()" placeholder="Search by title">
        <a href="addphoto.jsp">
            <img src="img/icons/add.png" alt="Add" class="icon" style="vertical-align: middle;">
        </a>
    </div>

    <table id="striped-table">
        <thead>
            <tr>
                <th>Photo ID</th>
                <th>Title</th>
                <th>Size (KB)</th>
                <th>Format</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
                for (Photo photo : photos) {
            %>
            <tr>
                <td><%= photo.getPhotoID() %></td>
                <td><%= photo.getTitle() %></td>
                <td><%= photo.getSizeKB() %></td>
                <td><%= photo.getFormat() %></td>
                <td>
                    <a href="updatephoto.jsp?photoID=<%= photo.getPhotoID() %>">
                        <img src="img/icons/Renew.png" alt="Update" class="icon">
                    </a> 
                    <a href="deletephoto.jsp?photoID=<%= photo.getPhotoID() %>">
                        <img src="img/icons/delete.png" alt="Delete" class="icon">
                    </a>
                    <a href="viewphoto.jsp?photoID=<%= photo.getPhotoID() %>">
                        <img src="img/icons/eye.png" alt="View" class="icon">
                    </a> 
                </td>
            </tr>
            <%
                }
            %>
        </tbody>
    </table>
</body>
</html>
