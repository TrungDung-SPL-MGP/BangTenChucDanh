package com.spl.bt.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor

@Getter
@Setter
@ToString
public class Room implements Serializable {

    private String id;
    private String nameroom;
    private String idtemplate;
    private String idsize;
    private String datestart;
    private int width;
    private int height;
    private String room;
}
