package com.spl.bt.dao;

import com.spl.bt.dto.Photo;
import com.spl.bt.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PhotoDAO {

    // Method to add a new photo to the database
    public boolean addPhoto(String title, String filePath, int sizeKB, String format) {
        String sql = "INSERT INTO photo (title, filePath, sizeKB, format) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBUtil.makeConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, title);
            stmt.setString(2, filePath);
            stmt.setInt(3, sizeKB);
            stmt.setString(4, format);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to retrieve a photo by ID
    public Photo getPhotoById(int photoID) {
        String sql = "SELECT * FROM photo WHERE photoID = ?";
        try (Connection conn = DBUtil.makeConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, photoID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Photo(
                        rs.getInt("PhotoID"),
                        rs.getString("Title"),
                        rs.getString("FilePath"),
                        rs.getInt("SizeKB"),
                        rs.getString("Format"),
                        rs.getTimestamp("CreatedAt")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Method to retrieve all photos
    public List<Photo> getAllPhotos() {
        List<Photo> photos = new ArrayList<>();
        String sql = "SELECT * FROM Photo";
        try (Connection conn = DBUtil.makeConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                photos.add(new Photo(
                        rs.getInt("photoID"),
                        rs.getString("title"),
                        rs.getString("filePath"),
                        rs.getInt("sizeKB"),
                        rs.getString("format"),
                        rs.getTimestamp("createdAt")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return photos;
    }

    // Method to update a photo
    public boolean updatePhoto(int photoID, String title, String filePath, int sizeKB, String format) {
        String sql = "UPDATE photo SET title = ?, filePath = ?, sizeKB = ?, format = ? WHERE photoID = ?";
        try (Connection conn = DBUtil.makeConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, title);
            stmt.setString(2, filePath);
            stmt.setInt(3, sizeKB);
            stmt.setString(4, format);
            stmt.setInt(5, photoID);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to delete a photo by ID
    public boolean deletePhoto(int photoID) {
        String sql = "DELETE FROM photo WHERE photoID = ?";
        try (Connection conn = DBUtil.makeConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, photoID);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
