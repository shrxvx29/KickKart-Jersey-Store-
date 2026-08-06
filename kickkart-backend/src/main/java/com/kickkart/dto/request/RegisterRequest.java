package com.kickkart.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Full Name must Required")
    private String fullName;

    @Email
    private String email;

    @NotBlank
    private String password;
}
