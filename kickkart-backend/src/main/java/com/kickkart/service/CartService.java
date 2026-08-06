package com.kickkart.service;

import com.kickkart.dto.request.CartRequest;
import com.kickkart.dto.response.CartResponse;

import java.util.List;

public interface CartService {

    CartResponse addToCart(String token, CartRequest request);

    List<CartResponse> getMyCart(String token);

    CartResponse updateQuantity(String token, Long cartId, Integer quantity);

    void removeFromCart(String token, Long cartId);

    void clearCart(String token);
}