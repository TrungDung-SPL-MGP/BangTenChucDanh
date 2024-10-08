<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Update Room</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            text-align: center;
            margin-top: 50px;
        }

        .message {
            color: red;
            margin-bottom: 10px;
        }

        .success {
            color: green;
            margin-bottom: 10px;
        }

        form {
            margin-top: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input {
            margin-bottom: 10px;
            width: 300px; /* Adjust the width as needed */
        }

        button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Update Room</h2>

    <div class="message">
        <% String error = (String) request.getAttribute("error"); %>
        <% if (error != null && !error.isEmpty()) { %>
            <%= error %>
        <% } %>
    </div>

    <div class="success">
        <% String success = (String) request.getAttribute("success"); %>
        <% if (success != null && !success.isEmpty()) { %>
            <%= success %>
        <% } %>
    </div>

    <form action="UpdateRoomServlet" method="post">
        
        <label for="id">ID:</label>
        <input type="text" name="id" value="<%= request.getParameter("id") %>">
        
        <label for="nameroom">Name Room:</label>
        <input type="text" id="nameroom" name="nameroom" value="${c.nameroom}" required>

        <label for="idtemplate">ID Template:</label>
        <input type="text" id="idtemplate" name="idtemplate" value="<%= request.getParameter("idtemplate") %>" required>

        <label for="idsize">ID Size:</label>
        <input type="text" id="idsize" name="idsize" value="<%= request.getParameter("idsize") %>" required>

        <label for="datestart">Date start:</label>
        <input type="text" id="datestart" name="datestart" value="<%= request.getParameter("datestart") %>" required>

        <label for="width">Width (cm):</label>
        <input type="text" id="width" name="width" value="<%= request.getParameter("width") %>" required>

        <label for="height">Height (cm):</label>
        <input type="text" id="height" name="height" value="<%= request.getParameter("height") %>" required>

        <label for="room">Room:</label>
        <input type="text" id="room" name="room" value="<%= request.getParameter("room") %>" required>

        <label for="qty">Qty:</label>
        <input type="text" id="qty" name="qty" value="<%= request.getParameter("qty") %>" required>

        <button type="submit">Update</button>
    </form>
        
</div>

</body>
</html>
