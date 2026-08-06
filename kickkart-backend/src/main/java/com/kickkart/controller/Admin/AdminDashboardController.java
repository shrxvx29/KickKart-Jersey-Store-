package com.kickkart.controller.Admin;

import com.kickkart.dto.response.DashboardResponse;
import com.kickkart.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboardStats() {

        return dashboardService.getDashboardStats();

    }

}