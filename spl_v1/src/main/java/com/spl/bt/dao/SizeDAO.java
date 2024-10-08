package com.spl.bt.dao;

import com.spl.bt.dto.Size;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

// Using Singleton design pattern
public class SizeDAO implements Serializable {

    private static SizeDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp SizeDAO, chỉ đi qua con đường lấy trực tiếp SizeDAO từ hàm static
    private SizeDAO() {
    }

    public static SizeDAO getInstance() {

        if (instance == null) {
            instance = new SizeDAO();
        }
        return instance;
    }

    // Lấy ra tất cả size trong kho
    public List<Size> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Size> sizeList = new ArrayList();
        try {

            String sql = "SELECT * FROM size";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                sizeList.add(new Size(rs.getString("id"),
                        rs.getString("namesize"),
                        rs.getInt("width"),
                        rs.getInt("height")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return sizeList;
    }

    // Lấy ra một cuốn sách dựa trên mã sách
    public Size getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM size WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Size(rs.getString("id"),
                        rs.getString("namesize"),
                        rs.getInt("width"),
                        rs.getInt("height"));
            }

        } catch (Exception ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Size> getAllBySizes(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Size> sizeList = new ArrayList();

        try {

            String sql = "SELECT * FROM size WHERE name = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                sizeList.add(new Size(rs.getString("id"),
                        rs.getString("name"),
                        rs.getInt("wight"),
                        rs.getInt("height")));
            }
            return sizeList;

        } catch (Exception ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Size size) {

        PreparedStatement stm;

        try {

            String sql = "INSERT INTO size (id, namesize, width, height) VALUES ( ?, ?, ?, ?)";
            stm = conn.prepareStatement(sql);

            stm.setString(1, size.getId());
            stm.setString(2, size.getNamesize());

            stm.setInt(3, size.getWidth());
            stm.setInt(4, size.getHeight());
            if (stm.executeUpdate() > 0) {
                return size.getId();
            }   // Trả về mã sách vừa thêm thành công vào kho
        } catch (Exception ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
   public boolean updateOne(Size size) {

    PreparedStatement stm;

    try {
         String sql = ""
                    + "UPDATE size "
                    + "SET namesize = ?, width = ?, height = ?"
                    + "WHERE Isbn = ?";
        stm = conn.prepareStatement(sql);

        stm.setString(1, size.getNamesize());
        stm.setInt(2, size.getWidth());
        stm.setInt(3, size.getHeight());
        stm.setString(4, size.getId()); // Assuming id is an integer

        if (stm.executeUpdate() > 0) {
            return true;
        }
    } catch (SQLException ex) {
        Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
    }
    return false;
}

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(String id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM size WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(SizeDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////
    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
       // System.out.println("A size by id: " + getInstance().getOne("BT063333333333333333"));
        // 3. Test select where author = ?
        //System.out.println("Sizes by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a size
       getInstance().updateOne(new Size("BT040608101214161820", "3444", 3, 5));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a size
        //getInstance().deleteOne("232");

        // 1. Test select * again
        //System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new size
       // getInstance().addOne(new Size("BT063333333333333333", "7.5inch7color", 800, 480));
        // 1. Test select * again
        System.out.println("All of sizes: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
