package com.spl.bt.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;



import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;


@MultipartConfig
public class AddPhotoServlet extends HttpServlet {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/bangten";
    private static final String DB_USER = "sa";
    private static final String DB_PASSWORD = "123456";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part filePart = request.getPart("file"); // "file" là tên của trường input trong form
        String fileName = filePart.getSubmittedFileName(); // Lấy tên file
        String mimeType = filePart.getContentType(); // Lấy loại MIME của file

        // Kiểm tra nếu file là hình ảnh
        if (mimeType != null && (mimeType.equals("image/jpeg") || mimeType.equals("image/png") || mimeType.equals("image/gif"))) {
            // Kết nối cơ sở dữ liệu và lưu hình ảnh
            try ( InputStream fileContent = filePart.getInputStream();  Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

                String sql = "INSERT INTO files (file_name, file_data) VALUES (?, ?)";
                PreparedStatement statement = conn.prepareStatement(sql);
                statement.setString(1, fileName);
                statement.setBlob(2, fileContent);

                // Thực thi câu lệnh và kiểm tra kết quả
                int row = statement.executeUpdate();
                if (row > 0) {
                    response.getWriter().println("Hình ảnh đã được tải lên và lưu vào cơ sở dữ liệu.");
                }
            } catch (Exception ex) {
                response.getWriter().println("Lỗi: " + ex.getMessage());
            }
        } else {
            response.getWriter().println("Chỉ có thể tải lên file hình ảnh (JPG, PNG, GIF).");
        }
    }
}
