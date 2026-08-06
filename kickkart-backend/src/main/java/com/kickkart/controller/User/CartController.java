package com.kickkart.controller.User;

import com.kickkart.dto.request.CartRequest;
import com.kickkart.dto.response.CartResponse;
import com.kickkart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponse> addToCart(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody CartRequest request
    ) {

        return ResponseEntity.ok(cartService.addToCart(token, request));
    }

    @GetMapping
    public ResponseEntity<List<CartResponse>> getMyCart(
            @RequestHeader("Authorization") String token
    ) {

        return ResponseEntity.ok(cartService.getMyCart(token));
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<CartResponse> updateQuantity(
            @RequestHeader("Authorization") String token,
            @PathVariable Long cartId,
            @RequestParam Integer quantity
    ) {

        return ResponseEntity.ok(
                cartService.updateQuantity(token, cartId, quantity)
        );
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> removeFromCart(
            @RequestHeader("Authorization") String token,
            @PathVariable Long cartId
    ) {

        cartService.removeFromCart(token, cartId);

        return ResponseEntity.ok("Cart item removed successfully.");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(
            @RequestHeader("Authorization") String token
    ) {

        cartService.clearCart(token);

        return ResponseEntity.ok("Cart cleared successfully.");
    }
}