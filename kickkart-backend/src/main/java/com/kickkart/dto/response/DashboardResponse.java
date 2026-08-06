package com.kickkart.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalOrders;

    private long completedOrders;

    private long pendingOrders;

    private long cancelledOrders;

}