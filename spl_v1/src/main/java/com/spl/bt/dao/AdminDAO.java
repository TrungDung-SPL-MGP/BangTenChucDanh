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

      
        System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
