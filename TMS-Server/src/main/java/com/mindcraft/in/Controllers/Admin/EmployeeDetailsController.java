// EmployeeDetailsController.java
package com.mindcraft.in.Controllers.Admin;

import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Services.Admin.EmployeeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee-details")
public class EmployeeDetailsController {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @GetMapping("/all")
    public List<EmployeeDetailsDTO> getAllEmployeeDetails() {
        return employeeDetailsService.getEmployeeDetails();
    }

    //  @GetMapping("/skill/{empCode}")
    // public String getEmployeePrimarySkill(@PathVariable String empCode) {
    //     return employeeDetailsService.getEmployeePrimarySkill(empCode);
    // }
    // @GetMapping("/skill/{empCode}")
    // public ResponseEntity<?> getEmployeePrimarySkill(@PathVariable String empCode) {
    //     try {
    //         String primarySkill = employeeDetailsService.getEmployeePrimarySkill(empCode);
    //         if (primarySkill != null) {
    //             // Construct a response containing primary_skill_name
    //             Map<String, String> response = new HashMap<>();
    //             response.put("primary_skill_name", primarySkill);
    //             return ResponseEntity.ok(response);
    //         } else {
    //             return ResponseEntity.notFound().build();
    //         }
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch employee skill: " + e.getMessage());
    //     }
    // }
    // @GetMapping("/skill/{empCode}")
    // public ResponseEntity<?> getEmployeePrimarySkill(@PathVariable String empCode) {
    //     try {
    //         String primarySkill = employeeDetailsService.getEmployeePrimarySkill(empCode);
    //         if (primarySkill != null) {
    //             String userRole = getUserRole(primarySkill);
    //             if (userRole != null) {
    //                 return ResponseEntity.ok(userRole);
    //             } else {
    //                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid primary skill: " + primarySkill);
    //             }
    //         } else {
    //             return ResponseEntity.notFound().build();
    //         }
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch employee skill: " + e.getMessage());
    //     }
    // }
    
    // private String getUserRole(String primarySkillName) {
    //     switch(primarySkillName) {
    //         case "System Administrator":
    //             return "ROLE_ADMIN";
    //         case "HR":
    //             return "ROLE_HR";
    //         case "Trainer":
    //             return "ROLE_TRAINER";
    //         // Add more cases as needed
    //         default:
    //             return "ROLE_USER";
    //     }
    // }
    @GetMapping("/skill/{empCode}")
public ResponseEntity<?> getEmployeePrimarySkill(@PathVariable String empCode) {
    try {
        String primarySkill = employeeDetailsService.getEmployeePrimarySkill(empCode);
        if (primarySkill != null) {
            Map<String, String> response = new HashMap<>();
            response.put("primary_skill_name", primarySkill);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch employee skill: " + e.getMessage());
    }
}

    // You can add more methods and mappings as needed
}

