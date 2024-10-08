/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.dao;

import com.spl.bt.dto.Device;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DeviceDAO implements Serializable {

    private static DeviceDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp DeviceDAO, chỉ đi qua con đường lấy trực tiếp DeviceDAO từ hàm static
    private DeviceDAO() {
    }

    public static DeviceDAO getInstance() {

        if (instance == null) {
            instance = new DeviceDAO();
        }
        return instance;
    }

    // Lấy ra tất cả device trong kho
    public List<Device> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Device> deviceList = new ArrayList();
        try {

            String sql = "SELECT * FROM device";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                deviceList.add(new Device(rs.getString("id"),
                        rs.getString("namedevice"),
                        rs.getString("origin"),
                        rs.getInt("active")
                        ));
            }
        } catch (SQLException ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return deviceList;
    }

    // Lấy ra một cuốn sách dựa trên mã sách
    public Device getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM device WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Device(rs.getString("id"),
                        rs.getString("namedevice"),
                        rs.getString("origin"),
                        rs.getInt("active"));
            }

        } catch (Exception ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Device> getAllByDevices(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Device> deviceList = new ArrayList();

        try {

            String sql = "SELECT * FROM device WHERE namedevice = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                deviceList.add(new Device(rs.getString("id"),
                        rs.getString("namecard"),
                        rs.getString("origin"),
                        rs.getInt("acrive")));
            }
            return deviceList;

        } catch (Exception ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Device device) {

        PreparedStatement stm;

        try {

            String sql = "INSERT INTO device (id, namedevice, origin, active,idcard) VALUES (  ?, ?,?, ?)";
            stm = conn.prepareStatement(sql);

            stm.setString(1, device.getId());
            stm.setString(2, device.getNamedevice());

            stm.setString(3, device.getOrigin());
            stm.setInt(4, device.getActive());
          
            if (stm.executeUpdate() > 0) {
                return device.getId();
            }   // Trả về mã sách vừa thêm thành công vào kho
        } catch (Exception ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
    public boolean updateOne(Device device) {

        PreparedStatement stm;

        try {
            String sql = ""
                    + "UPDATE device "
                    + "SET namedevice = ?, origin = ?, active = ?  "
                    + "WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, device.getId());
            stm.setString(2, device.getNamedevice());

            stm.setString(3, device.getOrigin());
            stm.setInt(4, device.getActive());
            
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(String id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM device WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////
    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
        //System.out.println("A device by id: " + getInstance().getOne("2518407786529"));
        // 3. Test select where author = ?
        //System.out.println("Devices by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a device
        //getInstance().updateOne(new Device("2518407786529", "Nhà giả kim kim", "Paulo Coelho", 2, 2021));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a device
        getInstance().deleteOne("thietbibangten003");

        // 1. Test select * again
        //System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new device
        //getInstance().addOne(new Device("BT2", "7.5inch7color","bt1",1,"100%"));
        // 1. Test select * again
        System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
