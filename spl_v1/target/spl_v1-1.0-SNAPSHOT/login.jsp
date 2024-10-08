

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to system managemet table </title>
        <style>
            /* Reset default margin and padding */
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                overflow: hidden;
            }

            /* Style the intro container */
            .intro-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0; /* Background color for intro */
                animation: intro-animation 0.5s ease-in-out;
            }

            /* Style the intro image */
            .intro-image {
                max-width: 100%;
                max-height: 100%;
                opacity: 1; /* Initially visible */
                transition: opacity 0.5s ease-in-out;
            }

            /* Style the login container */
            .login-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0; /* Initially hidden */
                transition: opacity 0.5s ease-in-out;
                background: linear-gradient(to right, #ffffff 0%, #66ccff 100%);

            }
            /* Style the table */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0; /* Khoảng cách trên và dưới bảng */
                width: 100%; /* Độ rộng là 100% của phần tử chứa */
            }

            /* Set the height of the container div */
            .container {
                height: 400px; /* Chiều cao của phần tử chứa (điều này có thể thay đổi theo nhu cầu của bạn) */
            }

            /* Style table header (th) */
            th {
                background-color: #333; /* Màu nền cho header */
                color: #fff; /* Màu chữ cho header */
                padding: 1px; /* Khoảng cách bên trong ô */
                text-align: left; /* Căn lề văn bản theo trái */
                border: 1px solid #ddd; /* Viền */
            }

            /* Style table rows (tr) */
            tr {
                background-color: #fff; /* Màu nền cho các hàng chẵn */
                height: 100%; /* Chiều cao là 30% của phần tử chứa */
            }

            /* Style table cells (td) */
            td {
                padding: 20px; /* Khoảng cách bên trong ô */
                text-align: left; /* Căn lề văn bản theo trái */
                border: none;   /* Viền */
            }

            /* Style alternate rows with a different background color */
            tr:nth-child(even) {
                background-color: #fff; /* Màu nền cho các hàng lẻ */
            }

            /* Hover effect for table rows */
            tr:hover {
                background-color: #ccc; /* Màu nền khi di chuột qua hàng */
            }
            /* Style the Login button */
            .login-button {
                background-color: #4CAF50; /* Màu nền xanh lá */
                color: #fff;
                border: none;
                padding: 10px 40px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt mà */
            }

            /* Hover effect */
            .login-button:hover {
                background-color: #45a049; /* Màu xanh lá nhạt khi di chuột qua */
                transform: translateY(-5px); /* Dịch chuyển lên */
                box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Đổ bóng */
            }



        </style>
    </head>
    <body>

        <div class="intro-container">
            <img class="intro-image" src="img/logo/Favicon-SpaceLight-2023.png" alt="Intro Image">
        </div>

        <div class="login-container">
            <form action="LoginServlet" method="POST">
                <h1 style="text-align: center;">WELCOME TO SYSTEM</h1>
                <table >

                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input type="text" name="txtName" value="" /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" name="txtPassword" value="" /></td>
                        </tr>
                        <tr>

                            <td></td>
                            <td><button class="login-button">Login</button></td>
                        </tr>
                    </tbody>
                </table>

            </form>
        </div>


        <script>
            document.addEventListener("DOMContentLoaded", function () {
                // Delay showing the login container
                setTimeout(function () {
                    var introContainer = document.querySelector(".intro-container");
                    var introImage = document.querySelector(".intro-image");
                    var loginContainer = document.querySelector(".login-container");

                    // Hide the intro image
                    introImage.style.opacity = 0;

                    // Show the login container
                    loginContainer.style.opacity = 1;

                    // Remove the intro container
                    introContainer.style.display = "none";
                }, 1000); // 0.5 seconds
            });

        </script>
    </body>
</html>
