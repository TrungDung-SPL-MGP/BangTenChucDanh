<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.spl.bt.dto.Image" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }

        h1 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        img {
            max-width: 100px; /* Giới hạn chiều rộng hình ảnh */
            border-radius: 4px; /* Bo góc hình ảnh */
        }

        a {
            display: inline-block;
            margin-top: 20px;
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Image List</h1>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Image> imageList = (List<Image>) request.getAttribute("imageList");
                if (imageList != null && !imageList.isEmpty()) {
                    for (Image image : imageList) {
            %>
                        <tr>
                            <td><%= image.getId() %></td>
                            <td><%= image.getName() %></td>
                            <td>
                                <img src="data:image/jpeg;base64,<%= java.util.Base64.getEncoder().encodeToString(image.getFilephoto()) %>" alt="<%= image.getName() %>" />
                            </td>
                        </tr>
            <%
                    }
                } else {
            %>
                <tr>
                    <td colspan="3">No images found.</td>
                </tr>
            <%
                }
            %>
        </tbody>
    </table>
    <br>
    <a href="addimage.jsp">Add New Image</a>
</body>
</html>
