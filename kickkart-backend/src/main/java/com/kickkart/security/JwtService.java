package com.kickkart.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET = "mySecretSuperKeyForJwtAuthetication2026";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generatedToken(String email ){

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+ 86000000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public  String extractEmail(String token){
        return extractClaims(token).getSubject();
    }

    private Claims extractClaims(String token){
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email);
    }
}

