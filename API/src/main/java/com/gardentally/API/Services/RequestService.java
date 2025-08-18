package com.gardentally.API.Services;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class RequestService {
    public Boolean htmxrequest(HttpServletRequest request){
        return "true".equals(request.getHeader("HX-Request"));
    }


    public String fragmentOnHtmxRequest(HttpServletRequest request, Model model, String fragment) {
        if (this.htmxrequest(request)){
            return fragment;
        }

        model.addAttribute("fragment", fragment);
        return "layout";
    }
}
