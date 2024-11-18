
package com.spl.bt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;
@RestController
public class GreetingController {
     @Autowired
    private MessageSource messageSource;

    @GetMapping("/greet")
    public String greet(@RequestParam(value = "lang", defaultValue = "en") String lang) {
        Locale locale = new Locale(lang); // Set the locale based on the query parameter
        return messageSource.getMessage("greeting", null, locale);  // Fetch the greeting message
    }
}
