package com.kickkart.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CartResponse {

    private Long cartId;

    private Long productId;

    private String productName;

    private String imageUrl;

    private String category;

    private BigDecimal price;

    private Integer quantity;

    private String size;

    private BigDecimal subtotal;

    private Integer stock;

}