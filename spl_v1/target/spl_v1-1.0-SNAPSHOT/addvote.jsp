<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Add New Vote</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                font-size: 14px;
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

            input[type="text"], select {
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

            .mau {
                color: #00000a;
            }
        </style>
        <script>
            function validateForm() {
                var id = document.forms["voteForm"]["id"].value;
                var idroom = document.forms["voteForm"]["idroom"].value;
                var idcard = document.forms["voteForm"]["idcard"].value;
                var meeting_content = document.forms["voteForm"]["meeting_content"].value;
                var vote = document.forms["voteForm"]["vote"].value;
                var vote_date = document.forms["voteForm"]["vote_date"].value;

                // Kiểm tra xem có trường nào không được điền không
                if (id === "" || idroom === "" || idcard === "" || meeting_content === "" || vote === ""|| vote_date === "") {
                    alert("All fields must be filled out completely");
                    return false;
                }

                return true;
            }
        </script>
    </head>
    <body>
    <center> 
        <h1 class="mau">Add New Vote</h1>

        
        <c:if test="${not empty error}">
            <p class="error-message">${error}</p>
        </c:if>

        <form name="voteForm" action="AddVoteServlet" method="POST" onsubmit="return validateForm()">
            <table border="1">
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td><input type="text" name="id" value="" /></td>
                    </tr>
                    <tr>
                        <td>Name Room:</td>
                        <td><input type="text" name="idroom" value="" /></td>
                    </tr>
                    <tr>
                        <td>Name Card:</td>
                        <td><input type="text" name="idcard" value="" /></td>
                    </tr>
                    <tr>
                        <td>Meeting Content:</td>
                        <td><input type="text" name="meeting_content" value="" /></td>
                    </tr>
                    <tr>
                        <td>Vote:</td>
                        <td>
                            <select name="vote">
                                <option value="1">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </td>  
                    </tr>
                    <tr>
                        <td >Date Vote: </td>
                        <td><input type="date" name="vote_date" value="" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" value="Add Vote"></td>
                    </tr>
                </tbody>
            </table>
        </form>

        <p><a href="vote">Back to Vote List</a></p>
    </center>
</body>
</html>
