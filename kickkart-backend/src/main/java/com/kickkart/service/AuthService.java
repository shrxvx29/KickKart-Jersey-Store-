package com.kickkart.service;

import com.kickkart.dto.request.*;

public interface AuthService {
    String register(RegisterRequest request);
    String login(LoginRequest request);
    String forgotPassword(ForgotPasswordRequest request);
    String verifyOtp(VerifyOtpRequest request);
    String resetPassword(ResetPasswordRequest request);
}
