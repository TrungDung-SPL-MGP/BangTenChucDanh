package com.spl.bt.controller;

import com.spl.bt.dao.PhotoDAO;
import com.spl.bt.dto.Photo;
import jakarta.servlet.ServletException;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/photos")
public class PhotoServlet extends HttpServlet {

    private PhotoDAO photoDAO;

    @Override
    public void init() {
        photoDAO = new PhotoDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) action = "list";
        switch (action) {
            case "list":
                listPhotos(request, response);
                break;
            case "update":
                showUpdateForm(request, response);
                break;
            case "delete":
                showDeleteForm(request, response);
                break;
            default:
                listPhotos(request, response);
                break;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        switch (action) {
            case "add":
                addPhoto(request, response);
                break;
            case "update":
                updatePhoto(request, response);
                break;
            case "delete":
                deletePhoto(request, response);
                break;
            default:
                listPhotos(request, response);
                break;
        }
    }

    private void addPhoto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String title = request.getParameter("title");
        String filePath = request.getParameter("filePath");
        int sizeKB = Integer.parseInt(request.getParameter("sizeKB"));
        String format = request.getParameter("format");
        photoDAO.addPhoto(title, filePath, sizeKB, format);
        response.sendRedirect("listphoto.jsp");
    }

    private void updatePhoto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int photoID = Integer.parseInt(request.getParameter("photoID"));
        String title = request.getParameter("title");
        String filePath = request.getParameter("filePath");
        int sizeKB = Integer.parseInt(request.getParameter("sizeKB"));
        String format = request.getParameter("format");
        photoDAO.updatePhoto(photoID, title, filePath, sizeKB, format);
        response.sendRedirect("listphoto.jsp");
    }

    private void deletePhoto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int photoID = Integer.parseInt(request.getParameter("photoID"));
        photoDAO.deletePhoto(photoID);
        response.sendRedirect("listphoto.jsp");
    }

    private void listPhotos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Photo> photos = photoDAO.getAllPhotos();
        request.setAttribute("photos", photos);
        request.getRequestDispatcher("listphoto.jsp").forward(request, response);
    }

    private void showUpdateForm(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int photoID = Integer.parseInt(request.getParameter("photoID"));
        Photo existingPhoto = photoDAO.getPhotoById(photoID);
        request.setAttribute("photo", existingPhoto);
        request.getRequestDispatcher("updatephoto.jsp").forward(request, response);
    }

    private void showDeleteForm(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int photoID = Integer.parseInt(request.getParameter("photoID"));
        request.setAttribute("photoID", photoID);
        request.getRequestDispatcher("deletephoto.jsp").forward(request, response);
    }
}
