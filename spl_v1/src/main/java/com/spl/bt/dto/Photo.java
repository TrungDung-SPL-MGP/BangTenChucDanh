package com.spl.bt.dto;

import java.io.Serializable;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor

@Getter
@Setter
@ToString
public class Photo implements Serializable {

    private int photoID;
    private String title;
    private String filePath;
    private int sizeKB;
    private String format;
    private Timestamp createdAt;

   
}


