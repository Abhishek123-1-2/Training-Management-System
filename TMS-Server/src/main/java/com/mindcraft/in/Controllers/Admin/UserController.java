// package com.mindcraft.in.Controllers.Admin;

// import javax.mail.internet.MimeMessage;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.mindcraft.in.Pojos.Admin.CreateUserRequest;
// import com.mindcraft.in.Pojos.Admin.EmailRequest;
// import com.mindcraft.in.Services.Admin.UserService;

// import jakarta.mail.internet.AddressException;
// import jakarta.mail.internet.InternetAddress;

// @RestController
// public class UserController {

//     @Autowired
//     private JavaMailSender javaMailSender;

//     @Autowired
//     private UserService userService;

//     @PostMapping("/api/users")
//     public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
//         try {
//             // No need to hash the password
//             String plainPassword = createUserRequest.getPassword();
    
//             if (createUserRequest.getUserRole() == null) {
//                 createUserRequest.setUserRole("ROLE_USER");
//             }
    
//             userService.insertUser(createUserRequest.getUsername(), plainPassword, createUserRequest.getUserRole());
    
//             return ResponseEntity.ok("User created successfully!");
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create user: " + e.getMessage());
//         }
//     }


    
//     @PostMapping("/api/send-email")
//     public ResponseEntity<?> sendEmail(@RequestBody EmailRequest emailRequest) {
//         try {
//             // Create MimeMessage object
//             jakarta.mail.internet.MimeMessage message = javaMailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message
    
//             // Set Gmail SMTP settings
//             helper.setFrom("dontreplymindcraft@gmail.com");
//             helper.setTo(emailRequest.getEmail());
//             helper.setSubject(emailRequest.getSubject());
//             helper.setText(emailRequest.getBody(), true); // true indicates HTML content
    
//             // Send the email
//             javaMailSender.send(message);
    
//             return ResponseEntity.ok("Email sent successfully!");
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
//         }
//     }
  
//     private boolean isValidEmailAddress(String email) {
//         try {
//             new InternetAddress(email).validate();
//             return true;
//         } catch (AddressException ex) {
//             return false;
//         }
//     }
// }
package com.mindcraft.in.Controllers.Admin;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Admin.CreateUserRequest;
import com.mindcraft.in.Pojos.Admin.EmailRequest;
import com.mindcraft.in.Services.Admin.UserService;
import com.mindcraft.in.Services.Admin.EmployeeDetailsService; // Import EmployeeDetailsService

import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;

@RestController
public class UserController {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeDetailsService employeeDetailsService; // Autowire EmployeeDetailsService

    @PostMapping("/api/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
        try {
            String primarySkillName = employeeDetailsService.getEmployeePrimarySkill(createUserRequest.getUsername());
            if (primarySkillName == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Primary skill not found for employee code: " + createUserRequest.getUsername());
            }

            String userRole = getUserRole(primarySkillName);
            if (userRole == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid primary skill: " + primarySkillName);
            }

            userService.insertUser(createUserRequest.getUsername(), createUserRequest.getPassword(), userRole);

            return ResponseEntity.ok("User created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create user: " + e.getMessage());
        }
    }

    @PostMapping("/api/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            // Create MimeMessage object
            jakarta.mail.internet.MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message

            // Set Gmail SMTP settings
            helper.setFrom("dontreplymindcraft@gmail.com");
            helper.setTo(emailRequest.getEmail());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody(), true); // true indicates HTML content

            // Send the email
            javaMailSender.send(message);

            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

    private String getUserRole(String primarySkillName) {
        switch(primarySkillName) {
            case "System Administrator":
                return "ROLE_ADMIN";
            case "HR":
                return "ROLE_HR";
            case "Trainer":
                return "ROLE_TRAINER";
            // Add more cases as needed
            default:
                return "ROLE_USER";
        }
    }

    // Utility method to validate email address
    private boolean isValidEmailAddress(String email) {
        try {
            new InternetAddress(email).validate();
            return true;
        } catch (AddressException ex) {
            return false;
        }
    }
}







