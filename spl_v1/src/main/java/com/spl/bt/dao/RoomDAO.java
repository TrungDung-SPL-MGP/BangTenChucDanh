package com.spl.bt.dao;

import com.spl.bt.dto.Room;
import com.spl.bt.dto.RoomCardCount;
import com.spl.bt.dto.Tablecard;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RoomDAO implements Serializable {

    private static RoomDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    private RoomDAO() {
    }

    public static RoomDAO getInstance() {
        if (instance == null) {
            instance = new RoomDAO();
        }
        return instance;
    }

    // Get all rooms in stock
    public List<Room> getAll() {
        PreparedStatement stm;
        ResultSet rs;
        List<Room> roomList = new ArrayList<>();
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
                        rs.getString("room")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return roomList;
    }

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
                        rs.getString("room"));
            }
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public List<Room> getAllRooms() {
        List<Room> roomList = new ArrayList<>();
        String sql = "SELECT * FROM room"; // Change 'room' to the actual table name
        try ( Connection conn = DBUtil.makeConnection(); 
                PreparedStatement stmt = conn.prepareStatement(sql); 
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Room room = new Room();
                room.setId(rs.getString("id"));
                room.setNameroom(rs.getString("nameroom"));
                room.setIdtemplate(rs.getString("idtemplate"));
                room.setIdsize(rs.getString("idsize"));
                room.setDatestart(rs.getString("datestart"));
                room.setWidth(rs.getInt("width"));
                room.setHeight(rs.getInt("height"));
                room.setRoom(rs.getString("room"));

                roomList.add(room);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return roomList;
    }

    public String addOne(Room room) {
        PreparedStatement stm;
        try {
            String sql = "INSERT INTO room (id, nameroom, idtemplate, idsize, datestart, width, height, room) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            stm = conn.prepareStatement(sql);
            stm.setString(1, room.getId());
            stm.setString(2, room.getNameroom());
            stm.setString(3, room.getIdtemplate());
            stm.setString(4, room.getIdsize());
            stm.setString(5, room.getDatestart());
            stm.setInt(6, room.getWidth());
            stm.setInt(7, room.getHeight());
            stm.setString(8, room.getRoom());

            if (stm.executeUpdate() > 0) {
                return room.getId();
            }
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public String updateOne(Room room) {
        PreparedStatement stm;
        try {
            String sql = "UPDATE room SET nameroom = ?, idtemplate = ?, idsize = ?, datestart = ?, width = ?, height = ?, room = ? WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, room.getNameroom());
            stm.setString(2, room.getIdtemplate());
            stm.setString(3, room.getIdsize());
            stm.setString(4, room.getDatestart());
            stm.setInt(5, room.getWidth());
            stm.setInt(6, room.getHeight());
            stm.setString(7, room.getRoom());
            stm.setString(8, room.getId()); // Set ID last

            if (stm.executeUpdate() > 0) {
                return room.getId();
            }
        } catch (Exception ex) {
            Logger.getLogger(RoomDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

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

    public static void main(String[] args) {
        System.out.println("All of rooms: \n" + getInstance().getAll());
    }
}
