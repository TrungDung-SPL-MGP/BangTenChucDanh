package com.spl.bt.dao;

import com.spl.bt.dto.Photo;
import com.spl.bt.util.DBUtil;

import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PhotoDAO implements Serializable {

    private static PhotoDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp PhotoDAO, chỉ đi qua con đường lấy trực tiếp PhotoDAO từ hàm static
    private PhotoDAO() {
    }

    public static PhotoDAO getInstance() {

        if (instance == null) {
            instance = new PhotoDAO();
        }
        return instance;
    }

    // Lấy ra tất cả photo trong kho
    public List<Photo> getAll() {

        PreparedStatement stm;
        ResultSet rs;

        List<Photo> photoList = new ArrayList();
        try {

            String sql = "SELECT * FROM photo";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                photoList.add(new Photo(rs.getString("id"),
                        rs.getString("namephoto"),
                        rs.getBytes("filephoto")));

            }
        } catch (SQLException ex) {
            Logger.getLogger(PhotoDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return photoList;
    }

    public Photo findByID(String id) {

        for (Photo photo : getInstance().getAll()) {
            if (photo.getId().equals(id)) {
                return photo;
            }
        }

        return null;
    }

    public int update(Photo photo) {

        for (int i = 0; i < getInstance().getAll().size(); i++) {
            if (getInstance().getAll().get(i).getId().equals(photo.getId())) {
                getInstance().getAll().set(i, photo);
                return i;
            }

        }
        return -1;
    }

    public int save(Photo photo) {
        getInstance().getAll().add(photo);
        return 1;

    }

    public int delete(String id) {
        Photo photo = findByID(id);
        if (photo != null) {
            getInstance().getAll().remove(photo);
            return 1;

        }
        return 0;
    }

    // Lấy ra một cuốn sách dựa trên mã sách
    public Photo getOne(String id) {

        PreparedStatement stm;
        ResultSet rs;

        try {

            String sql = "SELECT * FROM photo WHERE id = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            if (rs.next()) {
                return new Photo(rs.getString("id"),
                        rs.getString("namephoto"),
                        rs.getBytes("filephoto"));

            }

        } catch (Exception ex) {
            Logger.getLogger(PhotoDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Lấy ra các cuốn sách của tác giả nào đó
    public List<Photo> getAllByPhotos(String id) {

        PreparedStatement stm;
        ResultSet rs;

        List<Photo> photoList = new ArrayList();

        try {

            String sql = "SELECT * FROM photo WHERE namephoto = ?";
            stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            rs = stm.executeQuery();
            while (rs.next()) {
                photoList.add(new Photo(rs.getString("id"),
                        rs.getString("namephoto"),
                        rs.getBytes("filephoto")));

            }
            return photoList;

        } catch (Exception ex) {
            Logger.getLogger(PhotoDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Thêm mới 1 cuốn sách vào kho
    public String addOne(Photo photo) {
    String sql = "INSERT INTO photos (id, name, filephoto) VALUES (?, ?, ?)";
    
            
    try (Connection conn = DBUtil.makeConnection(); 
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setString(1, photo.getId());
        stmt.setString(2, photo.getNamephoto());
        stmt.setBytes(3, photo.getFilephoto()); // Set the image as a byte array

        int rowsAffected = stmt.executeUpdate();
        if (rowsAffected > 0) {
            return "Success";
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;
}

    // Cập nhật thông tin một cuốn sách - không cập nhật mã sách
    public boolean updateOne(Photo photo) {

        PreparedStatement stm;

        try {
            String sql = ""
                    + "UPDATE photo "
                    + "SET namephoto = ?, filephoto = ? "
                    + "WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, photo.getId());
            stm.setString(2, photo.getNamephoto());

            stm.setBytes(3, photo.getFilephoto());

            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(PhotoDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    // Xóa một cuốn sách dựa trên mã sách
    public boolean deleteOne(String id) {

        PreparedStatement stm;

        try {

            String sql = "DELETE FROM photo WHERE id = ?";
            stm = conn.prepareStatement(sql);

            stm.setString(1, id);
            if (stm.executeUpdate() > 0) {
                return true;
            }
        } catch (Exception ex) {
            Logger.getLogger(PhotoDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////
    public static void main(String[] args) {

        // 1. Test select *
        //System.out.println("All of photos: \n" + getInstance().getAll()); //gọi thầm tên em
        // 2. Test select where isbn = ?
        //System.out.println("A photo by id: " + getInstance().getOne("2518407786529"));
        // 3. Test select where author = ?
        //System.out.println("Photos by author: " + getInstance().getAllByAuthor("Paulo Coelho"));
        // 4. Test update a photo
        //getInstance().updateOne(new Photo("2518407786529", "Nhà giả kim kim", "Paulo Coelho", 2, 2021));
        // 3. Test select where author = ? again
        //System.out.println(getInstance().getAllByAuthor("Paulo Coelho"));
        // 5. Test delete a photo
        //getInstance().deleteOne("thietbibangten003");

        // 1. Test select * again
        //System.out.println("All of photos: \n" + getInstance().getAll()); //gọi thầm tên em
        // 6. Test add a new photo
        //getInstance().addOne(new Photo("BT2", "7.5inch7color","bt1",1,"100%"));
        // 1. Test select * again
        System.out.println("All of photos: \n" + getInstance().getAll()); //gọi thầm tên em

    }

}
