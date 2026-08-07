package com.kickkart.service;

import com.kickkart.dto.request.ProductRequest;
import com.kickkart.dto.response.ProductResponse;
import com.kickkart.entity.Product;
import com.kickkart.exception.ProductNotFoundException;
import com.kickkart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import net.coobird.thumbnailator.Thumbnails;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        try {

            MultipartFile image = request.getImage();
            String imageUrl = cloudinaryService.uploadImage(image);

            Product product = new Product();

            product.setName(request.getName());
            product.setCategory(request.getCategory());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());
            product.setDescription(request.getDescription());

            // Save image path in DB
            product.setImageUrl(imageUrl);
            Product savedProduct = productRepository.save(product);

            return ProductResponse.builder()
                    .id(savedProduct.getId())
                    .name(savedProduct.getName())
                    .category(savedProduct.getCategory())
                    .price(savedProduct.getPrice())
                    .stock(savedProduct.getStock())
                    .description(savedProduct.getDescription())
                    .imageUrl(savedProduct.getImageUrl())
                    .build();

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image.");
        }
    }

    @Override
    public Page<ProductResponse> getAllProducts(
            String search,
            String category,
            int page,
            int size,
            String sort,
            String direction
    ) {

        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("asc")
                        ? Sort.Direction.ASC
                        : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sort)
        );

        Specification<Product> specification = (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {

                predicates.add(

                        cb.like(
                                cb.lower(root.get("name")),
                                "%" + search.toLowerCase() + "%"
                        )

                );

            }

            if (category != null && !category.isBlank()) {

                predicates.add(

                        cb.equal(root.get("category"), category)

                );

            }

            return cb.and(predicates.toArray(new Predicate[0]));

        };

        return productRepository
                .findAll(specification, pageable)
                .map(product -> ProductResponse.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .category(product.getCategory())
                        .price(product.getPrice())
                        .stock(product.getStock())
                        .description(product.getDescription())
                        .imageUrl(product.getImageUrl())
                        .build());

    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException("Product Not Found"));

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setCategory(product.getCategory());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setDescription(product.getDescription());
        response.setImageUrl(product.getImageUrl());

        return response;
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {

        try {

            Product product = productRepository.findById(id)
                    .orElseThrow(() ->
                            new ProductNotFoundException("Product Not Found"));

            product.setName(request.getName());
            product.setCategory(request.getCategory());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());
            product.setDescription(request.getDescription());

            MultipartFile image = request.getImage();

            if (image != null && !image.isEmpty()) {

                String imageUrl = cloudinaryService.uploadImage(image);

                product.setImageUrl(imageUrl);

            }

            Product updatedProduct = productRepository.save(product);

            return ProductResponse.builder()
                    .id(updatedProduct.getId())
                    .name(updatedProduct.getName())
                    .category(updatedProduct.getCategory())
                    .price(updatedProduct.getPrice())
                    .stock(updatedProduct.getStock())
                    .description(updatedProduct.getDescription())
                    .imageUrl(updatedProduct.getImageUrl())
                    .build();

        } catch (IOException e) {

            throw new RuntimeException("Failed to update product image.");

        }

    }

    @Override
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product Not Found");
        }

        productRepository.deleteById(id);
    }
}