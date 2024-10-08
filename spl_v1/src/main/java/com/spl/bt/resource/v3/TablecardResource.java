/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.resource.v3;

import com.spl.bt.dao.TablecardDAO;
import com.spl.bt.dto.Tablecard;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("v3/tablecards")
public class TablecardResource {

    private TablecardDAO dao = TablecardDAO.getInstance();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tablecard> getAll() {
        return dao.getAll();
    }
}
