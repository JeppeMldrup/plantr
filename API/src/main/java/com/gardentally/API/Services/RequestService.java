package com.gardentally.API.Services;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class RequestService {
    public Boolean htmxrequest(HttpServletRequest request){
        return "true".equals(request.getHeader("HX-Request"));
    }
}
