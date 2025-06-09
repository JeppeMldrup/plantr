package com.gardentally.API.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gardentally.API.Repositories.VegRepository;
import com.gardentally.API.Services.UserService;

@Controller
@RequestMapping("/")
public class PageController {

    @Autowired
    VegRepository vegRepository;

    @Autowired
    UserService userService;
    
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
        model.addAttribute("name", user.getAttribute("email"));
        return "home";
    }

    @GetMapping("/harvest")
    public String getHarvest(Model model, @AuthenticationPrincipal OAuth2User user){
        return "add_harvest";
    }

    @GetMapping("/creategarden")
    public String getCreateGarden(Model model, @AuthenticationPrincipal OAuth2User user){
        return "create_garden";
    }

    @GetMapping("/garden")
    public String getGarden(Model model, @AuthenticationPrincipal OAuth2User user){
        var userEntity = userService.getUser(user.getAttribute("email"));
        return "garden";
    }
}
