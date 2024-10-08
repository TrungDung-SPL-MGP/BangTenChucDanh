package com.spl.bt.controller;

import com.spl.bt.dao.DeviceDAO;
import com.spl.bt.dto.Device;
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet(name = "DeviceServlet", urlPatterns = {"/device"})
public class DeviceServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Device> data = DeviceDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("device", data);

        // Chuyển hướng đến trang JSP để sizelist.jsphiển thị danh sách người dùng
        request.getRequestDispatcher("views/device/listdevice.jsp").forward(request, response);
    }

}
