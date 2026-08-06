package com.kickkart.service.impl;

import com.kickkart.dto.request.CartRequest;
import com.kickkart.dto.response.CartResponse;
import com.kickkart.entity.Cart;
import com.kickkart.entity.Product;
import com.kickkart.entity.Users;
import com.kickkart.repository.CartRepository;
import com.kickkart.repository.ProductRepository;
import com.kickkart.repository.UserRepository;
import com.kickkart.security.JwtService;
import com.kickkart.service.CartService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public CartResponse addToCart(String token, CartRequest request) {

        String email = jwtService.extractEmail(token.replace("Bearer ", ""));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        if (request.getQuantity() > product.getStock()) {
            throw new IllegalArgumentException("Insufficient stock");
        }

        Cart cart = cartRepository.findByUserAndProductAndSize(
                user,
                product,
                request.getSize()
        ).orElse(null);

        if (cart != null) {

            int newQty = cart.getQuantity() + request.getQuantity();

            if (newQty > product.getStock()) {
                throw new IllegalArgumentException("Insufficient stock");
            }

            cart.setQuantity(newQty);

        } else {

            cart = Cart.builder()
                    .user(user)
                    .product(product)
                    .quantity(request.getQuantity())
                    .size(request.getSize())
                    .build();

        }

        Cart saved = cartRepository.save(cart);

        return mapToResponse(saved);
    }

    @Override
    public List<CartResponse> getMyCart(String token) {

        String email = jwtService.extractEmail(token.replace("Bearer ", ""));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return cartRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CartResponse updateQuantity(String token,
                                       Long cartId,
                                       Integer quantity) {

        String email = jwtService.extractEmail(token.replace("Bearer ", ""));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        if (!cart.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        if (quantity > cart.getProduct().getStock()) {
            throw new IllegalArgumentException("Insufficient stock");
        }

        cart.setQuantity(quantity);

        Cart updated = cartRepository.save(cart);

        return mapToResponse(updated);
    }

    @Override
    public void removeFromCart(String token, Long cartId) {

        String email = jwtService.extractEmail(token.replace("Bearer ", ""));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        if (!cart.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        cartRepository.delete(cart);
    }

    @Override
    public void clearCart(String token) {

        String email = jwtService.extractEmail(token.replace("Bearer ", ""));

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        cartRepository.deleteByUser(user);
    }

    private CartResponse mapToResponse(Cart cart) {

        BigDecimal subtotal = cart.getProduct()
                .getPrice()
                .multiply(BigDecimal.valueOf(cart.getQuantity()));

        return CartResponse.builder()
                .cartId(cart.getId())
                .productId(cart.getProduct().getId())
                .productName(cart.getProduct().getName())
                .imageUrl(cart.getProduct().getImageUrl())
                .category(cart.getProduct().getCategory().name())
                .price(cart.getProduct().getPrice())
                .quantity(cart.getQuantity())
                .size(cart.getSize())
                .stock(cart.getProduct().getStock())
                .subtotal(subtotal)
                .build();
    }
}