package com.kickkart.controller.Admin;

import com.kickkart.dto.response.OrderResponse;
import com.kickkart.entity.OrderStatus;
import com.kickkart.service.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    @GetMapping
    public Page<OrderResponse> getAllOrders(
            @PageableDefault(size = 10)
            Pageable pageable
    ) {

        return adminOrderService.getAllOrders(pageable);

    }

    @GetMapping("/{id}")
    public OrderResponse getOrderById(
            @PathVariable Long id
    ) {

        return adminOrderService.getOrderById(id);

    }

    @PutMapping("/{id}/status")
    public OrderResponse updateStatus(

            @PathVariable Long id,

            @RequestParam OrderStatus status

    ) {

        return adminOrderService.updateOrderStatus(id, status);

    }

}