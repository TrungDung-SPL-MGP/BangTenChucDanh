package com.spl.bt.controller;

import com.spl.bt.dao.LoginDAO;
import com.spl.bt.dto.User;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "UserListServlet", urlPatterns = {"/user"})
public class UserListServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lấy danh sách người dùng từ cơ sở dữ liệu
        List<User> data = LoginDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("userList", data);

        // Chuyển hướng đến trang JSP để hiển thị danh sách người dùng
        request.getRequestDispatcher("views/user/userList.jsp").forward(request, response);
    }
}
