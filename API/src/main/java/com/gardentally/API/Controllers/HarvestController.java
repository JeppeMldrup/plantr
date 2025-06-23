package com.gardentally.API.Controllers;

import java.math.BigDecimal;
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
import org.springframework.web.bind.annotation.RequestParam;

import com.gardentally.API.Services.GardenService;
import com.gardentally.API.Services.HarvestService;
import com.gardentally.API.Services.RequestService;
import com.gardentally.API.Services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/gardens/{id}/harvest")
public class HarvestController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;
    private final HarvestService harvestService;
    
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
    public String getVegetableCreationForm(
        @PathVariable("id") Long id,
        @RequestParam("vegetable") Long vegetable,
        @RequestParam("harvest_date") LocalDate harvest_date,
        @RequestParam("weight") BigDecimal weight,
        @RequestParam("amount") Long amount, 
        HttpServletRequest request,
        Model model,
        @AuthenticationPrincipal OAuth2User user
    ){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)){
            return "redirect:/gardens";
        }

        var harvest = harvestService.createHarvestForVegetable(
            vegetable,
            harvest_date,
            weight,
            amount
        );

        if (harvest.isEmpty()){
            return "redirect:/gardens";
        }

        if (requestService.htmxrequest(request)){
            return "fragments/harvest :: confirmation";
        }

        model.addAttribute("fragment", "fragments/harvest :: form_with_confirmation");
        return "layout";
    }
}
