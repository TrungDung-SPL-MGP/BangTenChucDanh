<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Room Card Counts</title>
</head>
<body>
<h1>Room Card Counts</h1>
<table border="1">
    <tr>
        <th>Room ID</th>
        <th>Card Quantity</th>
    </tr>
    <c:forEach var="roomCardCount" items="${roomCardCounts}">
        <tr>
            <td>${roomCardCount.roomId}</td>
            <td>${roomCardCount.qty}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
