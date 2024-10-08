<%-- 
    Document   : language
    Created on : Sep 30, 2024, 8:48:08 AM
    Author     : huyen
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

        <title>Language Selection</title>
        <style>
            body {
                padding: 20px;
                background-color: #f8f9fa;
            }
            .table th, .table td {
                text-align: center;
                vertical-align: middle;
            }
            .btn-custom {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            

            <div class="card shadow-sm">
                <div class="card-header">
                    <h2 class="h4 mb-0">Language Options</h2>
                </div>
                <div class="card-body p-0">
                    <table class="table table-striped table-hover mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Language</th>
                                <th>Country</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Vietnamese</td>
                                
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/320px-Flag_of_Vietnam.svg.png" alt="Vietnamese" width="24">
                                </td>

                                
                                <td>
                                    <a href="?lang=vi" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>English</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/320px-Flag_of_England.svg.png" alt="English" width="24">
                                </td>
                                <td>
                                    <a href="?lang=en" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>French</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png" alt="French" width="24">
                                </td>
                                <td>
                                    <a href="?lang=fr" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Spanish</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/320px-Flag_of_Spain.svg.png" alt="Spanish" width="24">
                                </td>
                                <td>
                                    <a href="?lang=es" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                             <tr>
                                <td>5</td>
                                <td>Japanese</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/320px-Flag_of_Japan.svg.png" alt="Japanese" width="24">
                                </td>
                                <td>
                                    <a href="?lang=ja" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Korean</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/320px-Flag_of_South_Korea.svg.png" alt="Korean" width="24">
                                </td>
                                <td>
                                    <a href="?lang=ko" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Chinese</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/320px-Flag_of_the_People%27s_Republic_of_China.svg.png" alt="Chinese" width="24">
                                </td>
                                <td>
                                    <a href="?lang=zh" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Thai</td>
                                <td>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/320px-Flag_of_Thailand.svg.png" alt="Thai" width="24">
                                </td>
                                <td>
                                    <a href="?lang=th" class="btn btn-success btn-sm">Choose</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
