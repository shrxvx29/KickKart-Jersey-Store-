package com.kickkart.service;

import com.kickkart.entity.Order;
import com.kickkart.entity.OrderItem;
import com.kickkart.exception.ResourceNotFoundException;
import com.kickkart.repository.OrderRepository;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import com.lowagie.text.pdf.draw.LineSeparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final OrderRepository orderRepository;

    @Override
    public byte[] generateInvoice(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4, 40, 40, 40, 40);

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = new Font(Font.HELVETICA, 26, Font.BOLD, new Color(34, 197, 94));

            Font headingFont = new Font(Font.HELVETICA, 15, Font.BOLD);

            Font normalFont = new Font(Font.HELVETICA, 11);

            Font boldFont = new Font(Font.HELVETICA, 11, Font.BOLD);

            Paragraph title = new Paragraph("KICKKART", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            Paragraph subtitle = new Paragraph(
                    "Premium Football Jersey Store",
                    normalFont
            );

            subtitle.setAlignment(Element.ALIGN_CENTER);

            document.add(subtitle);

            document.add(Chunk.NEWLINE);

            PdfPTable infoTable = new PdfPTable(2);

            infoTable.setWidthPercentage(100);

            infoTable.setWidths(new float[]{1f, 1f});

            PdfPCell left = new PdfPCell();

            left.setBorder(Rectangle.NO_BORDER);

            left.addElement(new Paragraph("Invoice", headingFont));

            left.addElement(new Paragraph(
                    "Invoice No : INV-" + order.getId(),
                    normalFont
            ));

            left.addElement(new Paragraph(
                    "Order No : " + order.getOrderNumber(),
                    normalFont
            ));

            left.addElement(new Paragraph(
                    "Date : " +
                            order.getCreatedAt().format(
                                    DateTimeFormatter.ofPattern("dd MMM yyyy")
                            ),
                    normalFont
            ));

            PdfPCell right = new PdfPCell();

            right.setBorder(Rectangle.NO_BORDER);

            right.setHorizontalAlignment(Element.ALIGN_RIGHT);

            right.addElement(new Paragraph(
                    "Order Status : " + order.getOrderStatus(),
                    boldFont
            ));

            right.addElement(new Paragraph(
                    "Payment : " + order.getPaymentMethod(),
                    normalFont
            ));

            right.addElement(new Paragraph(
                    "Payment Status : " + order.getPaymentStatus(),
                    normalFont
            ));

            infoTable.addCell(left);

            infoTable.addCell(right);

            document.add(infoTable);

            document.add(Chunk.NEWLINE);

            Paragraph customerHeading =
                    new Paragraph("Customer Details", headingFont);

            customerHeading.setSpacingAfter(10);

            document.add(customerHeading);

            PdfPTable customerTable = new PdfPTable(2);

            customerTable.setWidthPercentage(100);

            customerTable.setWidths(new float[]{1f, 2f});

            customerTable.addCell(createLabelCell("Customer"));

            customerTable.addCell(createValueCell(
                    order.getUser().getFullName()
            ));

            customerTable.addCell(createLabelCell("Phone"));

            customerTable.addCell(createValueCell(
                    order.getPhoneNumber()
            ));

            customerTable.addCell(createLabelCell("Shipping Address"));

            customerTable.addCell(createValueCell(
                    order.getShippingAddress()
            ));

            document.add(customerTable);

            document.add(Chunk.NEWLINE);

            Paragraph productHeading =
                    new Paragraph("Ordered Products", headingFont);

            productHeading.setSpacingAfter(10);

            document.add(productHeading);

            PdfPTable table = new PdfPTable(5);

            table.setWidthPercentage(100);

            table.setWidths(new float[]{
                    5f,
                    1.5f,
                    1.5f,
                    2f,
                    2f
            });

            Color headerColor = new Color(34, 197, 94);

            Font tableHeader =
                    new Font(Font.HELVETICA, 11, Font.BOLD, Color.WHITE);

            addHeaderCell(table, "Product", headerColor, tableHeader);
            addHeaderCell(table, "Size", headerColor, tableHeader);
            addHeaderCell(table, "Qty", headerColor, tableHeader);
            addHeaderCell(table, "Price", headerColor, tableHeader);
            addHeaderCell(table, "Total", headerColor, tableHeader);

            Font cellFont =
                    new Font(Font.HELVETICA, 10);

            for (OrderItem item : order.getOrderItems()) {

                addDataCell(table, item.getProductName(), cellFont);

                addDataCell(table, item.getSize(), cellFont);

                addDataCell(
                        table,
                        String.valueOf(item.getQuantity()),
                        cellFont
                );

                addDataCell(
                        table,
                        "₹" + item.getPrice(),
                        cellFont
                );

                addDataCell(
                        table,
                        "₹" + item.getSubtotal(),
                        cellFont
                );

            }

            document.add(table);

            document.add(Chunk.NEWLINE);

            PdfPTable summaryTable = new PdfPTable(2);

            summaryTable.setWidthPercentage(40);

            summaryTable.setHorizontalAlignment(Element.ALIGN_RIGHT);

            summaryTable.setSpacingBefore(15);

            summaryTable.addCell(createSummaryCell("Subtotal"));

            summaryTable.addCell(
                    createSummaryValueCell("₹" + order.getTotalAmount())
            );

            summaryTable.addCell(createSummaryCell("Shipping"));

            summaryTable.addCell(
                    createSummaryValueCell("FREE")
            );

            summaryTable.addCell(createSummaryCell("Discount"));

            summaryTable.addCell(
                    createSummaryValueCell("₹0")
            );

            PdfPCell totalLabel = new PdfPCell(
                    new Phrase(
                            "Grand Total",
                            new Font(Font.HELVETICA, 12, Font.BOLD)
                    )
            );

            totalLabel.setBorder(Rectangle.TOP);

            totalLabel.setPadding(8);

            PdfPCell totalValue = new PdfPCell(
                    new Phrase(
                            "₹" + order.getTotalAmount(),
                            new Font(Font.HELVETICA, 12, Font.BOLD)
                    )
            );

            totalValue.setHorizontalAlignment(Element.ALIGN_RIGHT);

            totalValue.setBorder(Rectangle.TOP);

            totalValue.setPadding(8);

            summaryTable.addCell(totalLabel);

            summaryTable.addCell(totalValue);

            document.add(summaryTable);

            document.add(Chunk.NEWLINE);

            LineSeparator separator = new LineSeparator();

            separator.setLineColor(new Color(220, 220, 220));

            document.add(separator);

            document.add(Chunk.NEWLINE);

            Paragraph thankYou = new Paragraph(
                    "Thank you for shopping with KickKart!",
                    new Font(
                            Font.HELVETICA,
                            14,
                            Font.BOLD,
                            new Color(34, 197, 94)
                    )
            );

            thankYou.setAlignment(Element.ALIGN_CENTER);

            document.add(thankYou);

            Paragraph footer = new Paragraph(
                    "Need help? support@kickkart.com | www.kickkart.com",
                    new Font(Font.HELVETICA, 10)
            );

            footer.setAlignment(Element.ALIGN_CENTER);

            footer.setSpacingBefore(8);

            document.add(footer);

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate invoice",
                    e
            );

        }

    }

    private void addHeaderCell(
            PdfPTable table,
            String text,
            Color backgroundColor,
            Font font
    ) {

        PdfPCell cell = new PdfPCell(new Phrase(text, font));

        cell.setBackgroundColor(backgroundColor);

        cell.setHorizontalAlignment(Element.ALIGN_CENTER);

        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        cell.setPadding(8);

        table.addCell(cell);

    }

    private void addDataCell(
            PdfPTable table,
            String text,
            Font font
    ) {

        PdfPCell cell = new PdfPCell(new Phrase(text == null ? "-" : text, font));

        cell.setPadding(8);

        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        table.addCell(cell);

    }

    private PdfPCell createLabelCell(String text) {

        PdfPCell cell = new PdfPCell(
                new Phrase(
                        text,
                        new Font(Font.HELVETICA, 11, Font.BOLD)
                )
        );

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

    private PdfPCell createValueCell(String text) {

        PdfPCell cell = new PdfPCell(
                new Phrase(
                        text == null ? "-" : text,
                        new Font(Font.HELVETICA, 11)
                )
        );

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

    private PdfPCell createSummaryCell(String text) {

        PdfPCell cell = new PdfPCell(
                new Phrase(
                        text,
                        new Font(Font.HELVETICA, 11)
                )
        );

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

    private PdfPCell createSummaryValueCell(String text) {

        PdfPCell cell = new PdfPCell(
                new Phrase(
                        text,
                        new Font(Font.HELVETICA, 11)
                )
        );

        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);

        cell.setBorder(Rectangle.NO_BORDER);

        cell.setPadding(6);

        return cell;

    }

}