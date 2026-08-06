package com.kickkart.service;

import com.kickkart.dto.request.*;
import com.kickkart.entity.AuthProvider;
import com.kickkart.entity.Users;
import com.kickkart.repository.UserRepository;
import com.kickkart.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Users user = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .verified(false)
                .provider(AuthProvider.LOCAL)
                .role("USER")
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        emailService.sendWelcomeEmail(
                user.getEmail(),
                user.getFullName()
        );

        return "User Registered Successfully";
    }

    @Override
    public String login(LoginRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (user.getProvider() == AuthProvider.GOOGLE) {
            throw new RuntimeException(
                    "This account uses Google Sign-In. Please login with Google."
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtService.generatedToken(user.getEmail());
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (user.getProvider() == AuthProvider.GOOGLE) {
            throw new RuntimeException(
                    "This account uses Google Sign-In. Reset your password through Google."
            );
        }

        String otp = generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        emailService.sendOtpEmail(
                user.getEmail(),
                user.getFullName(),
                otp
        );

        return "OTP Sent Successfully";
    }

    @Override
    public String verifyOtp(VerifyOtpRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        validateOtp(user, request.getOtp());

        return "OTP Verified Successfully";
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        validateOtp(user, request.getOtp());

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Password Reset Successfully";
    }

    // -------------------- Helper Methods --------------------

    private String generateOtp() {
        return String.format("%06d", secureRandom.nextInt(1_000_000));
    }

    private void validateOtp(Users user, String otp) {

        if (user.getOtp() == null) {
            throw new RuntimeException("OTP Not Generated");
        }

        if (!user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }
    }
}