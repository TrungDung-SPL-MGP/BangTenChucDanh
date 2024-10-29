package com.spl.bt.controller;

import com.spl.bt.dao.RoomDAO;
import com.spl.bt.dto.RoomCardCount;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/roomCardCounts")
public class RoomCardCountServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        RoomDAO roomDAO = RoomDAO.getInstance();
       // List<> roomCardCounts = roomDAO.getAll();
        //request.setAttribute("roomCardCounts", roomCardCounts);
        request.getRequestDispatcher("/roomCardCounts.jsp").forward(request, response);
    }
}
