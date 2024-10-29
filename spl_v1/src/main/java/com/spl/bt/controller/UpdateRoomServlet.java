package com.spl.bt.controller;

import com.spl.bt.dao.RoomDAO;
import com.spl.bt.dto.Room;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/UpdateRoomServlet")
public class UpdateRoomServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(UpdateRoomServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            // Lấy dữ liệu từ form
            String id = request.getParameter("id");
            String nameroom = request.getParameter("nameroom");
            String idTemplate = request.getParameter("idtemplate");
            String idSize = request.getParameter("idsize");
            String dateStart = request.getParameter("datestart");
            int width = Integer.parseInt(request.getParameter("width"));
            int height = Integer.parseInt(request.getParameter("height"));
            String room = request.getParameter("room");
            

            // Tạo một đối tượng Room mới với dữ liệu cập nhật
            Room updateRoom = new Room(id, nameroom, idTemplate, idSize, dateStart, width, height, room);

            // Cập nhật thông tin phòng
            String result = RoomDAO.getInstance().updateOne(updateRoom);

            if (result !=null) {
                // Đặt thông báo thành công
                request.setAttribute("success", "Thông tin phòng đã được cập nhật thành công.");

                // Chuyển hướng đến trang thành công hoặc danh sách phòng
                response.sendRedirect("room");
            } else {
                // Xử lý trường hợp cập nhật không thành công
                request.setAttribute("error", "Không thể cập nhật thông tin phòng.");
                request.getRequestDispatcher("/updateroom.jsp").forward(request, response);
            }
        } catch (NumberFormatException ex) {
            LOGGER.log(Level.SEVERE, "Lỗi chuyển đổi dữ liệu số: " + ex.getMessage(), ex);
            request.setAttribute("error", "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
            request.getRequestDispatcher("/updateroom.jsp").forward(request, response);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "Lỗi xử lý yêu cầu: " + ex.getMessage(), ex);
            request.setAttribute("error", "Đã xảy ra lỗi. Vui lòng thử lại sau.");
            request.getRequestDispatcher("/updateroom.jsp").forward(request, response);
        }
    }
}
