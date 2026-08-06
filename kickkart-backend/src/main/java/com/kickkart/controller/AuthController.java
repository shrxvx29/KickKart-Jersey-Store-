package com.kickkart.controller;


import com.kickkart.dto.request.*;
import com.kickkart.service.AuthService;
import com.kickkart.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    JwtService jwtService;


    @PostMapping("/register")
    public String register(@Valid@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public  String login(@Valid @RequestBody LoginRequest request){
        return authService.login(request);
    }


    @GetMapping("/extract")
    public String extract(@RequestParam String token) {

        return jwtService.extractEmail(token);

    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return authService.forgotPassword(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        return authService.verifyOtp(request);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }

}
