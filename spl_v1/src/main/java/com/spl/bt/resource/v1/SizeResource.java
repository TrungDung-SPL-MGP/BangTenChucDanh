/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spl.bt.resource.v1;

import com.spl.bt.dto.Size;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("v1/sizes")
public class SizeResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String Sayhello() {
        return "we are the one";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Size getSize() {
        return new Size("1", "7.5inch7color", 800, 480);
    }

}
