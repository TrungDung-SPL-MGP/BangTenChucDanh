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
            font-size: 9px;
            background: #eeeeee;
            
        }

        h1 {
            color: #040404;
        }

        table {
            width: 50%;
            border-collapse: collapse;
            margin-top: 20px;
            border: none;
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
        .mau{
            
            color: #00000a;
        }
    </style>
    <script>
        function validateForm() {
            var id = document.forms["sizeForm"]["id"].value;
            var name = document.forms["sizeForm"]["name"].value;
            var width = document.forms["sizeForm"]["width"].value;
            var height = document.forms["sizeForm"]["height"].value;

            // Kiểm tra xem có trường nào không được điền không
            if (id === "" || name === "" || width === "" || height === "") {
                alert("All fields must be filled out completely");
                return false;
            }

            // Kiểm tra xem width và height có phải là số không
            if (isNaN(width) || isNaN(height)) {
                alert("Chiều rộng và chiều cao phải là giá trị số");
                return false;
            }
            
             if (width <= 0 || height <= 0 || width >= 1920 || height >= 1080) {
                alert("Max size width:1920& Max size height:1080");
                return false;
            }

            return true;
        }
    </script>
</head>
<body>
<center> <h1 class="mau">Add New Size</h1>

    <form name="sizeForm" action="AddSizeServlet" method="POST" onsubmit="return validateForm()">
        <table border="1">
            <tbody>
                <tr>
                    <td>ID:</td>
                    <td><input type="text" name="id" value="" /></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="name" value="" /></td>
                </tr>
                <tr>
                    <td>Width:</td>
                    <td><input type="text" name="width" value="" /></td>
                </tr>
                <tr>
                    <td>Height:</td>
                    <td><input type="text" name="height" value="" /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" value="Add Size"/></td>
                </tr>
            </tbody>
        </table>
    </form>

    <p><a href="size">Back to Size List</a></p>
    </center>
</body>
</html>
