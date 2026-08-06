package com.kickkart.dto.request;

import lombok.Data;

@Data
public class CreateOrderRequest {

    private Long amount;

    private String currency;

}