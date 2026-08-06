package com.kickkart.service;

import com.kickkart.dto.request.CreateOrderRequest;
import com.kickkart.dto.request.VerifyPaymentRequest;
import org.json.JSONObject;

public interface PaymentService {

    JSONObject createOrder(CreateOrderRequest request) throws Exception;

    boolean verifyPayment(VerifyPaymentRequest request) throws Exception;

}