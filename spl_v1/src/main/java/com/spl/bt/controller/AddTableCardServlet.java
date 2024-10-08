/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;

import com.spl.bt.dao.TablecardDAO;
import com.spl.bt.dto.Tablecard;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/AddTableCardServlet")
public class AddTableCardServlet extends HttpServlet {

    
 @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String id = request.getParameter("id");
        String namecard = request.getParameter("namecard");
        String idtemplate=request.getParameter("idtemplate");
        int active = Integer.parseInt(request.getParameter("active"));
        String battery = request.getParameter("battery");

        // Kiểm tra xem ID đã tồn tại chưa
        if (isIdExists(id)) {
            // Nếu ID đã tồn tại, gửi thông báo lỗi
            request.setAttribute("error", "Mã đã tồn tại. Vui lòng chọn một mã khác.");
            request.getRequestDispatcher("/addsize.jsp").forward(request, response);
            return;
        }

        // Tạo một đối tượng Size mới với dữ liệu
        Tablecard newCard = new Tablecard(id, namecard, idtemplate, active,battery);

        // Thêm kích thước mới
        String result = TablecardDAO.getInstance().addOne(newCard);

        if (result != null) {
            // Gửi thông báo thành công
            request.setAttribute("success", "Kích thước đã được thêm thành công.");

            // Chuyển hướng đến trang thành công hoặc danh sách các kích thước
            response.sendRedirect("table");
        } else {
            // Xử lý trường hợp thêm kích thước không thành công
            request.setAttribute("error", "Không thể thêm kích thước.");
            request.getRequestDispatcher("/addtablecard.jsp").forward(request, response);
        }
    }

    // Hàm kiểm tra xem ID đã tồn tại chưa
    private boolean isIdExists(String id) {
       
        return TablecardDAO.getInstance().getAllByTablecards(id) != null;
    }
}
