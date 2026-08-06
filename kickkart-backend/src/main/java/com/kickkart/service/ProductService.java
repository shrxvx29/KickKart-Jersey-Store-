package com.kickkart.service;

import com.kickkart.dto.request.ProductRequest;
import com.kickkart.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    Page<ProductResponse> getAllProducts(
            String search,
            String category,
            int page,
            int size,
            String sort,
            String direction
    );
    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);
}