package com.mentorai.service;

import com.mentorai.model.User;
import com.mentorai.dto.LoginResponse;
import com.mentorai.model.Role;
import com.mentorai.repository.UserRepository;
import com.mentorai.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
 // Helper method (OPTIONAL but clean)
    private String trim(String value) {
        return value == null ? null : value.trim();
    }

    // REGISTER
    public String register(User user) {

        // ✅ Trim inputs
        user.setName(trim(user.getName()));
        user.setEmail(trim(user.getEmail()));
        user.setPassword(trim(user.getPassword()));

        // ✅ Validation
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new RuntimeException("Email cannot be empty");
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // ✅ Prevent duplicate users
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // ✅ Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public LoginResponse login(String email, String password) {

        // ✅ Trim inputs
        email = trim(email);
        password = trim(password);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // ✅ Secure error message
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                user.getName(),
                user.getEmail()
        );
    }
}