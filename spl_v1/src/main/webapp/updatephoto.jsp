<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.spl.bt.dao.PhotoDAO" %>
<%@ page import="com.spl.bt.dto.Photo" %>
<%
    int photoID = Integer.parseInt(request.getParameter("photoID"));
    PhotoDAO photoDAO = new PhotoDAO();
    Photo photo = photoDAO.getPhotoById(photoID);
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Update Photo</title>
        <style>
            .btn-black{
                color: #eee
                
            }
            .icon-link {
                text-decoration: none; /* loại bỏ gạch chân mặc định */
                display: inline-block;
                position: relative;
            }
        </style>
    </head>
    <body>
        <h1>Update Photo</h1>
        <form action="photos" method="post">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="photoID" value="<%= photo.getPhotoID() %>">

            <label>Title:</label>
            <input type="text" name="title" value="<%= photo.getTitle() %>" required><br><br>

            <label>File Path:</label>
            <input type="text" name="filePath" value="<%= photo.getFilePath() %>" required><br><br>

            <label>Size (KB):</label>
            <input type="number" name="sizeKB" value="<%= photo.getSizeKB() %>" required><br><br>

            <label>Format:</label>
            <input type="text" name="format" value="<%= photo.getFormat() %>" required><br><br>

            <button type="submit" style="background: #007bff">Update Photo</button>
        </form>
            <br>
            <br>
            <button class="btn-back"> <a href="listphoto.jsp" class="icon-link">Back to Photo List</a></button>
    </body>
</html>

