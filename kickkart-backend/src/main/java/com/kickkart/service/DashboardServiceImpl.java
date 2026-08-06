package com.kickkart.service;

import com.kickkart.dto.response.DashboardResponse;
import com.kickkart.entity.OrderStatus;
import com.kickkart.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;

    @Override
    public DashboardResponse getDashboardStats() {

        return DashboardResponse.builder()
                .totalOrders(orderRepository.count())
                .completedOrders(orderRepository.countByOrderStatus(OrderStatus.DELIVERED))
                .pendingOrders(orderRepository.countByOrderStatus(OrderStatus.PENDING))
                .cancelledOrders(orderRepository.countByOrderStatus(OrderStatus.CANCELLED))
                .build();

    }
}