package com.spl.bt.controller;

import com.spl.bt.dao.TablecardDAO;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "DeleteTableCardServlet", urlPatterns = {"/DeleteTableCardServlet"})
public class DeleteTableCardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        deleteTablecard(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        deleteTablecard(request, response);
    }

    private void deleteTablecard(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");

        if (id == null || id.isEmpty()) {
            // Xử lý trường hợp ID không hợp lệ
            response.sendRedirect("error.jsp?message=Invalid Tablecard ID");
            return;
        }

        try {
            // Gọi DAO để xóa tablecard với ID đã cho
            boolean success = TablecardDAO.getInstance().deleteOne(id);

            if (success) {
                // Xóa thành công, chuyển hướng về trang danh sách tablecard
                response.sendRedirect("table");
            } else {
                // Xóa không thành công, chuyển hướng đến trang lỗi với thông báo phù hợp
                response.sendRedirect("error.jsp?message=Failed to delete Tablecard with ID " + id);
            }
        } catch (Exception e) {
            // Ghi log lỗi chi tiết cho debug
            e.printStackTrace();
            response.sendRedirect("error.jsp?message=An error occurred while deleting the Tablecard");
        }
    }
}
