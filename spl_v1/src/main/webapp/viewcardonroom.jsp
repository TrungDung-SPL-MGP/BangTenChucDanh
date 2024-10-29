<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.spl.bt.dto.RoomCardCount" %> <!-- Thay thế "yourpackage" bằng tên package của lớp RoomCardCount -->

<html>
<head>
    <title>Room Card Count</title>
</head>
<body>
    <h2>Quantity of Tablecards in Each Room</h2>

    <%
        // Lấy danh sách RoomCardCount từ Servlet
        List<RoomCardCount> roomCardCounts = (List<RoomCardCount>) request.getAttribute("roomCardCounts");
        
        if (roomCardCounts != null && !roomCardCounts.isEmpty()) {
    %>
        <table border="1">
            <tr>
                <th>ID Room</th>
                <th>Quantity of Tablecards</th>
            </tr>

            <% for (RoomCardCount roomCardCount : roomCardCounts) { %>
                <tr>
                    <td><%= roomCardCount.getIdRoom() %></td>
                    <td><%= roomCardCount.getQty() %></td>
                </tr>
            <% } %>
        </table>
    <% 
        } else { 
    %>
        <p>No data available for room card counts.</p>
    <% 
        } 
    %>
</body>
</html>
