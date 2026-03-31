package com.mentorai.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkeymysecretkey";

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24; // 24 hours

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ✅ GENERATE TOKEN
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ EXTRACT EMAIL
    public String extractEmail(String token) {

        return extractAllClaims(token).getSubject();
    }

    // ✅ EXTRACT ROLE
    public String extractRole(String token) {

        return extractAllClaims(token).get("role", String.class);
    }

    // ✅ VALIDATE TOKEN
    public boolean validateToken(String token) {

        extractAllClaims(token);
        return true;
    }

    // ✅ CORRECT PARSER METHOD (NEW VERSION)
    private Claims extractAllClaims(String token) {

        return Jwts
                .parserBuilder()                 // ✅ correct
                .setSigningKey(getSignKey())    // ✅ correct
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}