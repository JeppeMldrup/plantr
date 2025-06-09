package com.gardentally.API.Controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gardentally.API.Services.GardenService;
import com.gardentally.API.Services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/gardens")
public class GardenController {
    private final GardenService gardenService;
    private final UserService userService;

    public GardenController(GardenService gardenService, UserService userService){
        this.gardenService = gardenService;
        this.userService = userService;
    }
    
    @GetMapping
    public String getGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        String oauthid = user.getAttribute("sub");
        var userEntity = userService.getUserFromOauthid(oauthid);

        if (userEntity.isPresent()){
            model.addAttribute("gardens", userEntity.get().getGardens());
        }

        if ("true".equals(request.getHeader("HX-Request"))){
            return "fragments/gardens :: gardens_body";
        }

        model.addAttribute("fragment", "fragments/gardens :: gardens_body");
        return "layout";
    }

    @GetMapping("/new")
    public String getGardenForm(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        if ("true".equals(request.getHeader("HX-Request"))){
            return "fragments/gardens :: gardens_form";
        }

        model.addAttribute("fragment", "fragments/gardens :: gardens_form");
        return "layout";
    }

    @PostMapping("/new")
    public String postNewGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        System.out.print(request);
        String name = request.getParameter("name");
        var userEntity = userService.getUserFromOauthid(user.getAttribute("sub"));
        if (name.isEmpty() || userEntity.isEmpty()){
            return "";
        }

        var garden = gardenService.createGardenForUser(name, userEntity.get());
        model.addAttribute("gardens", garden);
        return "fragments/gardens :: gardens_body";
    }
}
