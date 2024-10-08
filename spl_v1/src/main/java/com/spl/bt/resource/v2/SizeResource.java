package com.spl.bt.resource.v2;

import java.util.*;
import com.spl.bt.dto.Size;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("v2/sizes")
public class SizeResource {

    private List<Size> list = new ArrayList();

    public SizeResource() {
        list.add(new Size("2", "7.5inch7color", 800, 480));
        list.add(new Size("2", "7.5inch3color", 800, 480));
        list.add(new Size("3", "10.2inch7color", 1200, 720));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Size> getAll() {
        return list;
    }

    @GET
    @Path("{masize}")
    @Produces(MediaType.APPLICATION_JSON)
    public Size getOne(@PathParam("masize") String id) {
        for (Size x : list) {
            if (x.getId().equalsIgnoreCase(id));
            return x;

        }
        return null;
    }

}
