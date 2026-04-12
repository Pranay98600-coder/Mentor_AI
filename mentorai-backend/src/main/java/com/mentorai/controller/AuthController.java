package com.mentorai.controller;

import com.mentorai.dto.LoginRequest;
import com.mentorai.dto.LoginResponse;
import com.mentorai.model.User;
import com.mentorai.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Manual constructor injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
    	System.out.println("RAW PASSWORD FROM REQUEST: " + user.getPassword());
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}