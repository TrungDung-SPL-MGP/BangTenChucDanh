
package com.spl.bt.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.Collection;


@WebServlet("/UploadServlet")
@MultipartConfig(
        fileSizeThreshold = 1024 * 1024*3, // 1MB
        maxFileSize = 1024 * 1024 * 10, // 10MB
        maxRequestSize = 1024 * 1024 * 50 // 50MB
)
public class UploadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "uploads";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Create the upload directory if it doesn't exist
        String uploadPath = getServletContext().getRealPath("") + File.separator + UPLOAD_DIR;
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        // Get the uploaded files
        Collection<Part> parts = request.getParts();

        for (Part part : parts) {
          String filename =genarateFileName(part);
          part.write(uploadPath +File.separator + filename);
        }

        response.getWriter().println("Files uploaded successfully!");
        request.getRequestDispatcher("upload.jsp").forward(request, response);
    }

    private String genarateFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        String[] tokens = contentDisposition.split(";");
        for (String token : tokens) {
            if (token.trim().startsWith("filename")) {
                String originalFilename =token.substring(token.indexOf("=")+2,token.length()-1);
                String fileExtention = originalFilename.substring(originalFilename.lastIndexOf(".")+1);
                String timestamp =LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
                return timestamp+"."+fileExtention;
            }
        }
        return "";
    }
}