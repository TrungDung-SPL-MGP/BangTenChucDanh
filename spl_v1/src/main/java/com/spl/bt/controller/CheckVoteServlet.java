/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;

import com.spl.bt.dao.VoteDAO;
import com.spl.bt.dto.Vote;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/CheckVoteServlet")
public class CheckVoteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("id");

        try {
            Vote vote = VoteDAO.getInstance().getVoteById(id);

            if (vote != null) {
                request.setAttribute("vote", vote);
                request.getRequestDispatcher("/viewvote.jsp").forward(request, response);
            } else {
                request.setAttribute("error", "Không tìm thấy thông tin bình chọn với ID: " + id);
                request.getRequestDispatcher("/error.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("error", "Lỗi khi kiểm tra thông tin bình chọn.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
}
