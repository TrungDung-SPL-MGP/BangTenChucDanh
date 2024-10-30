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
            body{

                font-family: Arial, Helvetica, sans-serif;
                background: #f2f2f2;
                font-size: 10px;
            }
             
            #striped-table {
                width: auto;
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
        <h1>Photo List</h1>
        <a href="addphoto.jsp">

            <img src="img/icons/add.png" alt="Add" class="icon" style="cursor: pointer;width: 15px; height: 15px;">
        </a><br><br>

        <table id="striped-table" border="1">
            <tr>
                <th>Photo ID</th>
                <th>Title</th>
                <th>Size (KB)</th>
                <th>Format</th>
                <th>Actions</th>
            </tr>
            <%
                for (Photo photo : photos) {
            %>
            <tr>
                <td><%= photo.getPhotoID() %></td>
                <td><%= photo.getTitle() %></td>
                <td><%= photo.getSizeKB() %></td>
                <td><%= photo.getFormat() %></td>
                <td>
                    <a href="updatephoto.jsp?photoID=<%= photo.getPhotoID() %>" class="icon-link">
                        <img src="img/icons/Renew.png" alt="Update" class="icon" style="cursor: pointer;width: 15px; height: 15px;">

                    </a> 
                    <a href="deletephoto.jsp?photoID=<%= photo.getPhotoID() %>" class="icon-link">
                        <img src="img/icons/delete.png" alt="Delete" class="icon" style="cursor: pointer;width: 15px; height: 15px;">
                    </a>
                    <a href="viewphoto.jsp?photoID=<%= photo.getPhotoID() %>" class="icon-link">
                        <img src="img/icons/eye.png" alt="View" class="icon" style="cursor: pointer;width: 15px; height: 15px;">
                    </a> 
                </td>
            </tr>
            <%
                }
            %>
        </table>
    </body>
</html>

