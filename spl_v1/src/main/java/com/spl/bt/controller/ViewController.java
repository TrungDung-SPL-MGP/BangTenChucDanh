
package com.spl.bt.controller;

import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;  // Added this import
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ViewController {

    @Autowired
    private MessageSource messageSource;

    @RequestMapping("/")
    public String home(Model model, @RequestParam(value = "lang", defaultValue = "en") String lang) {
        Locale locale = new Locale(lang);  // Set locale based on the lang parameter
        String greeting = messageSource.getMessage("greeting", null, locale);  // Get message based on locale
        model.addAttribute("greeting", greeting);  // Add message to model
        return "index";  // Returns the JSP or HTML page to display
    }
}

