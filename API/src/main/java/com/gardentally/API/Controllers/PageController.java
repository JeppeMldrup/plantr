package com.gardentally.API.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gardentally.API.Services.RequestService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/")
public class PageController {
    private final RequestService requestService;

    @GetMapping
    public String getIndex(Model model){
        model.addAttribute("name", "Welcome to your garden!");
        model.addAttribute("fragment", "fragments/home :: home_body");
        return "layout";
    }

    @GetMapping("/login")
    public String getLogin(Model model){
        return "index";
    }

    @GetMapping("/home")
    public String getHome(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        model.addAttribute("name", user.getAttribute("email"));

        if (requestService.htmxrequest(request)){
            return "fragments/home :: home_body";
        }

        model.addAttribute("fragment", "fragments/home :: home_body");
        return "layout";
    }

    @GetMapping("/empty")
    public ResponseEntity<Object> getEmpty(){
        return ResponseEntity.ok().build();
    }
}
