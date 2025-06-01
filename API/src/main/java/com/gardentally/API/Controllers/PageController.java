package com.gardentally.API.Controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PageController {
    
    @GetMapping
    public String getIndex(Model model){
        model.addAttribute("content", "Hello!");
        return "index";
    }

    @GetMapping("/login")
    public String getLogin(Model model){
        return "login";
    }

    @GetMapping("/home")
    public String getHome(Model model, @AuthenticationPrincipal OAuth2User user){
        model.addAttribute("name", user.getAttribute("name"));
        return "home";
    }
}
