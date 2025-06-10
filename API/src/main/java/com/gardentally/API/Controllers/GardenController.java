package com.gardentally.API.Controllers;

import java.util.stream.Collectors;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gardentally.API.Services.GardenService;
import com.gardentally.API.Services.RequestService;
import com.gardentally.API.Services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/gardens")
public class GardenController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;

    public GardenController(GardenService gardenService, UserService userService, RequestService requestService){
        this.gardenService = gardenService;
        this.userService = userService;
        this.requestService = requestService;
    }
    
    @GetMapping
    public String getGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var userEntity = userService.getUserFromOauthUser(user);

        if (userEntity.isPresent()){
            model.addAttribute("gardens", userEntity.get().getGardens());
        }

        if (requestService.htmxrequest(request)){
            return "fragments/gardens :: gardens_body";
        }

        model.addAttribute("fragment", "fragments/gardens :: gardens_body");
        return "layout";
    }

    @GetMapping("/new")
    public String getGardenForm(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        if (requestService.htmxrequest(request)){
            return "fragments/gardens :: gardens_form";
        }

        model.addAttribute("fragment", "fragments/gardens :: gardens_form");
        return "layout";
    }

    @PostMapping("/new")
    public String postNewGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        System.out.print(request);
        String name = request.getParameter("name");
        var userEntity = userService.getUserFromOauthUser(user);

        if (name.isEmpty() || userEntity.isEmpty()){
            return "";
        }

        var garden = gardenService.createGardenForUser(name, userEntity.get());
        model.addAttribute("gardens", garden);
        return "fragments/gardens :: gardens_body";
    }

    @GetMapping("/{id}")
    public String getGardenWithId(@PathVariable("id") Long id, HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isPresent()){
            model.addAttribute("gardens", garden.get());
        }

        if (requestService.htmxrequest(request)){
            return "fragments/gardens :: gardens_body";
        }

        model.addAttribute("fragment", "fragments/gardens :: gardens_body");
        return "layout";
    }
}
