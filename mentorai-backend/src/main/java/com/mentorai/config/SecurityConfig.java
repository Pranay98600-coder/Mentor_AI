package com.mentorai.config;

import com.mentorai.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // 🔥 MAIN SECURITY CONFIG
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {}) // use your CorsConfig
            .csrf(csrf -> csrf.disable())

            .formLogin(form -> form.disable())   // ❌ disable default login
            .httpBasic(basic -> basic.disable()) // ❌ disable basic auth

            .authorizeHttpRequests(auth -> auth

                // ✅ CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ PUBLIC
                .requestMatchers("/", "/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // 🔐 ROLE BASED (optional)
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")

                // 🔒 PROTECTED
                .requestMatchers("/api/roadmap/**").authenticated()

                // 🔒 EVERYTHING ELSE
                .anyRequest().authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔥 JWT FILTER
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔥 VERY IMPORTANT → DISABLE DEFAULT SPRING USER
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            throw new UsernameNotFoundException("User not found");
        };
    }
}