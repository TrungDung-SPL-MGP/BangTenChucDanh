

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <title>Add Photo</title>
    
    <style>

        body{

            font-family: Arial, Helvetica, sans-serif;
            background: #eeeeee;
            font-size: 10px;
            
        }
        .myclass{
            color: #002; 
        }
        .row{
            border: 1px darkgrey solid; 
            border-radius: 10px;
            width: 50%;
            margin: 0 auto;
            padding: 20px;
        }
        .container{
            
             margin-top: 10px;
        }
        .form-group{
            
            
        }
        .form-control{
            
            
        }
        .btn {
            
        }
        .btn-primary{
            
            
        }
        .col-sm-12{
            
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                    
                <div class="col-sm-12">

                    <h2 class="myclass">Add Photo</h2>
                    <form action="AddPhotoServlet" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label>ID</label> 
                            <input type="text" 
                                   class="form-control" name="id" placeholder="Id Photo">
                        </div>
                        <div class="form-group">
                            <label>Name Photo</label> 
                            <input type="text" 
                                   class="form-control" name="namephoto" placeholder="Name photo">
                        </div>

                        <div class="form-group">
                            <label>Photo</label> <br/>

                            <input type="file" class="form-control" name="filephoto" placeholder="File photo" accept=".jpg, .jpeg, .png">
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button type="reset" class="btn btn-primary">Cancel</button>
                    </form>
                </div>
                <a href="photo">Back</a>
            </div>
        </div>
    </body>
</html>
