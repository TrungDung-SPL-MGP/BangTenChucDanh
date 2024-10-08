/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp TablecardDAO, chỉ đi qua con đường lấy trực tiếp TablecardDAO từ hàm static
    private TablecardDAO() {
    }

    public static TablecardDAO getInstance() {

        if (instance == null) {
            instance = new TablecardDAO();
        }
        return instance;
    }

    // Lấy ra tất cả tablecard trong kho
    public List<Tablecard> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Tablecard> tablecardList = new ArrayList();
        try {

            String sql = "SELECT * FROM tablecard";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                tablecardList.add(new Tablecard(rs.getString("id"),
                        rs.getString("namecard"),
                        rs.getString("idtemplate"),
                        rs.getInt("active"),
                        rs.getString("battery")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return tablecardList;
    }

    // Lấy ra một cuốn sách dựa trên mã sách
    public Tablecard getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM tablecard WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Tablecard(rs.getString("id"),
                        rs.getString("namecard"),
                        rs.getString("idtemplate"),
                        rs.getInt("active"), rs.getString("battery"));
            }

        } catch (Exception ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Tablecard> getAllByTablecards(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Tablecard> tablecardList = new ArrayList();

        try {

            String sql = "SELECT * FROM tablecard WHERE namecard = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                tablecardList.add(new Tablecard(rs.getString("id"),
                        rs.getString("namecard"),
                        rs.getString("idtemplate"),
                        rs.getInt("acrive"), rs.getString("battery")));
            }
            return tablecardList;

        } catch (Exception ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Tablecard tablecard) {

        PreparedStatement stm;

        try {

            String sql = "INSERT INTO tablecard (id, namecard, idtemplate, active,battety) VALUES ( ?, ?, ?,?, ?)";
            stm = conn.prepareStatement(sql);

            stm.setString(1, tablecard.getId());
            stm.setString(2, tablecard.getNamecard());

            stm.setString(3, tablecard.getIdtemplate());
            stm.setInt(4, tablecard.getActive());
            stm.setString(5, tablecard.getBattery());
            if (stm.executeUpdate() > 0) {
                return tablecard.getId();
            }   // Trả về mã sách vừa thêm thành công vào kho
        } catch (Exception ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
    public boolean updateOne(Tablecard tablecard) {

        PreparedStatement stm;

        try {
            String sql = ""
                    + "UPDATE tablecard "
                    + "SET namecard = ?, idtemplate = ?, active = ?, battery = ?  "
                    + "WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, tablecard.getId());
            stm.setString(2, tablecard.getNamecard());

            stm.setString(3, tablecard.getIdtemplate());
            stm.setInt(4, tablecard.getActive());
            stm.setString(5, tablecard.getBattery());
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(String id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM tablecard WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(TablecardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////
    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of tablecards: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
        //System.out.println("A tablecard by id: " + getInstance().getOne("2518407786529"));
        // 3. Test select where author = ?
        //System.out.println("Tablecards by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a tablecard
        //getInstance().updateOne(new Tablecard("2518407786529", "Nhà giả kim kim", "Paulo Coelho", 2, 2021));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a tablecard
        //getInstance().deleteOne("2518407786529");
        // 1. Test select * again
        //System.out.println("All of tablecards: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new tablecard
        getInstance().addOne(new Tablecard("BT0", "7.5inch7color", "bt1", 1, "100%"));

        // 1. Test select * again
        System.out.println("All of tablecards: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
