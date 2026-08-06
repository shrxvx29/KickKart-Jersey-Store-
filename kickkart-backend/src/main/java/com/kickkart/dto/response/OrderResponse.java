package com.kickkart.dto.response;

import com.kickkart.entity.OrderStatus;
import com.kickkart.entity.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long id;

    private String orderNumber;

    private String customerName;

    private String customerEmail;

    private BigDecimal totalAmount;

    private OrderStatus orderStatus;

    private PaymentStatus paymentStatus;

    private String paymentMethod;

    private String shippingAddress;

    private String phoneNumber;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;

    private String razorpayOrderId;

    private String razorpayPaymentId;

}