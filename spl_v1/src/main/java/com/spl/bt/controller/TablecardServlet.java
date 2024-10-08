package com.spl.bt.controller;

import com.spl.bt.dao.TablecardDAO;
import com.spl.bt.dto.Tablecard;
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;


@WebServlet(name = "TablecardServlet", urlPatterns = {"/table"})
public class TablecardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Tablecard> data = TablecardDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("table", data);

        // Chuyển hướng đến trang JSP để sizelist.jsphiển thị danh sách người dùng
        request.getRequestDispatcher("/views/tablecard/listtablecard.jsp").forward(request, response);
        int currentStatus = Integer.parseInt(request.getParameter("currentStatus"));

        // Thực hiện logic cập nhật trạng thái tại đây (ví dụ: đảo ngược trạng thái)
        int newStatus = (currentStatus == 0) ? 1 : 0;

        // Cập nhật giá trị c.active
        // Điều này tùy thuộc vào cách bạn quản lý dữ liệu trạng thái trên máy chủ
        // Trả về trạng thái mới
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(String.valueOf(newStatus));
    }

}
