package com.spl.bt.controller;

import com.spl.bt.dao.ImageDAO;
import com.spl.bt.dto.Image;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.IOException;
import java.util.List;

@WebServlet("/ImageServlet")
@MultipartConfig
public class ImageServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lấy danh sách hình ảnh từ DAO
        List<Image> imageList = ImageDAO.getInstance().getAll();
        // Gửi danh sách hình ảnh đến JSP
        request.setAttribute("imageList", imageList);
        request.getRequestDispatcher("views/photo/listimage.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Xử lý thêm hình ảnh mới
        String name = request.getParameter("name");
        Part filePart = request.getPart("image");
        byte[] imageData = new byte[(int) filePart.getSize()];

        if (filePart != null && filePart.getSize() > 0) {
            filePart.getInputStream().read(imageData);
            Image newImage = new Image(0, name, imageData);
            ImageDAO.getInstance().save(newImage);
        }

        // Chuyển hướng về danh sách hình ảnh sau khi thêm thành công
        response.sendRedirect("ImageServlet");
    }
}
