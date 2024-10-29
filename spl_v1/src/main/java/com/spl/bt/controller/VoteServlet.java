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
import java.util.List;


@WebServlet(name = "VoteServlet", urlPatterns = {"/vote"})
public class VoteServlet extends HttpServlet {

   
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Vote> data = VoteDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("vote", data);

        // Chuyển hướng đến trang JSP để sizelist.jsphiển thị danh sách người dùng
        request.getRequestDispatcher("views/vote/listvote.jsp").forward(request, response);
    }

}
