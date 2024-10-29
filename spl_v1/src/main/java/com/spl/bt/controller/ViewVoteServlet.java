package com.spl.bt.controller;

import com.spl.bt.dao.VoteDAO;
import com.spl.bt.dto.Vote;
import java.io.IOException;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/ViewVoteServlet")
public class ViewVoteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Lấy tham số ID từ URL
        String id = request.getParameter("id");

        // Kiểm tra nếu ID không có hoặc rỗng
        if (id == null || id.trim().isEmpty()) {
            request.setAttribute("error", "Invalid vote ID.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
            return;
        }

        try {
            // Gọi DAO để lấy đối tượng Vote từ cơ sở dữ liệu theo ID
            Vote vote = VoteDAO.getInstance().getVoteById(id);

            if (vote != null) {
                // Nếu tìm thấy vote, đặt nó vào request scope và chuyển tiếp tới trang viewvote.jsp
                request.setAttribute("vote", vote);
                request.getRequestDispatcher("/viewvote.jsp").forward(request, response);
            } else {
                // Nếu không tìm thấy vote, đặt thông báo lỗi và chuyển tiếp tới trang lỗi
                request.setAttribute("error", "Vote not found.");
                request.getRequestDispatcher("/error.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            // In lỗi ra console để kiểm tra trong trường hợp lỗi SQL
            e.printStackTrace();

            // Nếu có lỗi khi lấy dữ liệu, đặt thông báo lỗi và chuyển tiếp tới trang lỗi
            request.setAttribute("error", "Error retrieving vote details. Please try again later.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Để xử lý POST requests, có thể chuyển hướng sang phương thức GET
        doGet(request, response);
    }
}
