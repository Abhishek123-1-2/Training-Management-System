package com.mindcraft.in.Controllers.Admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Admin.User;
import com.mindcraft.in.Services.Admin.EmployeeService;
import com.mindcraft.in.Services.Admin.LoginService;

// LoginController.java
@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    public LoginController(LoginService loginService,JdbcTemplate jdbcTemplate) {
        this.loginService = loginService;
        this.jdbcTemplate = jdbcTemplate;
    }

    
    // @PostMapping("/authenticate")
    // public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
    //     Map<String, String> response = loginService.login(user);
    //     System.out.println(response);
    //     if ("success".equals(response.get("status"))) {
    //         return ResponseEntity.ok(response);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    //     }
    // }

//     @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         // Include subordinate employee IDs in the response
//         response.put("subordinateEmpIds", response.get("subordinateEmpIds"));

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         String reportingManagerName = response.get("employeeName");
//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
//         // Fetch subordinate employee codes
//         Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

//         // Include subordinate employee IDs and codes in the response
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());
//         response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }

@PostMapping("/authenticate")
public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
    Map<String, String> response = loginService.login(user);

    if ("success".equals(response.get("status"))) {
        String employeeName = response.get("employeeName");
        // String reportingManagerEmail = loginService.getReportingManagerEmail(employeeName);
        // if (reportingManagerEmail != null) {
        //     System.out.println("Reporting Manager's Email: " + reportingManagerEmail);
        // }
        String reportingManagerName = response.get("employeeName");
        List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
        
        // Fetch subordinate employee codes
        List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

        // Fetch subordinate employee codes with IDs
        Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

        // Include subordinate employee IDs and codes in the response
        response.put("subordinateEmpIds", subordinateEmpIds.toString());
        response.put("subordinateEmpCodes", subordinateEmpCodes.toString());
        response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());
// Include reporting manager name in the response
response.put("reportingManagerName", reportingManagerName);

        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         String reportingManagerName = getReportingManagerName(user.getUsername()); // Fetch reporting manager name again
//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
//         // Fetch subordinate employee codes
//         List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

//         // Fetch subordinate employee codes with IDs
//         Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

//         // Include subordinate employee IDs and codes in the response
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());
//         response.put("subordinateEmpCodes", subordinateEmpCodes.toString());
//         response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());
        
//         // Include reporting manager name in the response
//         response.put("reportingManagerName", reportingManagerName);

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         String reportingManagerName = getReportingManagerName(user.getUsername()); // Fetch reporting manager name again
//         String reportingManagerEmail = loginService.getReportingManagerEmail(reportingManagerName); // Fetch reporting manager email

//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
//         // Fetch subordinate employee codes
//         List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

//         // Fetch subordinate employee codes with IDs
//         Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

//         // Include subordinate employee IDs and codes in the response
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());
//         response.put("subordinateEmpCodes", subordinateEmpCodes.toString());
//         response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());
        
//         // Include reporting manager name and email in the response
//         response.put("reportingManagerName", reportingManagerName);
//         response.put("reportingManagerEmail", reportingManagerEmail);

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         String reportingManagerName = getReportingManagerName(user.getUsername()); // Fetch reporting manager name again
//         String reportingManagerEmail = getReportingManagerEmail(reportingManagerName); // Fetch reporting manager email
//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
//         // Fetch subordinate employee codes
//         List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

//         // Fetch subordinate employee codes with IDs
//         Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

//         // Include subordinate employee IDs and codes in the response
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());
//         response.put("subordinateEmpCodes", subordinateEmpCodes.toString());
//         response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());
        
//         // Include reporting manager name and email in the response
//         response.put("reportingManagerName", reportingManagerName);
//         response.put("reportingManagerEmail", reportingManagerEmail);

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         String reportingManagerName = getReportingManagerName(user.getUsername()); // Fetch reporting manager name again
//         String reportingManagerEmail = loginService.getReportingManagerEmail(reportingManagerName);
//         System.out.println(reportingManagerEmail); // Fetch reporting manager email
//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);
        
//         // Fetch subordinate employee codes
//         List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

//         // Fetch subordinate employee codes with IDs
//         Map<Long, List<String>> subordinateEmpIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

//         // Include subordinate employee IDs and codes in the response
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());
//         response.put("subordinateEmpCodes", subordinateEmpCodes.toString());
//         response.put("subordinateEmpIdsWithCodes", subordinateEmpIdsWithCodes.toString());
        
//         // Include reporting manager name and email in the response
//         response.put("reportingManagerName", reportingManagerName);
//         response.put("reportingManagerEmail", reportingManagerEmail);

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }


// Method to fetch reporting manager name by username
// private String getReportingManagerName(String username) {
//     try {
//         String sql = "SELECT reporting_manager_name FROM m_employee WHERE emp_code = ?";
//         return jdbcTemplate.queryForObject(sql, String.class, username);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return null;
//     }
// }

// public String getReportingManagerEmail(String reportingManagerName) {
//     try {
//         String sql = "SELECT email FROM m_employee WHERE emp_name = ?";
//         return jdbcTemplate.queryForObject(sql, String.class, reportingManagerName);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return null;
//     }
// }



    // LoginController.java
// @PostMapping("/authenticate")
// public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
//     Map<String, String> response = loginService.login(user);

//     if ("success".equals(response.get("status"))) {
//         // Include subordinate employee IDs in the response
//         Long reportingManagerId = Long.parseLong(response.get("reportingManagerId"));
//         List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerId);
//         response.put("subordinateEmpIds", subordinateEmpIds.toString());

//         return ResponseEntity.ok(response);
//     } else {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//     }
// }

//  @GetMapping("/getReportingManagerId")
//     public ResponseEntity<Long> getReportingManagerId(@RequestParam String empCode) {
//         try {
//             Long reportingManagerId = loginService.getReportingManagerId(empCode);
//             if (reportingManagerId != null) {
//                 return ResponseEntity.ok(reportingManagerId);
//             } else {
//                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//             }
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//         }
//     }

}
