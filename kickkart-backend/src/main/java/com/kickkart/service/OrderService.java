package com.kickkart.service;

import java.util.List;

import com.kickkart.dto.request.OrderRequest;
import com.kickkart.dto.response.OrderResponse;

public interface OrderService {

    OrderResponse placeOrder(OrderRequest request);

    List<OrderResponse> getMyOrders();

    OrderResponse getOrderById(Long orderId);

    void cancelOrder(Long orderId);

}