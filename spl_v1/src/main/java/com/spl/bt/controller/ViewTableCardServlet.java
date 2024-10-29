package com.spl.bt.controller;

import com.spl.bt.dao.TablecardDAO;
import com.spl.bt.dto.Tablecard;
import java.io.IOException;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/ViewTableCardServlet")
public class ViewTableCardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Lấy tham số ID từ URL
        String id = request.getParameter("id");

        // Kiểm tra nếu ID không có hoặc rỗng
        if (id == null || id.trim().isEmpty()) {
            request.setAttribute("error", "Invalid card ID.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
            return;
        }

        try {
            // Lấy dữ liệu từ TablecardDAO
            Tablecard card = TablecardDAO.getInstance().getCardById(id);

            // Nếu tìm thấy card, truyền dữ liệu vào request và chuyển tiếp tới viewtablecard.jsp
            if (card != null) {
                request.setAttribute("card", card);
                request.getRequestDispatcher("/viewtablecard.jsp").forward(request, response);
            } else {
                // Nếu không tìm thấy, đặt thông báo lỗi
                request.setAttribute("error", "Card not found.");
                request.getRequestDispatcher("/error.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            // Log ngoại lệ và hiển thị thông báo lỗi
            Logger.getLogger(ViewTableCardServlet.class.getName()).log(Level.SEVERE, null, e);
            request.setAttribute("error", "Error retrieving card details. Please try again later.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Để xử lý POST requests, chuyển hướng sang phương thức GET
        doGet(request, response);
    }
}
