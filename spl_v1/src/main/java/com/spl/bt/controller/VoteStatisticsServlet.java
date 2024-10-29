package com.spl.bt.controller;

import com.spl.bt.dao.VoteDAO;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "VoteStatisticsServlet", urlPatterns = {"/voteStatistics"})
public class VoteStatisticsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            
            Map<Integer, Integer> voteStatistics = VoteDAO.getInstance().getVoteStatisticsByRoom();
            
            
            request.setAttribute("voteStatistics", voteStatistics);
            
            // Forward tới trang JSP để hiển thị kết quả
            request.getRequestDispatcher("/voteStatistics.jsp").forward(request, response);
            
        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("error", "Error getting voting statistics.");
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
}
