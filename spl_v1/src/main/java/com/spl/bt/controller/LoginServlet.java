package com.spl.bt.controller;

import com.spl.bt.dao.LoginDAO;
import com.spl.bt.dto.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("txtName");
        String password = request.getParameter("txtPassword");

        LoginDAO loginDAO = LoginDAO.getInstance();
        User user = loginDAO.authenticate(username, password);

        if (user != null) {
            
            HttpSession session = request.getSession();
            session.setAttribute("user", user);

           
            response.sendRedirect("welcome.jsp");   
        } else {
            // Đăng nhập thất bại
            response.getWriter().println("Logon failure. Please check your username and password.");
            response.sendRedirect("login.jsp");
        }
    }
}
