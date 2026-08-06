package com.kickkart.dto.response;

import java.math.BigDecimal;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {

    private Long productId;

    private String productName;

    private String imageUrl;

    private String category;

    private String size;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal subtotal;
}