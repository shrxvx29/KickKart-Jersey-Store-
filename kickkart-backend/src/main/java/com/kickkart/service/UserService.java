package com.kickkart.service;

import com.kickkart.dto.response.UserResponse;

public interface UserService {

    UserResponse getCurrentUser(String token);

}