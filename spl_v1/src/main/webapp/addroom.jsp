<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Add New Room</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                font-size: 9px;
                background: #eeeeee;
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
                var id = document.forms["roomForm"]["id"].value;
                var name = document.forms["roomForm"]["name"].value;
                var idtemplate = document.forms["roomForm"]["idtemplate"].value;
                var idsize = document.forms["roomForm"]["idsize"].value;
                var datestart = document.forms["roomForm"]["datestart"].value;
                var width = document.forms["roomForm"]["width"].value;
                var height = document.forms["roomForm"]["height"].value;
                var room = document.forms["roomForm"]["room"].value;
                var qty = document.forms["roomForm"]["qty"].value;

                // Kiểm tra xem có trường nào không được điền không
                if (id === "" || name === "" || idtemplate === "" || room === "" || qty === "" || datestart === "" || idsize === "" || width === "" || height === "" || ) {
                    alert("Cần điền đầy đủ thông tin vào tất cả các trường");
                    return false;
                }

                // Kiểm tra xem width và height có phải là số không
                if (isNaN(width) || isNaN(height) || isNaN(qty)) {
                    alert("Chiều rộng và chiều cao phải là giá trị số");
                    return false;
                }

                if (width <= 0 || height <= 0 || width >= 10000 || height >= 10000 || qty <= 0) {
                    alert("Chiều rộng và chiều cao phải nằm trong khoảng từ 1 đến 9999");
                    return false;
                }

                return true;
            }
        </script>
    </head>
    <body>
    <center> <h1>Add Table Card</h1>

        <form name="roomForm" action="AddRoomServlet" method="POST" onsubmit="return validateForm()">
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
                        <td>ID Template:</td>
                        <td><input type="text" name="idtemplate" value="" /></td>
                    </tr>
                    <tr>
                        <td>ID Size:</td>
                        <td>
                            <select name="idsize">
                                <option>1600x900</option>
                                <option>1200x650</option>
                                <option>800x480</option>
                            </select></td>  
                    </tr>
                    <tr>
                        <td >Date: </td>
                        <td><input type="date" name="datestart" value="" /></td>
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
                        <td>Room</td>
                        <td><input type="text" name="room" value="" /></td>
                    </tr>

                    <tr>
                        <td>Qty</td>
                        <td><input type="text" name="qty" value="" /></td>
                    </tr>
                    <tr>
                        <td>
                            <a href="room" style=" color: #333">Back</a>
                        </td>
                        <td class="add-button"><input type="submit" value="Add Room"/></td>
                    </tr>
                </tbody>
            </table>
        </form>


    </center>
</body>
</html>
