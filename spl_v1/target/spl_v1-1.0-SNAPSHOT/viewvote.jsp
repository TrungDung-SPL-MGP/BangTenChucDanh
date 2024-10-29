<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }

        .container {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th, table td {
            text-align: left;
            padding: 10px;
            border: 1px solid #ddd;
        }

        table th {
            background-color: #f2f2f2;
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
        }

        .back-link:hover {
            background-color: #0056b3;
        }

        .error-message {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Vote Details</h1>

        <c:choose>
            <c:when test="${not empty vote}">
                <table>
                    <tr>
                        <th>ID</th>
                        <td>${vote.id}</td>
                    </tr>
                    <tr>
                        <th>Name Room</th>
                        <td>${vote.idroom}</td>
                    </tr>
                    <tr>
                        <th>Name Card</th>
                        <td>${vote.idcard}</td>
                    </tr>
                    <tr>
                        <th>Meeting Content</th>
                        <td>${vote.meetingcontent}</td>
                    </tr>
                    <tr>
                        <th>Vote</th>
                        <td>${vote.vote}</td>
                    </tr>
                    <tr>
                        <th>Vote Date</th>
                        <td>${vote.votedate}</td>
                    </tr>
                </table>
                <a href="vote" class="back-link">Back to Vote List</a>
            </c:when>

            <c:otherwise>
                <p class="error-message">No vote details available. Please try again.</p>
                <a href="vote" class="back-link">Back to Vote List</a>
            </c:otherwise>
        </c:choose>
    </div>
</body>
</html>
