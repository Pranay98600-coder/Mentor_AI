package com.mentorai.controller;

import com.mentorai.dto.LoginRequest;
import com.mentorai.dto.LoginResponse;
import com.mentorai.dto.RegisterRequest;
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
    public String register(@RequestBody RegisterRequest request) {

        // 🔥 Debug (very important)
        System.out.println("🔥 NAME: " + request.getName());
        System.out.println("🔥 EMAIL: " + request.getEmail());
        System.out.println("🔥 PASSWORD: " + request.getPassword());

        // ✅ Convert DTO → Entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        // ✅ Call service
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}