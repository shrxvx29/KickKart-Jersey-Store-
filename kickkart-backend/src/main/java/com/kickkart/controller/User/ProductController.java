package com.kickkart.controller.User;


import com.kickkart.dto.response.ProductResponse;
import com.kickkart.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(

            @RequestParam(required = false) String search,

            @RequestParam(required = false) String category,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "12") int size,

            @RequestParam(defaultValue = "id") String sort,

            @RequestParam(defaultValue = "desc") String direction

    ) {

        return ResponseEntity.ok(

                productService.getAllProducts(
                        search,
                        category,
                        page,
                        size,
                        sort,
                        direction
                )

        );

    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}