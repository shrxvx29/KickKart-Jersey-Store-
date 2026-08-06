package com.kickkart.service;

public interface InvoiceService {

    byte[] generateInvoice(Long orderId);

}