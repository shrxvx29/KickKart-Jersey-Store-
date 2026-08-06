package com.kickkart.controller.User;

import com.kickkart.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping("/{id}/invoice")
    public ResponseEntity<byte[]> downloadInvoice(
            @PathVariable Long id
    ) {

        byte[] pdf = invoiceService.generateInvoice(id);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_PDF);

        headers.setContentDisposition(

                ContentDisposition.attachment()

                        .filename("Invoice-" + id + ".pdf")

                        .build()

        );

        return ResponseEntity.ok()

                .headers(headers)

                .body(pdf);

    }

}