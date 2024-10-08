/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.dao;

import com.spl.bt.dto.Admin;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class AdminDAO implements Serializable {
    
    private static AdminDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    public AdminDAO() {

    }
 public static AdminDAO getInstance() {
    if (instance == null) {
            instance = new AdminDAO();
        }
        return instance;
 }

    
 public List<Admin> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Admin> deviceList = new ArrayList();
        try {

            String sql = "SELECT * FROM admin";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                deviceList.add(new Admin(rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getInt("phone"),
                        rs.getInt("zalo"),
                        rs.getString("duty")
                        ));
            }
        } catch (SQLException ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return deviceList;
    }
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
        //getInstance().deleteOne("thietbibangten003");

        // 1. Test select * again
        //System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new device
        //getInstance().addOne(new Device("BT2", "7.5inch7color","bt1",1,"100%"));
        // 1. Test select * again
        System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
