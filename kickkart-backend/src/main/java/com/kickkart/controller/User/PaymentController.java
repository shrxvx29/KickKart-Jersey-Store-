package com.kickkart.controller.User;

import com.kickkart.dto.request.CreateOrderRequest;
import com.kickkart.dto.request.VerifyPaymentRequest;
import com.kickkart.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody CreateOrderRequest request
    ) throws Exception {

        JSONObject order = paymentService.createOrder(request);

        return ResponseEntity.ok(order.toString());
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody VerifyPaymentRequest request
    ) throws Exception {

        boolean verified = paymentService.verifyPayment(request);

        if (verified) {
            return ResponseEntity.ok("Payment Verified Successfully");
        }

        return ResponseEntity.badRequest().body("Payment Verification Failed");
    }
}