/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;


import com.spl.bt.dao.SizeDAO;
import com.spl.bt.dto.Size;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


@WebServlet("/UpdateSizeServlet")
public class UpdateSizeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get form parameters
        String id = request.getParameter("id");
        String namesize = request.getParameter("namesize");
        int width = Integer.parseInt(request.getParameter("width"));
        int height = Integer.parseInt(request.getParameter("height"));

        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            // SQL Server connection string
            String dbURL = "jdbc:sqlserver://localhost:1433;databaseName=bangten;encrypt=true;trustServerCertificate=true;";
            String user = "sa";
            String pass = "123456";

            // Load SQL Server JDBC driver
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            // Establish connection
            conn = DriverManager.getConnection(dbURL, user, pass);

            // SQL query to update the size
            String sql = "UPDATE sizes SET namesize = ?, width = ?, height = ? WHERE id = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, namesize);
            stmt.setInt(2, width);
            stmt.setInt(3, height);
            stmt.setString(4, id);

            // Execute the update
            int rowsUpdated = stmt.executeUpdate();

            if (rowsUpdated > 0) {
                // Redirect to a success page
                response.sendRedirect("sizeDetails.jsp?id=" + id);
            } else {
                // Handle failure
                response.getWriter().println("Update failed. Please try again.");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            response.getWriter().println("An error occurred: " + e.getMessage());
        } finally {
            // Close resources
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}