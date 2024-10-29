
package com.spl.bt.dao;

import com.spl.bt.dto.Image;
import com.spl.bt.util.DBUtil;

import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ImageDAO implements Serializable {

    private static ImageDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    // Cấm new trực tiếp ImageDAO, chỉ đi qua con đường lấy trực tiếp ImageDAO từ hàm static
    private ImageDAO() {
    }

    public static ImageDAO getInstance() {
        if (instance == null) {
            instance = new ImageDAO();
        }
        return instance;
    }

    // Lấy ra tất cả ảnh trong kho
    public List<Image> getAll() {
        PreparedStatement stm;
        ResultSet rs;

        List<Image> imageList = new ArrayList<>();
        try {
            String sql = "SELECT * FROM images";
            stm = conn.prepareStatement(sql);
            rs = stm.executeQuery();
            while (rs.next()) {
                imageList.add(new Image(rs.getInt("id"),
                        rs.getString("name"),
                        rs.getBytes("image_data")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(ImageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return imageList;
    }

    public Image findByID(int id) {
        for (Image image : getInstance().getAll()) {
            if (image.getId() == id) {
                return image;
            }
        }
        return null;
    }

    public boolean update(Image image) {
        String sql = "UPDATE images SET name = ?, image_data = ? WHERE id = ?";
        try (PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setString(1, image.getName());
            stm.setBytes(2, image.getImageData());
            stm.setInt(3, image.getId());
            return stm.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(ImageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public boolean save(Image image) {
        String sql = "INSERT INTO images (name, image_data) VALUES (?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, image.getName());
            stmt.setBytes(2, image.getImageData());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            Logger.getLogger(ImageDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM images WHERE id = ?";
        try (PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setInt(1, id);
            return stm.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(ImageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public Image getOne(int id) {
        String sql = "SELECT * FROM images WHERE id = ?";
        try (PreparedStatement stm = conn.prepareStatement(sql)) {
            stm.setInt(1, id);
            ResultSet rs = stm.executeQuery();
            if (rs.next()) {
                return new Image(rs.getInt("id"),
                        rs.getString("name"),
                        rs.getBytes("image_data"));
            }
        } catch (SQLException ex) {
            Logger.getLogger(ImageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static void main(String[] args) {
        // Test các phương thức của ImageDAO
        System.out.println("All images: \n" + getInstance().getAll());

        // Thêm mới một ảnh
        Image newImage = new Image(1, "Sample Image", new byte[]{ /* byte array data */ });
        if (getInstance().save(newImage)) {
            System.out.println("Image added successfully.");
        }

        // Lấy và in ra một ảnh
        Image image = getInstance().getOne(1);
        System.out.println("Retrieved image: " + image);

        // Cập nhật thông tin ảnh
        if (image != null) {
            image.setName("Updated Sample Image");
            getInstance().update(image);
            System.out.println("Image updated successfully.");
        }

        // Xóa một ảnh
        if (getInstance().delete(1)) {
            System.out.println("Image deleted successfully.");
        }
    }
}

