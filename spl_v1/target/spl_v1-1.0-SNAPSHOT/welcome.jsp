<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:choose>
	<c:when test="${empty param.lang}">
		<f:setLocale value="en_US" scope="session" />
	</c:when>
	<c:otherwise>
		<f:setLocale value="${param.lang}" scope="session" />
		<c:set var="lang" value="${param.lang}" scope="session" />
	</c:otherwise>
</c:choose>
<f:setBundle basename="lang.Language" var="bundle" scope="session" />
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384-GLhlTQ8iWGi0qkuBjjAqJeftRXPFA8xFOopebF5tFfEIIJGtid+z7BfUPn2xN2lN" crossorigin="anonymous">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title> 
            language.title_welcome
        </title>
        <style>
            iframe{

                border: hidden;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1px;
                height: 50px;
                background-color: #eeeeee;
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 8px;
                border-top-left-radius: 2px;
                border-top-right-radius: 8px;

            }

            .logo {
                flex: 20%;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                padding: 4px 10px 1px;
                overflow: hidden; /* Ensures rounded corners overflow properly */
            }

            .logo img {
                width: 190px;
                height: 50px;
                display: block; /* Removes extra space below the image */
            }

            .title {
                text-align: center;
                flex: 70%;
                color:  #ff6600
            }

            .logout-button {
                text-align: right;
                flex: 10%;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            .logout-button button {
                padding: 4px 4px;
                border: none;
                border-radius: 5px;
                background-color: #ff3399; /* Green background color */
                color: white;
                cursor: pointer;
            }

            .logout-button button:hover {
                background-color: #FF0000; /* Darker green on hover */
            }

            .header button {
                background-color: #555;
                color: #f9f9f9;
                border: none;
                padding: 10px 30px;
                cursor: pointer;
            }


            body {
                font-family: Arial, Helvetica, sans-serif;
                background: #f2f2f2;
                font-size:10px;

            }
            .sidenav {
                height: calc(100% - 230px); /* Sử dụng calc để tính toán chiều cao, trừ đi chiều cao của header và footer */
                width: 20.2%;
                position: fixed;
                z-index: 1;
                top: 80px;
                left: 10px;
                bottom: 0px;
                background: #bfbfbf;
                overflow-x: hidden;
                padding-top: 20px;
            }

            /* Style the sidenav links and the dropdown button */
            .sidenav a, .dropdown-btn {
                padding: 6px 8px 6px 16px;
                text-decoration: none;
                font-size: 11px;
                font-family: Arial, Helvetica, sans-serif;
                color: #818181;
                display: block;
                border: none;
                background: none;
                width: 100%;
                text-align: left;
                cursor: pointer;
                outline: none;
            }

            /* On mouse-over */
            .sidenav a:hover, .dropdown-btn:hover {
                color: #f1f1f1;
            }

            /* Main content */
            .main {
                margin-left: 10px; /* Same as the width of the sidenav */
                font-size: 10px; /* Increased text to enable scrolling */
                padding: 10px 10px;

            }

            /* Thêm một class để xác định dropdown menu */
            .dropdown-content {
                display: none;
                padding-left: 8px;
            }

            /* Xóa class active, nếu không cần thiết */
            .active {
                background-color: green;
                color: white;
            }

            /* Sử dụng pseudo-class :hover để hiển thị dropdown menu khi di chuột qua */
            .dropdown-btn:hover + .dropdown-content {
                display: block;
            }

            /* Đảm bảo menu dropdown không bị ẩn đi khi hover trên nó */
            .dropdown-content:hover {
                display: block;
            }
            .footer {
                position: relative;
                width: 98%;
                background: #bfbfbf;
                color: white;
                text-align: center;
                padding: 10px;
                height: 100px;
                align-items: center;
                /*box-sizing: border-box;*/
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;/* Bao gồm padding trong chiều rộng và chiều cao tổng cộng */
            }

            /* CSS cho hình ảnh */
            .footer img {
                float: right;
                max-height: 100%; /* Hạn chế chiều cao tối đa của hình ảnh theo chiều cao của phần tử cha */
                max-width: 100%;
                display: block;
                margin: auto;
                margin-left: 40px
            }
            /*#toggleSidebar {
                /* Your button styles 
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: #111;
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
            }*/
           .gradient-text {
    background: linear-gradient(to top, #ff3399 0%, #ffcc66 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}
            /* Style The Dropdown Button */
            .dropbtn {
                background-color: rgb(128,128,128);
                color: white;
                padding: 14px;
                font-size: 14px;
                border: none;
                cursor: pointer;
                font-family: Arial, Helvetica, sans-serif;
            }


            ul {
                list-style-type: none;
                margin: 10px;
                padding: 0;
                overflow: hidden;
                background-color: #f0f0f0;
            }

            li {
                float: left;
            }

            li a, .dropbtn {
                display: inline-block;
                color: #f1f1f1;
                text-align: center;
                padding: 10px 10px;
                text-decoration: none;
                font-size: 10px;
                font-family: Arial, Helvetica, sans-serif;

            }

            li a:hover, .dropdown:hover .dropbtn {
                background:#bfbfbf;
            }

            li.dropdown {
                display: inline-block;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                font-size: 10px;
            }

            .dropdown-content a {
                color: black;
                padding: 10px 10px;
                text-decoration: none;
                display: block;
                text-align: left;
            }

            .dropdown-content a:hover {
                background-color: #f1f1f1;
            }

            .dropdown:hover .dropdown-content {
                display: block;
            }
            .background{
                margin: 10px;

            }
           
        </style>
        <script>
            var dropdown = document.getElementsByClassName("dropdown-btn");
            var i;

            for (i = 0; i < dropdown.length; i++) {
                dropdown[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var dropdownContent = this.nextElementSibling;
                    if (dropdownContent.style.display === "block") {
                        dropdownContent.style.display = "none";
                    } else {
                        dropdownContent.style.display = "block";
                    }
                });
            }

            /**
             * JavaScript cho chức năng đăng xuất
             * 
             * @description
             * Thực hiện đăng xuất người dùng
             * 
             * @returns {undefined}
             */
            function logout() {
                // Thực hiện đăng xuất tại đây
                alert("Bạn đã đăng xuất thành công!");
                window.location.href = "login.jsp";
            }
            function loadIframe(page) {
                var iframe = document.getElementById("myIframe");
                if (page === 'room') {
                    iframe.src = 'room';
                } else if (page === 'device') {
                    iframe.src = 'device';
                } else if (page === 'table') {
                    iframe.src = 'table';
                } else if (page === 'photo') {
                    iframe.src = 'listphoto.jsp';
                } else if (page === 'size') {
                    iframe.src = 'size';
                } else if (page === 'user') {
                    iframe.src = 'user';
                } else if (page === 'contact') {
                    iframe.src = 'admincontact';
                } else if (page === 'help') {
                    iframe.src = 'views/test/Template/template.html';
                } else if (page === 'language') {
                    iframe.src = 'views/language/language.jsp';
                }
            }
            var currentYear = new Date().getFullYear();

            // Hiển thị năm trong phần tử có id "currentYear"
            document.addEventListener("DOMContentLoaded", function () {
                var currentYear = new Date().getFullYear();
                document.getElementById("currentYear").textContent = currentYear;
            });

            $(document).ready(function () {
                $("#toggleSidebar").click(function () {
                    $("#mySidebar").toggle("collapsed");
                });
            });
        </script>
    </head>
    <body>


        <div class="header" style=" padding: 4px 4px">
            <div class="logo">
                <img src="img/logo/coresys.png" alt="cr"/>
            </div>
            <div>
                <ul>
                    <li class="dropdown">



                        <a href="welcome.jsp" style="background:  #818181"><i class="fa fa-home"></i></a>

                    </li>  
                    <li class="dropdown">

                        <button class="dropbtn">
                            <i class="fa fa-calendar"></i> Meeting room management 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="javascript:void(9);" onclick="loadIframe('room')">
                                <i class="fa fa-calendar"></i> Meeting room list
                            </a>
                        </div>


                    </li>
                    <li class="dropdown">

                        <button class="dropbtn">
                            <i class="fa fa-cogs"></i>
                            Device management 

                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="javascript:void(0);" onclick="loadIframe('device')">
                                <i class="fa fa-laptop"></i> Device management AP
                            </a>
                            <a href="javascript:void(1);" onclick="loadIframe('table')">
                                <i class="fa fa-credit-card"></i> Table Card management
                            </a>
                        </div>


                    </li>
                    <li class="dropdown">

                        <button class="dropbtn">
                            <i class="fa fa-file-text-o"></i> 
                            Manage templates 

                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="javascript:void(3);" onclick="loadIframe('photo')">
                                <i class="fa fa-image"></i> Template list
                            </a>
                        </div>


                    </li>
                    <li class="dropdown">

                        <button class="dropbtn">
                            <i class="fa fa-ellipsis-h"></i> 
                            More 

                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="javascript:void(4);" onclick="loadIframe('size')">
                                <i class="fa fa-ticket"></i> Size Manage
                            </a>
                            <a href="javascript:void(5);" onclick="loadIframe('user')">
                                <i class="fa fa-user"></i> Account Manage
                            </a>

                            <a href="javascript:void(6);" onclick="loadIframe('contact')">
                                <i class="fa fa-phone"></i> Contact
                            </a>
                            <a href="javascript:void(7);" onclick="loadIframe('help')">
                                <i class="fa fa-question-circle"></i> Help
                            </a>
                            <a href="javascript:void(8);" onclick="loadIframe('language')">
                                <i class="fa fa-language"></i> Language
                            </a>



                    </li>

                </ul>



            </div>






            <div class="logout-button">
                <button onclick="logout()">Logout</button>
            </div>
        </div>






        <div class="main">


            <iframe id="myIframe" style="height: 666px;width:100%;" title="Iframe Example"></iframe>

        </div>

        <div class="footer">
            <p>&copy; 2014-<span id="currentYear"></span> <b style="font-size: 16px">Space Light. All rights reserved</b>
                <img src="img/logo/Logo-SpaceLight-2023_New.png" width="150" height="100" alt="Logo-SpaceLight-2023"/>

            </p>


        </div>
    </body>
</html>
