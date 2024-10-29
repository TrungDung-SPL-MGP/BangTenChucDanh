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
        // Lấy danh sách tablecard từ DAO
       
        List<Tablecard> data = TablecardDAO.getInstance().getAll();
        
        // Đặt danh sách tablecard vào request scope
        request.setAttribute("table", data);

        // Chuyển tiếp yêu cầu đến JSP để hiển thị
        request.getRequestDispatcher("views/tablecard/listtablecard.jsp").forward(request, response);
    }

   

}
