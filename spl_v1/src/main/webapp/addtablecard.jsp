<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Add New Size</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 10px;
        }

        h1 {
            color: #333;
        }

        table {
            width: 50%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 10px;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        input[type="text"] {
            width: calc(100% - 12px);
            padding: 8px;
            box-sizing: border-box;
        }

        input[type="submit"] {
            background-color: #4caf50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        a {
            text-decoration: none;
            color: #007bff;
        }

        a:hover {
            text-decoration: underline;
        }

        .error-message {
            color: red;
            margin-top: 5px;
        }
    </style>
    <script>
        function validateForm() {
            var id = document.forms["sizeForm"]["id"].value;
            var namecard = document.forms["sizeForm"]["namecard"].value;
            var idtemplate = document.forms["sizeForm"]["idtemplate"].value;
            var active = document.forms["sizeForm"]["active"].value;
            var battery = document.forms["sizeForm"]["battery"].value;

            // Kiểm tra xem có trường nào không được điền không
            if (id === "" || namecard === "" || idtemplate === "" || active === ""||battery==="") {
                alert("Cần điền đầy đủ thông tin vào tất cả các trường");
                return false;
            }

            // Kiểm tra xem width và height có phải là số không
            if (isNaN(width) || isNaN(height)) {
                alert("Chiều rộng và chiều cao phải là giá trị số");
                return false;
            }
            
             if (width <= 0 || height <= 0 || width >= 10000 || height >= 10000) {
                alert("Chiều rộng và chiều cao phải nằm trong khoảng từ 1 đến 9999");
                return false;
            }

            return true;
        }
    </script>
</head>
<body>
<center> <h1>Add Card</h1>

    <form name="tableForm" action="AddTableCardServlet" method="POST" onsubmit="return validateForm()">
        <table border="1">
            <tbody>
                <tr>
                    <td>ID:</td>
                    <td><input type="text" name="id" value="" /></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="namecard" value="" /></td>
                </tr>
                <tr>
                    <td>ID Template</td>
                    <td><input type="text" name="idtemplate" value="" /></td>
                </tr>
                <tr>
                    <td>Active:</td>
                    <td><input type="text" name="active" value="" /></td>
                </tr>
                <tr>
                    <td>Battery</td>
                    <td><input type="text" name="battery" value="" /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" value="Add Table"/></td>
                </tr>
            </tbody>
        </table>
    </form>

    <p><a href="table">Back to Size List</a></p>
    </center>
</body>
</html>
