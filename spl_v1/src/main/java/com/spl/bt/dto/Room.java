
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
public class Room implements Serializable{
    String id;
    String nameroom;
    String idtemplate;
    String idsize;
    String datestart;
    int width;
    int height;
    String room;
    int qty;

  
            
}
