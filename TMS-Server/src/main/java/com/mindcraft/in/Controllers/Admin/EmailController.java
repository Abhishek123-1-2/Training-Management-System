package com.mindcraft.in.Controllers.Admin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Admin.MultipleEmailRequest;

import jakarta.mail.internet.MimeMessage;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/api/send-multiple-emails")
    public ResponseEntity<?> sendMultipleEmails(@RequestBody MultipleEmailRequest multipleEmailRequest) {
        try {
            for (String email : multipleEmailRequest.getEmails()) {
                // Create MimeMessage object
                MimeMessage message = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message

                // Set Gmail SMTP settings
                helper.setFrom("dontreplymindcraft@gmail.com");
                helper.setTo(email);
                helper.setSubject(multipleEmailRequest.getSubject());
                helper.setText(multipleEmailRequest.getBody(), true); // true indicates HTML content

                // Send the email
                javaMailSender.send(message);
            }

            return ResponseEntity.ok("Emails sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send emails: " + e.getMessage());
        }
    }
}

