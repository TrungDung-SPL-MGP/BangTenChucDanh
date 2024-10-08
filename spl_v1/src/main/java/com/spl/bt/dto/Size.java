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
public class Size implements Serializable {

    private String id;
    private String namesize;
    private int width;
    private int height;

}