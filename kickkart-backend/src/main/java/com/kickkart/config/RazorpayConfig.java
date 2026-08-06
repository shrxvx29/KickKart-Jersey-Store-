package com.kickkart.config;

import com.razorpay.RazorpayClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() throws Exception {

        System.out.println("Key ID = " + keyId);
        System.out.println("Secret Length = " + keySecret.length());

        return new RazorpayClient(keyId, keySecret);
    }
}