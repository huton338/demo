package controller;

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
    private String chat(Model model,Locale locale){
        return "chat";
    }

    @RequestMapping(value="/test01")
    private String test01(Model model,Locale locale){
        return "test01";
    }


}
