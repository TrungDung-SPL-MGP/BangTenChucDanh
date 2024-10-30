

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Update System</title>
   
    <script>

        function logout() {
            // Thực hiện đăng xuất tại đây
            alert("Go to Home!");
            window.location.href = "welcome.jsp";
        }
    </script>
 </head>
    <body>

        <div class="header">
            <h1>Hello!!!</h1>
            <h2>Please contact the developer to upgrade the functionality.Thanks you</h2>
            <button onclick="logout()">Back to Home</button>
        </div>
    </body>
</html>
