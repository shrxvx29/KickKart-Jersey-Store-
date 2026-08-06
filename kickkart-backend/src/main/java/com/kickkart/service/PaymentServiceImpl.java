package com.kickkart.service;

import com.kickkart.dto.request.CreateOrderRequest;
import com.kickkart.dto.request.VerifyPaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Override
    public JSONObject createOrder(CreateOrderRequest request) throws Exception {

        JSONObject orderRequest = new JSONObject();

        // Razorpay expects amount in paise
        orderRequest.put("amount", request.getAmount() * 100);

        orderRequest.put("currency", request.getCurrency());

        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());

        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        return order.toJson();
    }

    @Override
    public boolean verifyPayment(VerifyPaymentRequest request) throws Exception {

        JSONObject options = new JSONObject();

        options.put("razorpay_order_id", request.getRazorpayOrderId());

        options.put("razorpay_payment_id", request.getRazorpayPaymentId());

        options.put("razorpay_signature", request.getRazorpaySignature());

        return Utils.verifyPaymentSignature(options, keySecret);
    }
}