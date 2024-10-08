

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Update System</title>
    </head>
    <script>

        function logout() {
            // Thực hiện đăng xuất tại đây
            alert("Go to Home!");
            window.location.href = "/spl_v1/table   ";
        }
    </script>

    <body>

        <div class="header">
            <h1>You can't delete</h1>
            <h2>Please contact the developer to upgrade the functionality.Thanks you</h2>
            <button onclick="logout()">Back to Home</button>
        </div>
    </body>
</html>
