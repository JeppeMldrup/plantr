package com.gardentally.API.Controllers;

import java.util.stream.Collectors;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gardentally.API.Services.GardenService;
import com.gardentally.API.Services.RequestService;
import com.gardentally.API.Services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/gardens/{id}/vegetables")
public class VegetableController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;

    public VegetableController(GardenService gardenService, UserService userService, RequestService requestService){
        this.gardenService = gardenService;
        this.userService = userService;
        this.requestService = requestService;
    }
    
    @GetMapping
    public String getGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        String oauthid = user.getAttribute("sub");
        var userEntity = userService.getUserFromOauthid(oauthid);

        if (requestService.htmxrequest(request)){
            return "fragments/vegetables :: vegetables_body";
        }

        model.addAttribute("fragment", "fragments/vegetables :: vegetables_body");
        return "layout";
    }
}
