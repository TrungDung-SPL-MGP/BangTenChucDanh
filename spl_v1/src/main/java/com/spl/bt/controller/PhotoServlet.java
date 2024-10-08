/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;

import com.spl.bt.dao.PhotoDAO;
import com.spl.bt.dto.Photo;
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet(name = "PhotoServlet", urlPatterns = {"/photo"})
public class PhotoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Photo> data = PhotoDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("photo", data);

        // Chuyển hướng đến trang JSP để sizelist.jsphiển thị danh sách người dùng
        request.getRequestDispatcher("views/photo/listphoto.jsp").forward(request, response);
    }

}
