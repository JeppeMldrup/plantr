package com.gardentally.API.Controllers;

import java.math.BigDecimal;
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

import com.gardentally.API.Entities.Harvest;
import com.gardentally.API.Services.GardenService;
import com.gardentally.API.Services.RequestService;
import com.gardentally.API.Services.UserService;
import com.gardentally.API.Services.VegetableService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/gardens/{id}/vegetables")
public class VegetableController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;
    private final VegetableService vegetableService;

    @GetMapping
    public String getGarden(
            @PathVariable("id") Long id,
            HttpServletRequest request,
            Model model,
            @AuthenticationPrincipal OAuth2User user) {
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)) {
            return "redirect:/gardens";
        }

        model.addAttribute("vegetables", garden.get().getVegetables());
        model.addAttribute("garden_id", id);

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/vegetables :: vegetables_body");
    }

    @GetMapping("/new")
    public String getVegetableCreationForm(
            @PathVariable("id") Long id,
            HttpServletRequest request,
            Model model) {
        model.addAttribute("garden_id", id);
        model.addAttribute("today", LocalDate.now().toString());

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/vegetables :: vegetable_form");
    }

    @PostMapping("/new")
    public String createNewVegetable(
            @PathVariable("id") Long id,
            @RequestParam("name") @NotBlank String name,
            @RequestParam("plantingdate") LocalDate plantingDate,
            HttpServletRequest request,
            Model model,
            @AuthenticationPrincipal OAuth2User user) {
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)) {
            return "redirect:/gardens";
        }

        var veg = vegetableService.createNewVegForGarden(name, plantingDate, garden.get());

        model.addAttribute("vegetables", veg);
        model.addAttribute("garden_id", id);

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/vegetables :: vegetables_body");
    }

    @GetMapping("/{vegetable_id}")
    public String getVegetableStats(
            @PathVariable("id") Long id,
            @PathVariable("vegetable_id") Long vegetable_id,
            HttpServletRequest request,
            Model model,
            @AuthenticationPrincipal OAuth2User user) {
        var vegetable = vegetableService.getVegetableById(vegetable_id);

        var harvests = vegetable.map(veg -> veg.getHarvests());

        var totalWeight = harvests
                .map(
                        harvestList -> harvestList
                                .stream()
                                .map(Harvest::getWeight)
                                .reduce(BigDecimal::add)
                                .orElseGet(() -> BigDecimal.ZERO));

        var totalAmount = harvests
                .map(
                        harvestList -> harvestList
                                .stream()
                                .map(Harvest::getAmount)
                                .reduce((a, b) -> a + b)
                                .orElseGet(() -> 0L));

        model.addAttribute("weight", totalWeight.get());
        model.addAttribute("amount", totalAmount.get());

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/vegetables :: vegetable_stats");
    }
}
