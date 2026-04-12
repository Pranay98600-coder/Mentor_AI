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

    // REGISTER
    public String register(User user) {
        // ✅ Trim inputs for safety (defense in depth)
        if (user.getName() != null) {
            user.setName(user.getName().trim());
        }
        if (user.getEmail() != null) {
            user.setEmail(user.getEmail().trim());
        }
        if (user.getPassword() != null) {
            user.setPassword(user.getPassword().trim());
        }

        // ✅ Encode trimmed password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole(Role.USER);

        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public LoginResponse login(String email, String password) {
        // ✅ Trim inputs for safety
        email = email != null ? email.trim() : email;
        password = password != null ? password.trim() : password;

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
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