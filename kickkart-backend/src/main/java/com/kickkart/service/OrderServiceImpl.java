package com.kickkart.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.kickkart.dto.response.OrderItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kickkart.dto.request.OrderRequest;
import com.kickkart.dto.response.OrderResponse;
import com.kickkart.entity.Cart;
import com.kickkart.entity.Order;
import com.kickkart.entity.OrderItem;
import com.kickkart.entity.Product;
import com.kickkart.entity.Users;
import com.kickkart.entity.OrderStatus;
import com.kickkart.entity.PaymentStatus;
import com.kickkart.repository.CartRepository;
import com.kickkart.repository.OrderRepository;
import com.kickkart.repository.ProductRepository;
import com.kickkart.repository.UserRepository;
import com.kickkart.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private Users getCurrentUser() {

        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private OrderResponse mapToResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems()
                .stream()
                .map(item -> OrderItemResponse.builder()
                        .productId(item.getProductId())
                        .productName(item.getProductName())
                        .imageUrl(item.getImageUrl())
                        .category(item.getCategory())
                        .size(item.getSize())
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .totalAmount(order.getTotalAmount())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .paymentMethod(order.getPaymentMethod())
                .shippingAddress(order.getShippingAddress())
                .phoneNumber(order.getPhoneNumber())
                .createdAt(order.getCreatedAt())
                .items(items)
                .razorpayOrderId(order.getRazorpayOrderId())
                .razorpayPaymentId(order.getRazorpayPaymentId())
                .build();
    }
    


    @Override
    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {

        Users user = getCurrentUser();

        List<Cart> cartItems = cartRepository.findByUserId(user.getId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Cart cart : cartItems) {
            BigDecimal subtotal = cart.getProduct()
                    .getPrice()
                    .multiply(BigDecimal.valueOf(cart.getQuantity()));

            totalAmount = totalAmount.add(subtotal);
        }

        PaymentStatus paymentStatus =
                request.getPaymentMethod().equalsIgnoreCase("ONLINE")
                        ? PaymentStatus.PAID
                        : PaymentStatus.PENDING;

        Order order = Order.builder()
                .orderNumber("KK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(user)
                .totalAmount(totalAmount)
                .orderStatus(OrderStatus.PENDING)
                .paymentStatus(paymentStatus)
                .paymentMethod(request.getPaymentMethod())
                .shippingAddress(request.getShippingAddress())
                .phoneNumber(request.getPhoneNumber())

                .razorpayOrderId(request.getRazorpayOrderId())
                .razorpayPaymentId(request.getRazorpayPaymentId())
                .razorpaySignature(request.getRazorpaySignature())

                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<OrderItem> orderItems = cartItems.stream().map(cart -> {

            Product product = productRepository.findById(cart.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException(
                        product.getName() + " has only " + product.getStock() + " items left in stock."
                );
            }

            product.setStock(product.getStock() - cart.getQuantity());
            productRepository.save(product);

            BigDecimal subtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(cart.getQuantity()));
            return OrderItem.builder()
                    .order(order)
                    .productId(product.getId())
                    .productName(product.getName())
                    .imageUrl(product.getImageUrl())
                    .category(product.getCategory().name())
                    .size(cart.getSize())
                    .price(product.getPrice())
                    .quantity(cart.getQuantity())
                    .subtotal(subtotal)
                    .build();
        }).toList();

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        cartRepository.deleteAll(cartItems);

        return mapToResponse(savedOrder);
    }


    @Override
    public List<OrderResponse> getMyOrders() {

        Users user = getCurrentUser();

        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        return orders.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {

        Users user = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return mapToResponse(order);
    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {

        Users user = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order already cancelled");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        for (OrderItem item : order.getOrderItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            product.setStock(product.getStock() + item.getQuantity());

            productRepository.save(product);
        }

        orderRepository.save(order);
    }
}