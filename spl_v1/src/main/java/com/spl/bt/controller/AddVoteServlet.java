package com.spl.bt.controller;

import com.spl.bt.dao.RoomDAO;
import com.spl.bt.dao.VoteDAO;
import com.spl.bt.dto.Room;
import com.spl.bt.dto.Vote;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/AddVoteServlet")
public class AddVoteServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(AddVoteServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            // Lấy các tham số từ form
            String id = request.getParameter("id");

            // Chuyển đổi và kiểm tra giá trị của các tham số số nguyên
            String idroom = request.getParameter("idroom");
            String idcard = request.getParameter("idcard");
            int vote = parseIntParameter(request, "vote", "Giá trị bình chọn không hợp lệ.");

            // Lấy nội dung cuộc họp từ form
            String meetingContent = request.getParameter("meeting_content");
            String date = request.getParameter("vote_date");

            // Tạo đối tượng Vote mới từ dữ liệu
            Vote newVote = new Vote(id, idroom, idcard, meetingContent, vote,date);

            // Gọi DAO để thêm vote mới
            String result = VoteDAO.getInstance().addOne(newVote);

            // Kiểm tra kết quả và xử lý phản hồi
            if (result != null) {
                // Đặt thông báo thành công và chuyển hướng đến trang danh sách bình chọn
                response.sendRedirect("vote");
            } else {
                // Đặt thông báo lỗi khi thêm vote không thành công
                request.setAttribute("error", "Không thể thêm bình chọn.");
                request.getRequestDispatcher("/addvote.jsp").forward(request, response);
            }
        } catch (NumberFormatException ex) {
            LOGGER.log(Level.SEVERE, "Lỗi chuyển đổi số: " + ex.getMessage(), ex);
            handleError(request, response, "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "Lỗi khi xử lý yêu cầu: " + ex.getMessage(), ex);
            handleError(request, response, "Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    }
     @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Lấy danh sách Room từ DAO
       
        List<Room> roomList = RoomDAO.getInstance().getAllRooms();
        
        // Đưa danh sách vào request attribute
        request.setAttribute("roomList", roomList);
        
        // Forward đến trang JSP
        request.getRequestDispatcher("/addtablecard.jsp").forward(request, response);
    }

    // Phương thức tiện ích để chuyển đổi chuỗi sang số nguyên và xử lý lỗi
    private int parseIntParameter(HttpServletRequest request, String paramName, String errorMessage) throws NumberFormatException {
        String paramValue = request.getParameter(paramName);
        if (paramValue == null || paramValue.isEmpty()) {
            throw new NumberFormatException(errorMessage);
        }
        return Integer.parseInt(paramValue);
    }

    // Phương thức tiện ích để xử lý và hiển thị lỗi trên trang
    private void handleError(HttpServletRequest request, HttpServletResponse response, String errorMessage)
            throws ServletException, IOException {
        request.setAttribute("error", errorMessage);
        request.getRequestDispatcher("/addvote.jsp").forward(request, response);
    }
}
