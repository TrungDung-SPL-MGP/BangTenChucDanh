<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.spl.bt.dao.RoomDAO" %>
<%@ page import="com.spl.bt.dto.Room" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.IOException" %>

<%
    // Get the Room ID from the request
    String roomId = request.getParameter("id");
    RoomDAO roomDAO = RoomDAO.getInstance();
    Room room = roomDAO.getOne(roomId);
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Details</title>
    <link rel="stylesheet" href="styles.css"> <!-- Link to external CSS -->
    <style>
        /* Inline CSS for styling */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        table {
            width: 60%;
            margin: 6px auto;
            border-collapse: collapse;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            background-color: white;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #ddd;
            color: white;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        a {
            display: block;
            text-align: center;
            margin: 10px;
            text-decoration: none;
            color: white;
            background-color: #ddd;
            padding: 10px;
            border-radius: 5px;
            width: 100px;
            margin: 0 auto; /* Center the link */
        }

        a:hover {
            background-color: #f4f4f4;
        }
    </style>
    <script>
        // Show a welcome alert when the page loads
        window.onload = function() {
            alert("Welcome to the Room Details Page!");
        };
    </script>
</head>
<body>

<h1>Room Details</h1>

<% if (room != null) { %>
    <table>
        <tr>
            <th>ID</th>
            <td><%= room.getId() %></td>
        </tr>
        <tr>
            <th>Name</th>
            <td><%= room.getNameroom() %></td>
        </tr>
        <tr>
            <th>Template ID</th>
            <td><%= room.getIdtemplate() %></td>
        </tr>
        <tr>
            <th>Size ID</th>
            <td><%= room.getIdsize() %></td>
        </tr>
        <tr>
            <th>Date Start</th>
            <td><%= room.getDatestart() %></td>
        </tr>
        <tr>
            <th>Width</th>
            <td><%= room.getWidth() %></td>
        </tr>
        <tr>
            <th>Height</th>
            <td><%= room.getHeight() %></td>
        </tr>
        <tr>
            <th>Room Info</th>
            <td><%= room.getRoom() %></td>
        </tr>
    </table>
<% } else { %>
    <p>No room found with ID: <%= roomId %></p>
<% } %>

<a href="room">Back to Room List</a> <!-- Link back to room list if you have one -->

</body>
</html>
