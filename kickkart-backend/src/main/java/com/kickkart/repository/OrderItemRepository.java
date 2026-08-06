package com.kickkart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kickkart.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}