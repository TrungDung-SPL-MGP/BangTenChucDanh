<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.spl.bt.dao.PhotoDAO" %>
<%@ page import="com.spl.bt.dto.Photo" %>
<%
    int photoID = Integer.parseInt(request.getParameter("photoID"));
    PhotoDAO photoDAO = new PhotoDAO();
    Photo photo = photoDAO.getPhotoById(photoID);

    if (photo == null) {
%>
<!DOCTYPE html>
<html>
<head>
    <title>Photo Not Found</title>
</head>
<body>
    <h1>Photo Not Found</h1>
    <p>The requested photo does not exist.</p>
    <a href="listphoto.jsp">Back to Photo List</a>
</body>
</html>
<%
    } else {
%>
<!DOCTYPE html>
<html>
<head>
    <title>View Photo</title>
    <style>
        img {
            width: 200px; /* Set the width to 200 pixels */
            height: 150px; /* Set the height to 150 pixels */
            object-fit: cover; /* Cover aspect ratio */
        }
    </style>
</head>
<body>
    <h1>View Photo Details</h1>
    <table border="1">
        <tr>
            <th>Photo ID</th>
            <td><%= photo.getPhotoID() %></td>
        </tr>
        <tr>
            <th>Title</th>
            <td><%= photo.getTitle() %></td>
        </tr>
        <tr>
            <th>Image</th>
            <td>
                <img src="img/uploads/<%= photo.getFilePath() %>" alt="Photo" />
                

            </td>
        </tr>
        <tr>
            <th>Size (KB)</th>
            <td><%= photo.getSizeKB() %></td>
        </tr>
        <tr>
            <th>Format</th>
            <td><%= photo.getFormat() %></td>
        </tr>
    </table>
    <br>
    
    <button class="button"><a href="listphoto.jsp">Back to Photo List</a></button>
</body>
</html>
<%
    }
%>
