package com.spl.bt.dao;

import com.spl.bt.dto.Vote;

import com.spl.bt.util.DBUtil;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class VoteDAO implements Serializable {

    private static VoteDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    private VoteDAO() {

    }

    public static VoteDAO getInstance() {

        if (instance == null) {
            instance = new VoteDAO();
        }
        return instance;
    }

    public List<Vote> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Vote> btnList = new ArrayList();
        try {

            String sql = "SELECT * FROM vote";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                btnList.add(new Vote(rs.getString("id"),
                        rs.getString("id_room"),
                        rs.getString("id_card"),
                        rs.getString("meeting_content"),
                        rs.getInt("vote"),
                        rs.getString("vote_date")));

            }
        } catch (SQLException ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return btnList;
    }

    public Vote getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM vote WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Vote(rs.getString("id"),
                        rs.getString("id_room"),
                        rs.getString("id_card"),
                        rs.getString("meeting_content"),
                        rs.getInt("vote"),
                        rs.getString("vote_date"));
            }

        } catch (Exception ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Vote> getAllBySizes(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Vote> btnList = new ArrayList();

        try {

            String sql = "SELECT * FROM vote WHERE meeting_content = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                btnList.add(new Vote(rs.getString("id"),
                        rs.getString("id_room"),
                        rs.getString("id_card"),
                        rs.getString("meeting_content"),
                        rs.getInt("vote"),
                        rs.getString("vote_date")));
            }
            return btnList;

        } catch (Exception ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Vote vot) {

        PreparedStatement stm;

        try {

            String sql = "INSERT INTO vote (id, id_room, id_card, meeting_content,vote,vote_date) VALUES ( ?, ?, ?, ?,?,?)";
            stm = conn.prepareStatement(sql);

            stm.setString(1, vot.getId());
            stm.setString(2, vot.getIdroom());

            stm.setString(3, vot.getIdcard());
            stm.setString(4, vot.getMeetingcontent());
            stm.setInt(5, vot.getVote());
            stm.setString(6, vot.getVotedate());
            if (stm.executeUpdate() > 0) {
                return vot.getId();
            }   // Trả về mã sách vừa thêm thành công vào kho
        } catch (Exception ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
    public boolean updateOne(Vote vot) {

        PreparedStatement stm;

        try {
            String sql = ""
                    + "UPDATE vote "
                    + "SET  id_room = ?, id_card = ?,meetingcontent = ?,vote=?,vote_date=?"
                    + "WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, vot.getIdroom());
            stm.setString(2, vot.getIdcard());
            stm.setString(3, vot.getMeetingcontent());
            stm.setInt(4, vot.getVote());
            stm.setString(5, vot.getVotedate());
            stm.setString(6, vot.getId()); // 

            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (SQLException ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(int id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM vote WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setInt(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(VoteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public Map<Integer, Integer> getVoteStatisticsByRoom() throws SQLException {
        Map<Integer, Integer> voteStats = new HashMap<>();

        String query = "SELECT idroom, COUNT(vote) AS total_votes FROM Vote GROUP BY idroom";

        try ( Connection conn = DBUtil.makeConnection();  PreparedStatement stmt = conn.prepareStatement(query);  ResultSet rs = stmt.executeQuery()) {

            // Xử lý kết quả trả về
            while (rs.next()) {
                int roomId = rs.getInt("idroom");
                int totalVotes = rs.getInt("total_votes");

                // Lưu kết quả vào Map
                voteStats.put(roomId, totalVotes);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new SQLException("Lỗi khi thực hiện truy vấn thống kê bình chọn theo phòng.", ex);
        }

        return voteStats;
    }

    public Map<Integer, Integer> getVoteStatisticsForRoom(int roomId) throws SQLException {
        Map<Integer, Integer> voteStats = new HashMap<>();

        String query = "SELECT vote, COUNT(*) AS vote_count FROM Vote WHERE idroom = ? GROUP BY vote";

        try ( Connection conn = DBUtil.makeConnection();  PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, roomId);
            ResultSet rs = stmt.executeQuery();

            // Xử lý kết quả trả về
            while (rs.next()) {
                int voteValue = rs.getInt("vote");
                int voteCount = rs.getInt("vote_count");

                // Lưu kết quả vào Map
                voteStats.put(voteValue, voteCount);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new SQLException("Lỗi khi thực hiện truy vấn thống kê bình chọn theo giá trị vote.", ex);
        }

        return voteStats;
    }

    public Vote getVoteById(String id) throws SQLException {
        Vote vote = null;
        String query = "SELECT * FROM vote WHERE id = ?";

        try ( Connection conn = DBUtil.makeConnection();  PreparedStatement stmt = conn.prepareStatement(query)) {

            
            stmt.setString(1, id);

           
            try ( ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Tạo đối tượng Vote với dữ liệu từ ResultSet
                    vote = new Vote();
                    vote.setId(rs.getString("id"));
                    vote.setIdroom(rs.getString("id_room"));
                    vote.setIdcard(rs.getString("id_card"));
                    vote.setMeetingcontent(rs.getString("meeting_content"));
                    vote.setVote(rs.getInt("vote"));
                    vote.setVotedate(rs.getString("vote_date"));
                } else {
                    // Không tìm thấy bản ghi với id tương ứng
                    System.out.println("Không tìm thấy thông tin vote với ID: " + id);
                }
            }

        } catch (SQLException e) {
            // In chi tiết lỗi và ném lại ngoại lệ
            e.printStackTrace();
            throw new SQLException("Lỗi khi kiểm tra thông tin vote theo ID", e);
        }

        return vote;
    }

    
    public static void main(String[] args) {

        System.out.println("All of vote: \n" + getInstance().getAll());

    }

}
