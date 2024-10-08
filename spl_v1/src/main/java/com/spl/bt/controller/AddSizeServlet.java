package com.spl.bt.controller;

import com.spl.bt.dao.SizeDAO;
import com.spl.bt.dto.Size;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/AddSizeServlet")
public class AddSizeServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String id = request.getParameter("id");
        String namesize = request.getParameter("name");
        int width = Integer.parseInt(request.getParameter("width"));
        int height = Integer.parseInt(request.getParameter("height"));

        // Kiểm tra xem ID đã tồn tại chưa
        if (isIdExists(id)) {
            // Nếu ID đã tồn tại, gửi thông báo lỗi
            request.setAttribute("error", "Mã đã tồn tại. Vui lòng chọn một mã khác.");
            request.getRequestDispatcher("/addsize.jsp").forward(request, response);
            return;
        }

        // Tạo một đối tượng Size mới với dữ liệu
        Size newSize = new Size(id, namesize, width, height);

        // Thêm kích thước mới
        String result = SizeDAO.getInstance().addOne(newSize);

        if (result != null) {
            // Gửi thông báo thành công
            request.setAttribute("success", "Kích thước đã được thêm thành công.");

            // Chuyển hướng đến trang thành công hoặc danh sách các kích thước
            response.sendRedirect("size");
        } else {
            // Xử lý trường hợp thêm kích thước không thành công
            request.setAttribute("error", "Không thể thêm kích thước.");
            request.getRequestDispatcher("/addtablecard.jsp").forward(request, response);
        }
    }

    // Hàm kiểm tra xem ID đã tồn tại chưa
    private boolean isIdExists(String id) {
       
        return SizeDAO.getInstance().getAllBySizes(id) != null;
    }
}
