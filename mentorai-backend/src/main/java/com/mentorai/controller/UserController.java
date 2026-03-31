package com.mentorai.controller;

import com.mentorai.model.User;
import com.mentorai.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/user/me")
    public User getCurrentUser(Authentication authentication) {

        String email = authentication.getName();

        return userService.getCurrentUser(email);
    }
    
    @GetMapping("/api/user/dashboard")
    public String userDashboard() {

        return "Welcome USER";
    }
    
    

        @GetMapping("/dashboard")
        public String dashboard() {
            return "Welcome USER dashboard";
        }
}