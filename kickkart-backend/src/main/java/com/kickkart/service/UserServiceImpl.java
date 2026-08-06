package com.kickkart.service;

import com.kickkart.dto.response.UserResponse;
import com.kickkart.entity.Users;
import com.kickkart.repository.UserRepository;
import com.kickkart.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public UserResponse getCurrentUser(String token) {

        String email = jwtService.extractEmail(token.substring(7));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}