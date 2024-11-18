<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Add New Card</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 14px;
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
            var id = document.forms["tableForm"]["id"].value;
            var namecard = document.forms["tableForm"]["namecard"].value;
            var idtemplate = document.forms["tableForm"]["idtemplate"].value;
            var active = document.forms["tableForm"]["active"].value;
            var battery = document.forms["tableForm"]["battery"].value;
            var idroom = document.forms["tableForm"]["idroom"].value;

            // Kiểm tra xem có trường nào không được điền không
            if (id === "" || namecard === "" || idtemplate === "" || active === "" || battery === "" || idroom === "") {
                alert("Cần điền đầy đủ thông tin vào tất cả các trường");
                return false;
            }

            // Kiểm tra xem active có phải là số không và trong khoảng 0-1 không
            if (isNaN(active) || (active != 0 && active != 1)) {
                alert("Giá trị 'Active' phải là 0 hoặc 1.");
                return false;
            }

            return true;
        }
    </script>
</head>
<body>
<center>
    <h1>Add Card</h1>

    <form name="tableForm" action="AddTableCardServlet" method="POST" onsubmit="return validateForm()">
        <table border="1">
            <tbody>
                <tr>
                    <td>ID:</td>
                    <td><input type="text" name="id" value="" required /></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="namecard" value="" required /></td>
                </tr>
                <tr>
                    <td>ID Template:</td>
                    <td><input type="text" name="idtemplate" value="" required /></td>
                </tr>
                <tr>
                    <td>Active:</td>
                    <td><select name="active">
                            
                            <option>1</option>
                            <option>0</option>
                            
                        </select>
                    
                    </td>
                </tr>
                <tr>
                    <td>Battery:</td>
                    <td><input type="text" name="battery" value="" required /></td>
                </tr>
                <tr>
                    <td>ID Room:</td>
                    <td>
                        <select name="idroom">
                            
                            <option>PH01</option>
                            <option>PH02</option>
                            <option>PH03</option>
                            <option>PH04</option>
                            <option>PH05</option>
                            <option>PH06</option>
                            <option>PH07</option>
                            <option>PH08</option>
                            <option>PH09</option>
                            <option>PH10</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><input type="submit" value="Add Table"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <c:if test="${not empty error}">
                            <div class="error-message">${error}</div>
                        </c:if>
                        <c:if test="${not empty success}">
                            <div style="color: green;">${success}</div>
                        </c:if>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>

    <p><a href="table">Back to Size List</a></p>
</center>
</body>
</html>
