package com.gardentally.API.Controllers;

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
import com.gardentally.API.Services.InviteService;
import com.gardentally.API.Services.RequestService;
import com.gardentally.API.Services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/gardens")
public class GardenController {
    private final GardenService gardenService;
    private final UserService userService;
    private final RequestService requestService;
    private final InviteService inviteService;
    
    @GetMapping
    public String getGarden(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var userEntity = userService.getUserFromOauthUser(user);

        if (userEntity.isPresent()){
            model.addAttribute("gardens", userEntity.get().getGardens());
        }

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/gardens :: gardens_body");
    }

    @GetMapping("/new")
    public String getGardenForm(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        return requestService.fragmentOnHtmxRequest(request, model, "fragments/gardens :: gardens_form");
    }

    @GetMapping("/join")
    public String getGardenJoinForm(HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        return requestService.fragmentOnHtmxRequest(request, model, "fragments/gardens :: join_gardens_form");
    }

    @PostMapping("/join")
    public String postJoinGardenWithInviteCode(
        @RequestParam("code") @NotBlank String code,
        HttpServletRequest request,
        Model model,
        @AuthenticationPrincipal OAuth2User user
    ){
        System.out.print(request);
        var userEntity = userService.getUserFromOauthUser(user);

        if (userEntity.isEmpty()){
            return "redirect:/";
        }

        var garden = inviteService.getGardenFromInviteCode(code);

        if (garden.isEmpty()){
            model.addAttribute("notification_message", "Invite code is invalid");
            //model.addAttribute("fragment", "fragments/gardens :: join_gardens_form");
            return "fragments/notification :: combinedNotification(fragment='fragments/gardens :: join_gardens_form')";
        }

        gardenService.addUserToGarden(userEntity.get(), garden.get());
        inviteService.deleteInviteCode(code);

        model.addAttribute("gardens", garden);
        return "fragments/gardens :: gardens_body";
    }


    @PostMapping("/new")
    public String postNewGarden(
        @RequestParam("name") @NotBlank String name,
        HttpServletRequest request,
        Model model,
        @AuthenticationPrincipal OAuth2User user
    ){
        System.out.print(request);
        var userEntity = userService.getUserFromOauthUser(user);

        if (userEntity.isEmpty()){
            return "redirect:/";
        }

        var garden = gardenService.createGardenForUser(name, userEntity.get());
        model.addAttribute("gardens", garden);
        return "fragments/gardens :: gardens_body";
    }

    @GetMapping("/{id}")
    public String getGardenWithId(@PathVariable("id") Long id, HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isPresent()){
            model.addAttribute("garden", garden.get());
        }

        return requestService.fragmentOnHtmxRequest(request, model, "fragments/garden :: garden");
    }

    @PostMapping("/{id}/invite")
    public String getInviteForGarden(@PathVariable("id") Long id, HttpServletRequest request, Model model, @AuthenticationPrincipal OAuth2User user){
        var garden = gardenService.getGardenFromId(id);

        if (garden.isEmpty() || !userService.userOwnsGarden(user, id)){
            return "redirect:/gardens";
        }

        var invite = inviteService.getInviteCodeForGarden(garden.get());
        model.addAttribute("invite", invite);
        
        return requestService.fragmentOnHtmxRequest(request, model, "fragments/garden :: invite");
    }
}
