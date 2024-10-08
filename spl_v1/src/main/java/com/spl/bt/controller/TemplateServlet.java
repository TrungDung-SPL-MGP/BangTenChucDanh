/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.spl.bt.controller;

import com.spl.bt.dao.TemplateDAO;
import com.spl.bt.dto.Template;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;


@WebServlet(name = "TemplateServlet", urlPatterns = {"/template"})
public class TemplateServlet extends HttpServlet {

    
   

   
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
      List<Template> data = TemplateDAO.getInstance().getAll();

        // Đặt danh sách người dùng vào yêu cầu
        request.setAttribute("listtem", data);

        // Chuyển hướng đến trang JSP để sizelist.jsphiển thị danh sách người dùng
        request.getRequestDispatcher("views/template/listtem.jsp").forward(request, response);
    }

  
   

}
