<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Update Size</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h2 {
            color: #333;
        }
        form {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: auto;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input[type="text"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"], 
        .back-button {
            background-color: #5cb85c;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px;
            cursor: pointer;
            width: 50%;
            margin-top: 10px;
        }
        input[type="submit"]:hover, 
        .back-button:hover {
            background-color: #4cae4c;
        }
        .back-button {
            background-color: #ccc  ; /* Different color for the back button */
        }
        .back-button:hover {
            background-color: #FF0000; /* Hover color for the back button */
        }
        .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <h2>Update Size</h2>

    <form action="UpdateSizeServlet" method="post">
        <label for="id">Size ID:</label>
        <input type="text" id="id" name="id" value="${size.id}" readonly>
        
        <label for="namesize">Name:</label>
        <input type="text" id="namesize" name="namesize" value="${size.namesize}">
        
        <label for="width">Width:</label>
        <input type="text" id="width" name="width" value="${size.width}">
        
        <label for="height">Height:</label>
        <input type="text" id="height" name="height" value="${size.height}">
        
        <div class="button-container">
            <input type="submit" value="Update">
            <a href="size" class="back-button">Back</a> 
        </div>
    </form>
</body>
</html>
