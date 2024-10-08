/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.dao;

import static com.spl.bt.dao.LoginDAO.getInstance;

import com.spl.bt.dto.User;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoginDAO implements Serializable {

    private static LoginDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    public LoginDAO() {

    }

    public static LoginDAO getInstance() {

        if (instance == null) {
            instance = new LoginDAO();
        }
        return instance;
    }

    // Lấy ra tất cả size trong kho
    public List<User> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<User> userList = new ArrayList();
        try {

            String sql = "SELECT * FROM u_user";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                userList.add(new User(rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("password")
                ));
            }
        } catch (SQLException ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return userList;
    }

    public User authenticate(String username, String password) {
        PreparedStatement stm;
        ResultSet rs;

        try {
            String sql = "SELECT * FROM u_user WHERE username = ? AND password = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, username);
            stm.setString(2, password);

            rs = stm.executeQuery();
            if (rs.next()) {
                // Tìm thấy người dùng, trả về đối tượng User
                return new User(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
            }
        } catch (SQLException ex) {
            Logger.getLogger(LoginDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null; // Trả về null nếu không tìm thấy người dùng
    }

    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
        //System.out.println("A size by id: " + getInstance().getOne("2518407786529"));
        // 3. Test select where author = ?
        //System.out.println("Sizes by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a size
        //getInstance().updateOne(new Size("2518407786529", "Nhà giả kim kim", "Paulo Coelho", 2, 2021));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a size
        //getInstance().deleteOne("2518407786529");
        // 1. Test select * again
        //System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new size
        // 1. Test select * again
        System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
