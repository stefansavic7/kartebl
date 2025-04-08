package org.unibl.etf.kartebl_backendaplikacija.services.impl;


import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;


    public void sendEmail(String to, String subject, String body, byte[] pngData, String attachmentFileName,String name,
                          String surname,String ticketNumber, String type) throws DocumentException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom("kartebl9@gmail.com");

            ByteArrayResource resource = new ByteArrayResource(pngData);
            helper.addAttachment("karta_qr.jpg", resource, "image/png");
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public InputStreamResource createPdfInputStreamResource(byte[] pdfData) {
        return new InputStreamResource(new ByteArrayInputStream(pdfData));
    }
}
