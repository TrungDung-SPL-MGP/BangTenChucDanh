/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;

import com.spl.bt.dao.RoomDAO;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet(name = "DeleteRoomServlet", urlPatterns = {"/DeleteRoomServlet"})
public class DeleteRoomServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Lấy ID kích thước cần xóa từ request
            String id = request.getParameter("id");

            if (id != null && !id.isEmpty()) {
                // Thực hiện xóa kích thước với ID đã cho
                boolean success = RoomDAO.getInstance().deleteOne(id);

                if (success) {
                    // Nếu xóa thành công, chuyển hướng về trang danh sách kích thước (listsize.jsp)
                    response.sendRedirect("room");
                } else {
                    // Xử lý trường hợp xóa không thành công (có thể hiển thị thông báo lỗi)
                    response.sendRedirect("error.jsp"); // Chuyển hướng đến trang thông báo lỗi
                }
            } else {
                // Xử lý trường hợp dữ liệu không hợp lệ (ID không hợp lệ)
                response.sendRedirect("error.jsp"); // Chuyển hướng đến trang thông báo lỗi
            }
        } catch (Exception e) {
            // Xử lý ngoại lệ (có thể ghi log lỗi)
            e.printStackTrace();
            response.sendRedirect("error.jsp"); // Chuyển hướng đến trang thông báo lỗi
        }
    }
}
