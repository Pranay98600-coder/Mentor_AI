package com.mentorai.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/hello")
    public String hello(Authentication authentication) {

        String email = authentication.getName();

        return "Hello " + email + ", you accessed protected API!";
    }
}