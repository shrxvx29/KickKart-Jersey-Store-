package com.kickkart.security;

import com.kickkart.entity.AuthProvider;
import com.kickkart.entity.Users;
import com.kickkart.repository.UserRepository;
import com.kickkart.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {



    @Value("${frontend.url}")
    private String frontendUrl;

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (userRepository.findByEmail(email).isEmpty()) {

            Users user = Users.builder()
                    .fullName(name)
                    .email(email)
                    .password(null)
                    .verified(true)
                    .provider(AuthProvider.GOOGLE)
                    .role("USER")
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(user);
            emailService.sendWelcomeEmail(
                    user.getEmail(),
                    user.getFullName()
            );


        }

        String token = jwtService.generatedToken(email);

        response.sendRedirect(frontendUrl + "/oauth-success?token=" + token);
    }
}