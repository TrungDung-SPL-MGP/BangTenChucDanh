<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Add Photo</title>

        <style>

            .btn-black{
                color: #eee

            }
            .icon-link {
                text-decoration: none; /* loại bỏ gạch chân mặc định */
                display: inline-block;
                position: relative;
            }
        </style>
    </head>
    <body>
        <h1>Add a New Photo</h1>
        <form action="photos" method="post">
            <input type="hidden" name="action" value="add">

            <label>Title:</label>
            <input type="text" name="title" required><br><br>

            <label>File Path:</label>
            <input type="file" name="filePath" required><br><br>

            <label>Size (KB):</label>
            <input type="number" name="sizeKB" required><br><br>

            <label>Format:</label>
            <input type="text" name="format" required><br><br>

            <button type="submit">Add Photo</button>
        </form>
        <br>
        <button><a href="listphoto.jsp" class="icon-link">Back to Photo List</a></button>

    </body>
</html>
