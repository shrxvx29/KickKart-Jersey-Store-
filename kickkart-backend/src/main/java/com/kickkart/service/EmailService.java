package com.kickkart.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Async
    public void sendWelcomeEmail(String to, String fullName) {

        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setFrom(mailUsername, "KickKart");
            helper.setSubject("⚽ Welcome to KickKart!");

            String html = """
                    <!DOCTYPE html>
                    <html>
                    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

                    <table width="100%%" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">

                                <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;margin-top:30px;box-shadow:0 5px 20px rgba(0,0,0,.15);">

                                    <tr>
                                        <td align="center" style="background:#111827;padding:35px;">
                                            <h1 style="color:white;margin:0;">⚽ KickKart</h1>
                                            <p style="color:#d1d5db;margin-top:8px;">
                                                Premium Football Jersey Store
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:40px;">

                                            <h2 style="color:#111827;">
                                                Welcome, %s 👋
                                            </h2>

                                            <p style="font-size:16px;color:#555;line-height:28px;">
                                                Thank you for joining <b>KickKart</b>.
                                                <br><br>
                                                Your account has been created successfully.
                                                <br><br>
                                                Explore premium football jerseys from your favourite clubs.
                                            </p>

                                            <div style="text-align:center;margin:40px 0;">
                                                   <a href="https://kickkartstore.netlify.app/home"
                                                   style="background:#2563eb;
                                                          color:white;
                                                          text-decoration:none;
                                                          padding:15px 35px;
                                                          border-radius:8px;
                                                          font-weight:bold;">
                                                    Start Shopping
                                                </a>
                                            </div>

                                            <hr>

                                            <p style="font-size:13px;color:#777;">
                                                © 2026 KickKart. All Rights Reserved.
                                            </p>

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                    </body>
                    </html>
                    """.formatted(fullName);

            helper.setText(html, true);

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void sendOtpEmail(String to, String fullName, String otp) {

        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setFrom(mailUsername, "KickKart");
            helper.setSubject("🔐 KickKart Password Reset OTP");

            String html = """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

                <table width="100%%">
                    <tr>
                        <td align="center">

                            <table width="600"
                                   style="background:white;
                                   margin-top:40px;
                                   border-radius:12px;
                                   overflow:hidden;
                                   box-shadow:0 5px 20px rgba(0,0,0,.15);">

                                <tr>

                                    <td align="center"
                                        style="background:#111827;padding:35px;">

                                        <h1 style="color:white;margin:0;">
                                            ⚽ KickKart
                                        </h1>

                                        <p style="color:#d1d5db;">
                                            Password Reset
                                        </p>

                                    </td>

                                </tr>

                                <tr>

                                    <td style="padding:40px;">

                                        <h2>Hello %s 👋</h2>

                                        <p>
                                            We received a request to reset
                                            your password.
                                        </p>

                                        <p>Your OTP is</p>

                                        <div
                                        style="
                                        text-align:center;
                                        font-size:40px;
                                        font-weight:bold;
                                        color:#2563eb;
                                        letter-spacing:8px;
                                        margin:30px 0;
                                        ">

                                        %s

                                        </div>

                                        <p>

                                            This OTP is valid for
                                            <b>5 minutes</b>.

                                        </p>

                                        <hr>

                                        <p style="color:#888;font-size:13px;">

                                            If you didn't request this,
                                            simply ignore this email.

                                        </p>

                                    </td>

                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

                </body>
                </html>
                """.formatted(fullName, otp);

            helper.setText(html, true);

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}