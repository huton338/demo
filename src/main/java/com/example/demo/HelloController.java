package com.example.demo;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {

    @RequestMapping(value="/hello")
    private String hello(Model model){
        model.addAttribute("hello","Hello World");
        return "hello";
    }

    @RequestMapping(value="/chat")
    private String index(Model model,Locale locale){
        return "chat";
    }
}
