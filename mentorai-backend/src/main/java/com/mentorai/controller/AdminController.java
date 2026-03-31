package com.mentorai.controller;

import com.mentorai.model.User;
import com.mentorai.repository.UserRepository;
import com.mentorai.model.Role;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // View all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete user
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted";
    }

    // Promote USER → ADMIN
    @PutMapping("/promote/{id}")
    public String promoteUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(Role.ADMIN);

        userRepository.save(user);

        return "User promoted to ADMIN";
    }
}