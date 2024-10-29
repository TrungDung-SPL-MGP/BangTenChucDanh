package com.spl.bt.dao;

import com.spl.bt.dto.Tablecard;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TablecardDAO implements Serializable {

    private static TablecardDAO instance;
    private final Connection conn;

    // Constructor private để cấm new trực tiếp
    private TablecardDAO() {
        conn = DBUtil.makeConnection();
    }

    // Singleton instance
    public static synchronized TablecardDAO getInstance() {
        if (instance == null) {
            instance = new TablecardDAO();
        }
        return instance;
    }

    // Lấy ra tất cả tablecards trong DB
    public List<Tablecard> getAll() {
        String sql = "SELECT * FROM tablecard";
        List<Tablecard> tablecardList = new ArrayList<>();
        try ( PreparedStatement stm = conn.prepareStatement(sql);  ResultSet rs = stm.executeQuery()) {

            while (rs.next()) {
                Tablecard tablecard = new Tablecard(rs.getString("id"),
                        rs.getString("namecard"),
                        rs.getString("idtemplate"),
                        rs.getInt("active"),
                        rs.getString("battery"),
                        rs.getString("idroom"));
                tablecardList.add(tablecard);
            }
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error getting all tablecards", ex);
        }
        return tablecardList;
    }

    // Lấy thông tin 1 tablecard theo ID
    public Tablecard getOne(String id) {
        String sql = "SELECT * FROM tablecard WHERE id = ?";
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, id);
            try ( ResultSet rs = stm.executeQuery()) {
                if (rs.next()) {
                    return new Tablecard(rs.getString("id"),
                            rs.getString("namecard"),
                            rs.getString("idtemplate"),
                            rs.getInt("active"),
                            rs.getString("battery"),
                            rs.getString("idroom"));
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error getting tablecard by id", ex);
        }
        return null;
    }

    // Lấy ra danh sách Tablecard theo Namecard
    public List<Tablecard> getAllByNameCard(String namecard) {
        String sql = "SELECT * FROM tablecard WHERE namecard = ?";
        List<Tablecard> tablecardList = new ArrayList<>();
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, namecard);
            try ( ResultSet rs = stm.executeQuery()) {
                while (rs.next()) {
                    Tablecard tablecard = new Tablecard(rs.getString("id"),
                            rs.getString("namecard"),
                            rs.getString("idtemplate"),
                            rs.getInt("active"),
                            rs.getString("battery"),
                            rs.getString("idroom"));
                    tablecardList.add(tablecard);
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error getting tablecards by namecard", ex);
        }
        return tablecardList;
    }

    // Thêm mới một tablecard
    public boolean addOne(Tablecard tablecard) {
        String sql = "INSERT INTO tablecard (id, namecard, idtemplate, active, battery, idroom) VALUES (?, ?, ?, ?, ?, ?)";
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, tablecard.getId());
            stm.setString(2, tablecard.getNamecard());
            stm.setString(3, tablecard.getIdtemplate());
            stm.setInt(4, tablecard.getActive());
            stm.setString(5, tablecard.getBattery());
            stm.setString(6, tablecard.getIdroom());

            int rowsAffected = stm.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error adding tablecard", ex);
        }
        return false;
    }

    // Cập nhật một tablecard
    public boolean updateOne(Tablecard tablecard) {
        String sql = "UPDATE tablecard SET namecard = ?, idtemplate = ?, active = ?, battery = ?, idroom = ? WHERE id = ?";
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, tablecard.getNamecard());
            stm.setString(2, tablecard.getIdtemplate());
            stm.setInt(3, tablecard.getActive());
            stm.setString(4, tablecard.getBattery());
            stm.setString(5, tablecard.getIdroom());
            stm.setString(6, tablecard.getId());

            return stm.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error updating tablecard", ex);
        }
        return false;
    }

    // Xóa một tablecard theo ID
    public boolean deleteOne(String id) {
        String sql = "DELETE FROM tablecard WHERE id = ?";
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, id);
            return stm.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error deleting tablecard", ex);
        }
        return false;
    }

    // Lấy thông tin một tablecard theo ID
    public Tablecard getCardById(String id) throws SQLException {
        String sql = "SELECT * FROM tablecard WHERE id = ?";
        Tablecard card = null;
        try ( PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, id);
            try ( ResultSet rs = stm.executeQuery()) {
                if (rs.next()) {
                    card = new Tablecard();
                    card.setId(rs.getString("id"));
                    card.setNamecard(rs.getString("namecard"));
                    card.setIdtemplate(rs.getString("idtemplate"));
                    card.setActive(rs.getInt("active"));
                    card.setBattery(rs.getString("battery"));
                    card.setIdroom(rs.getString("idroom"));
                } else {
                    Logger.getLogger(TablecardDAO.class.getName()).log(Level.INFO, "Không tìm thấy tablecard với ID: " + id);
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, "Error getting card by id", ex);
            throw ex;
        }
        return card;
    }

    public int countIdroom(String idroom) {
        int qty = 0;
        String sql = "SELECT tablecard.idroom, COUNT(idroom) AS qty FROM tablecard join room on tablecard.idroom=room.id group by idroom ;";
        Tablecard cardcount = null;
        try ( PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setString(1, idroom);

            try ( ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    cardcount = new Tablecard();
                    cardcount.setIdroom(rs.getString("idroom"));
                    qty = rs.getInt("qty");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return qty;
        
    }

    public static void main(String[] args) {
        TablecardDAO dao = TablecardDAO.getInstance();

        // Kiểm tra kết nối trước
        System.out.println("Testing database connection...");
        if (dao.conn != null) {
            System.out.println("Connection successful!");
        } else {
            System.out.println("Connection failed!");
        }

        // Kiểm tra lấy danh sách tablecards
        List<Tablecard> tablecards = dao.getAll();
        if (tablecards.isEmpty()) {
            System.out.println("No tablecards found.");
        } else {
            System.out.println("Tablecards found: " + tablecards);
        }
    }

}
