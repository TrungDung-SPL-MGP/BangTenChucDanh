
package com.spl.bt.dao;

import com.spl.bt.dto.Room;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RoomDAO implements Serializable{

    private static RoomDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp RoomDAO, chỉ đi qua con đường lấy trực tiếp RoomDAO từ hàm static
    private RoomDAO() {
    }

    public static RoomDAO getInstance() {

        if (instance == null) {
            instance = new RoomDAO();
        }
        return instance;
    }

    // Lấy ra tất cả room trong kho
    public List<Room> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Room> roomList = new ArrayList();
        try {

            String sql = "SELECT * FROM room";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                roomList.add(new Room(rs.getString("id"),
                        rs.getString("nameroom"),
                        rs.getString("idtemplate"),
                        rs.getString("idsize"),
                        rs.getString("datestart"),
                        rs.getInt("width"),
                        rs.getInt("height"),
                        rs.getString("room"),
                        rs.getInt("qty")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return roomList;
    }

    // Lấy ra một cuốn sách dựa trên mã sách
    public Room getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM room WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Room(rs.getString("id"),
                        rs.getString("nameroom"),
                        rs.getString("idtemplate"),
                        rs.getString("idsize"),
                        rs.getString("datestart"),
                        rs.getInt("width"),
                        rs.getInt("height"),
                        rs.getString("room"),
                        rs.getInt("qty"));
            }

        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Room> getAllByRooms(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Room> roomList = new ArrayList();

        try {

            String sql = "SELECT * FROM room WHERE nameroom = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                roomList.add(new Room(rs.getString("id"),
                        rs.getString("nameroom"),
                        rs.getString("idtemplate"),
                        rs.getString("idsize"),
                        rs.getString("datestart"),
                        rs.getInt("width"),
                        rs.getInt("height"),
                        rs.getString("room"),
                        rs.getInt("qty")));
            }
            return roomList;

        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Room room) {

        PreparedStatement stm;

        try {

            String sql = "INSERT INTO room (id, nameroom,idtemplate,idsize,datestart, width, height,room,qty) VALUES ( ?, ?, ?, ?,?,?,?,?,?)";
            stm = conn.prepareStatement(sql);
            stm.setString(1, room.getId());
            stm.setString(2, room.getNameroom());
            stm.setString(3,room.getIdtemplate());
            stm.setString(4,room.getIdsize());
            stm.setString(5,room.getDatestart());
            stm.setInt(6, room.getWidth());
            stm.setInt(7, room.getHeight());
            stm.setString(8,room.getRoom());
            stm.setInt(9,room.getQty());
            if (stm.executeUpdate() > 0) {
                return room.getId();
            }   // Trả về mã sách vừa thêm thành công vào kho
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
    public String updateOne(Room room) {

        PreparedStatement stm;

        try {
            String sql = ""
                    + "UPDATE room "
                    + "SET nameroom = ?,idtemplate=?,idsize=?,datestart=? width = ?, height = ? ,room=?,qty=? "
                    + "WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, room.getId());
            stm.setString(2, room.getNameroom());
            stm.setString(3,room.getIdtemplate());
            stm.setString(4,room.getIdsize());
            stm.setString(5,room.getDatestart());
            stm.setInt(6, room.getWidth());
            stm.setInt(7, room.getHeight());
            stm.setString(8,room.getRoom());
            stm.setInt(9,room.getQty());
            if (stm.executeUpdate() > 0) {
                return room.getId();
            }
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(String id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM room WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////
    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of rooms: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
        //System.out.println("A room by id: " + getInstance().getOne("2518407786529"));
        // 3. Test select where author = ?
        //System.out.println("Rooms by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a room
        getInstance().updateOne(new Room("BT08                ", "334","333","333","12/2/2023", 11, 11,"33",3));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a room
        //getInstance().deleteOne("232");

        // 1. Test select * again
        //System.out.println("All of rooms: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new room
        //getInstance().addOne(new Room("25", "333","333","333","12/2/2023", 11, 11,"33",3));
        // 1. Test select * again
        System.out.println("All of rooms: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
