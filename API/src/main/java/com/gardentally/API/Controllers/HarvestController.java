package com.gardentally.API.Controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;
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
import com.gardentally.API.Services.VegetableService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/gardens/{id}/harvest")
public class HarvestController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;
    private final VegetableService vegetableService;

    public HarvestController(GardenService gardenService, UserService userService, RequestService requestService, VegetableService vegetableService){
        this.gardenService = gardenService;
        this.userService = userService;
        this.requestService = requestService;
        this.vegetableService = vegetableService;
    }
    
    @GetMapping("/new")
    public String getHarvestForm(@PathVariable("id") Long id, HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)){
            return "redirect:/gardens";
        }

        model.addAttribute("vegetables", garden.get().getVegetables());
        model.addAttribute("garden_id", id);
        model.addAttribute("today", LocalDate.now().toString());

        if (requestService.htmxrequest(request)){
            return "fragments/harvest :: harvest_form";
        }

        model.addAttribute("fragment", "fragments/harvest :: harvest_form");
        return "layout";
    }

    @PostMapping("/new")
    public String getVegetableCreationForm(@PathVariable("id") Long id, HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)){
            return "redirect:/gardens";
        }

        if (requestService.htmxrequest(request)){
            return "fragments/harvest :: confirmation";
        }

        model.addAttribute("fragment", "fragments/harvest :: form_with_confirmation");
        return "layout";
    }
}
