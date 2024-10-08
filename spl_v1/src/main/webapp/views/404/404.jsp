<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" +
            request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<%
    response.setStatus(200);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>Error Page</title>
</head>
<body>
    <div>
        <table>
            <tr>
                <th><h1>404</h1></th>
                <th><h1>!</h1></th>
                <th><h1>Page Not Found!</h1></th>
            </tr>
            <tr>
                <td>Please click</td>
                <td style="color:red;"><a href="javascript:returnIndex();">here</a></td>
                <td>to try again.</td>
            </tr>
        </table>
    </div>
    <script src="assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        function returnIndex() {
            var user = $(".username").html();
            if (self.frameElement && self.frameElement.tagName === "IFRAME") {
                if (!user || user.trim() === "") {
                    window.parent.location.href = "login.jsp";
                }
                window.parent.location.href = "login.jsp";
            } else {
                if (!user || user.trim() === "") {
                    window.location.href = "login.jsp";
                } else {
                    window.location.href = "welcome.jsp";
                }
            }
        }
    </script>
</body>
</html>
