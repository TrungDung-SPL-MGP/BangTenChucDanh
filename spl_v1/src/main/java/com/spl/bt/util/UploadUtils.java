/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.util;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.http.Part;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.io.FilenameUtils;



public class UploadUtils {
    public static String processUpload(String filename,HttpServletRequest request,String storeFolder,String storeFilename ) throws ServletException, IOException{
        Part filePart =request.getPart(filename);   
        
        if(filePart==null||filePart.getSize()==0){
        
        return "";
        }
        if(storeFolder==null){
        storeFolder=Constant.DIR;
        
        }
        if(storeFilename==null){
            storeFilename =Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
        
        }else{
        
            storeFilename+="."+FilenameUtils.getExtension(Paths.get(filePart.getSubmittedFileName()).getFileName().toString());
        }
        Path uploadPath =Paths.get(storeFolder);
        if(!Files.exists(uploadPath)){
        Files.createDirectories(uploadPath);
        }
        filePart.write(Paths.get(filePart.getSubmittedFileName()).getFileName().toString());
        
        
        return storeFilename;
    }
}
