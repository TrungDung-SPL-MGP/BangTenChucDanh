<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Greeting</title>
</head>
<body>
    <h1>${greeting}</h1>
    <form action="/" method="get">
        <label for="lang">Select Language:</label>
        <select name="lang" id="lang">
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
        </select>
        <button type="submit">Change Language</button>
    </form>
</body>
</html>


