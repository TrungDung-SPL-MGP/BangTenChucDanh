package com.spl.bt.resource.v3;

import com.spl.bt.dao.SizeDAO;
import com.spl.bt.dto.Size;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("v3/sizes")
public class SizeResource {

    private SizeDAO dao = SizeDAO.getInstance();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Size> getAll() {
        return dao.getAll();
    }
}
