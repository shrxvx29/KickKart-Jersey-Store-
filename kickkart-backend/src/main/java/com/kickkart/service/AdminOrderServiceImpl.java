package com.kickkart.service;

import com.kickkart.dto.response.OrderItemResponse;
import com.kickkart.dto.response.OrderResponse;
import com.kickkart.entity.Order;
import com.kickkart.entity.OrderItem;
import com.kickkart.entity.OrderStatus;
import com.kickkart.exception.OrderNotFoundException;
import com.kickkart.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;

    @Override
    public Page<OrderResponse> getAllOrders(Pageable pageable) {

        return orderRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public OrderResponse getOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException("Order Not Found"));

        return mapToResponse(order);

    }

    @Override
    public OrderResponse updateOrderStatus(Long id, OrderStatus status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException("Order Not Found"));

        order.setOrderStatus(status);

        return mapToResponse(orderRepository.save(order));

    }

    private OrderResponse mapToResponse(Order order) {

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())

                .customerName(order.getUser().getFullName())
                .customerEmail(order.getUser().getEmail())

                .totalAmount(order.getTotalAmount())

                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())

                .paymentMethod(order.getPaymentMethod())

                .shippingAddress(order.getShippingAddress())

                .phoneNumber(order.getPhoneNumber())

                .createdAt(order.getCreatedAt())

                .razorpayOrderId(order.getRazorpayOrderId())
                .razorpayPaymentId(order.getRazorpayPaymentId())

                .items(
                        order.getOrderItems()
                                .stream()
                                .map(this::mapItem)
                                .toList()
                )

                .build();
    }
    private OrderItemResponse mapItem(OrderItem item) {

        return OrderItemResponse.builder()

                .productId(item.getProductId())

                .productName(item.getProductName())

                .imageUrl(item.getImageUrl())

                .category(item.getCategory())

                .size(item.getSize())

                .price(item.getPrice())

                .quantity(item.getQuantity())

                .subtotal(item.getSubtotal())

                .build();
    }
}