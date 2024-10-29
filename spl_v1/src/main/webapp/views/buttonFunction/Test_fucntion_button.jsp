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
                var meeting_content = document.forms["roomForm"]["meeting_content"].value;
                var idroom = document.forms["roomForm"]["idroom"].value;
                var idcard = document.forms["roomForm"]["idcard"].value;
                var vote = document.forms["roomForm"]["vote"].value;
                

                // Kiểm tra xem có trường nào không được điền không
                if (id === "" || meeting_content === "" || idroom === "" || idcard === "" || vote === ""  ) {
                    alert("Cần điền đầy đủ thông tin vào tất cả các trường");
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
                        <td>ID Room</td>
                        <td><input type="text" name="id_room" value="" /></td>
                    </tr>
                    <tr>
                        <td>ID Card</td>
                        <td><input type="text" name="id_card" value="" /></td>
                    </tr>
                    <tr>
                        <td>Meeting Content</td>
                        <td><input type="text" name="name" value="" /></td>
                    </tr>
                    
                    <tr>
                        <td>Vote</td>
                        <td>
                            <select name="vote">
                                <option>Argee</option>
                                <option>Disargee</option>
                                <option>None</option>
                            </select></td>  
                    </tr>
                    
                    <tr>
                        <td>
                            <a href="meeting_content" style=" color: #333">Back</a>
                        </td>
                        <td class="add-button"><input type="submit" value="Send"/></td>
                    </tr>
                </tbody>
            </table>
        </form>


    </center>
</body>
</html>
