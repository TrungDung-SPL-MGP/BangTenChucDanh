
package com.spl.bt.dto;


import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor

@Getter
@Setter
@ToString
public class Photo implements Serializable {

    String id;
    String namephoto;
    byte[] filephoto;
    

   
}
