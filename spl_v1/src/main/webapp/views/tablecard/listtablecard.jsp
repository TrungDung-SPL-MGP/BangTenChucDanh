<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Table Card Manager</title>

    <!-- Bootstrap CSS and JavaScript -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #EEEEEE;
            font-size: 14px;
        }
        #striped-table {
            width: 100%;
            border-collapse: collapse;
        }
        #striped-table th, #striped-table td {
            border: hidden;
            padding: 8px;
            text-align: center;
        }
        #striped-table tbody tr:nth-child(odd) {
            background-color: #bfbfbf;
            color: #1f1f1f;
        }
        #striped-table tbody tr:nth-child(even) {
            background-color: #f0f5fa;
            color: #b1b1b1;
        }
        .icon-link {
            text-decoration: none;
            display: inline-block;
        }
        .icon-link img {
            filter: brightness(50%) contrast(100%);
            width: 20px;
            height: 20px;
            transition: transform 0.3s;
        }
        .icon-link img:hover {
            transform: scale(1.33);
        }
        .mau {
            color: #1f1f1f;
            font-weight: bold;
        }
        .active {
            color: green;
        }
        .inactive {
            color: red;
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .pagination a {
            margin: 0 5px;
            padding: 5px 10px;
            border: 1px solid #ddd;
            color: #333;
            text-decoration: none;
        }
        .pagination a.active {
            font-weight: bold;
            background-color: #ddd;
        }
        .pagination a:hover {
            background-color: #ccc;
        }
    </style>

    <script>
        let currentPage = 1;
        const rowsPerPage = 10;
        let filteredRows = [];

        // Function to paginate the table rows
        function paginateTable() {
            const rows = filteredRows;
            const totalRows = rows.length;
            const totalPages = Math.ceil(totalRows / rowsPerPage);

            // Hide all rows
            document.querySelectorAll("#striped-table tbody tr").forEach(row => row.style.display = "none");

            // Show only rows for the current page
            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            for (let i = start; i < end && i < totalRows; i++) {
                rows[i].style.display = "";
            }

            // Update pagination links
            updatePagination(totalPages);
        }

        // Function to update the pagination links
        function updatePagination(totalPages) {
            const paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = "";

            // Previous page button
            const prevButton = document.createElement("a");
            prevButton.href = "#";
            prevButton.textContent = "Prev";
            prevButton.onclick = () => goToPage(currentPage - 1);
            if (currentPage === 1) prevButton.style.display = "none";
            paginationContainer.appendChild(prevButton);

            // Page buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("a");
                pageButton.href = "#";
                pageButton.textContent = i;
                pageButton.onclick = () => goToPage(i);
                if (i === currentPage) pageButton.classList.add("active");
                paginationContainer.appendChild(pageButton);
            }

            // Next page button
            const nextButton = document.createElement("a");
            nextButton.href = "#";
            nextButton.textContent = "Next";
            nextButton.onclick = () => goToPage(currentPage + 1);
            if (currentPage === totalPages) nextButton.style.display = "none";
            paginationContainer.appendChild(nextButton);
        }

        // Function to go to a specific page
        function goToPage(page) {
            const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                paginateTable();
            }
        }

        // Function to handle search by ID
        function searchById() {
            const input = document.getElementById("searchInput").value.toLowerCase();
            filteredRows = [];
            const rows = document.querySelectorAll("#striped-table tbody tr");

            rows.forEach(row => {
                const idCell = row.cells[1].textContent.toLowerCase();
                if (idCell.includes(input)) {
                    filteredRows.push(row);
                }
            });

            // Reset to first page on new search
            currentPage = 1;
            paginateTable();
        }

        window.onload = function() {
            // Populate filteredRows with all rows on page load
            filteredRows = Array.from(document.querySelectorAll("#striped-table tbody tr"));
            paginateTable();
        };
    </script>
</head>
<body>
    <div class="container">
        <center><h1 class="mau">Table Card Manager</h1></center>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <a href="addtablecard.jsp" class="icon-link">
                <img src="img/icons/add.png" alt="Add Table Card" class="icon">
            </a>
            <input type="text" id="searchInput" onkeyup="searchById()" class="form-control" placeholder="Search by ID" style="max-width: 200px;">
        </div>

        <table id="striped-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name Card</th>
                    <th>ID Template</th>
                    <th>Active</th>
                    <th>Battery</th>
                    <th>Room</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${requestScope.table}" var="c" varStatus="loop">
                    <tr>
                        <td>${loop.index + 1}</td>
                        <td>${c.id}</td>
                        <td>${c.namecard}</td>
                        <td>${c.idtemplate}</td>
                        <td>
                            <span class="${c.active == 1 ? 'active' : 'inactive'}">
                                ${c.active == 1 ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td>
                            <img src="img/icons/${c.battery > 20 ? 'pin_green' : 'pin_red'}.png" alt="Battery Status" class="icon" style="width: 15px; height: 15px;">
                            ${c.battery}
                        </td>
                        <td>${c.idroom}</td>
                        <td>
                            <a href="ViewTableCardServlet?id=${c.id}" class="icon-link">
                                <img src="img/icons/eye.png" alt="View" class="icon">
                            </a>
                            <a href="DeleteTableCardServlet?id=${c.id}" onclick="return confirm('Are you sure you want to delete this table card?');" class="icon-link">
                                <img src="img/icons/delete.png" alt="Delete" class="icon">
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>

        <!-- Pagination -->
        <div id="pagination" class="pagination"></div>
    </div>
</body>
</html>
