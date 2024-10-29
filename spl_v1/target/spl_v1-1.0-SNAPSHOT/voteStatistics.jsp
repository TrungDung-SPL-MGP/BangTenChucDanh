`f<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Vote Statistics</title>
</head>
<body>
    <h1>Vote Statistics by Room</h1>
    
    <c:if test="${not empty voteStatistics}">
        <table border="1">
            <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Total Votes</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="entry" items="${voteStatistics}">
                    <tr>
                        <td>${entry.key}</td>
         <td>${entry.value}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </c:if>

    <c:if test="${not empty error}">
        <p style="color:red;">${error}</p>
    </c:if>
</body>
</html>
