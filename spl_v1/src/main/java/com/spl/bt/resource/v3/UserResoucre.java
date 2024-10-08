
package com.spl.bt.resource.v3;

import com.spl.bt.dao.LoginDAO;
import com.spl.bt.dto.User;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("v3/users")
public class UserResoucre {

    private LoginDAO dao = LoginDAO.getInstance();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAll() {
        return dao.getAll();
    }
}
