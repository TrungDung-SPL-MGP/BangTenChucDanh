<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Image</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }

        h1 {
            color: #333;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #28a745;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #218838;
        }
    </style>
    <script>
        // Thêm một sự kiện để kiểm tra kích thước tệp hình ảnh trước khi gửi biểu mẫu
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelector('form').addEventListener('submit', function(event) {
                const fileInput = document.querySelector('input[type="file"]');
                const file = fileInput.files[0];

                if (file) {
                    const maxSize = 2 * 1024 * 1024; // Giới hạn 2MB
                    if (file.size > maxSize) {
                        alert("File size exceeds 2MB. Please select a smaller image.");
                        event.preventDefault(); // Ngăn gửi biểu mẫu
                    }
                }
            });
        });
    </script>
</head>
<body>
    <h1>Add Image</h1>
    <form action="ImageServlet" method="post" enctype="multipart/form-data">
        <label for="name">Image Name:</label>
        <input type="text" name="name" required>
        <br><br>
        <label for="image">Select Image:</label>
        <input type="file" name="image" accept="image/*" required>
        <br><br>
        <button type="submit">Upload Image</button>
    </form>
    <br>
    <a href="ImageServlet">View Image List</a>
</body>
</html>
