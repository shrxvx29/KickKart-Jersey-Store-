package com.kickkart.repository;

import com.kickkart.entity.Cart;
import com.kickkart.entity.Product;
import com.kickkart.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(Users user);

    Optional<Cart> findByUserAndProductAndSize(
            Users user,
            Product product,
            String size
    );

    void deleteByUser(Users user);

    List<Cart> findByUserId(Long userId);
}