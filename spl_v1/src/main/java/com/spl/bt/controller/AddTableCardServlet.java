package com.spl.bt.controller;

import com.spl.bt.dao.TablecardDAO;
import com.spl.bt.dao.RoomDAO;
import com.spl.bt.dto.Room;
import com.spl.bt.dto.Tablecard;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "AddTableCardServlet", urlPatterns = {"/AddTableCardServlet"})
public class AddTableCardServlet extends HttpServlet {

    @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            // Lấy danh sách các phòng từ RoomDAO
            List<Room> roomList = RoomDAO.getInstance().getAllRooms();

            // Đưa danh sách phòng vào request
            request.setAttribute("roomList", roomList);

            // Chuyển hướng tới trang thêm tablecard (addtablecard.jsp)
            request.getRequestDispatcher("addtablecard.jsp").forward(request, response);
        }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Lấy dữ liệu từ form
            String id = request.getParameter("id");
            String namecard = request.getParameter("namecard");
            String idtemplate = request.getParameter("idtemplate");
            int active = Integer.parseInt(request.getParameter("active"));
            String battery = request.getParameter("battery");
            String idroom = request.getParameter("idroom");

            // Tạo đối tượng Tablecard
            Tablecard tablecard = new Tablecard(id, namecard, idtemplate, active, battery, idroom);

            // Lưu vào cơ sở dữ liệu thông qua TablecardDAO
            boolean success = TablecardDAO.getInstance().addOne(tablecard);

            if (success) {
                // Nếu thêm thành công, chuyển hướng về trang danh sách tablecard
                response.sendRedirect("table");
            } else {
                // Nếu có lỗi trong quá trình thêm, chuyển hướng đến trang lỗi
                response.sendRedirect("error.jsp");
            }
        } catch (Exception e) {
            // Xử lý ngoại lệ
            e.printStackTrace();
            response.sendRedirect("error.jsp");
        }
    }
}
