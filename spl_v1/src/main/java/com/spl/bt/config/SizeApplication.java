package com.spl.bt.config;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("api")
public class SizeApplication extends ResourceConfig {

    public SizeApplication() {
        packages("com.spl.bt.resource");//ham thua ke tu class cha

    }
}
