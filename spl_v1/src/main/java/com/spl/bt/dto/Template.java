
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
public class Template implements Serializable {
    String id;
    String nametem;
    String idphoto;
    String idsize;
            
}
