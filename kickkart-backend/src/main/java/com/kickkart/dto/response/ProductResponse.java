package com.kickkart.dto.response;

import com.kickkart.entity.ProductCategory;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private ProductCategory category;

    private BigDecimal price;

    private Integer stock;

    private String description;

    private String imageUrl;
}