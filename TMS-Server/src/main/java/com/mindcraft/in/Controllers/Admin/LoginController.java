package com.mindcraft.in.Controllers.Admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
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

    @PostMapping("/authenticate")
public ResponseEntity<Map<String, String>> authenticate(@RequestBody User user) {
    Map<String, String> response = loginService.login(user);

    if ("success".equals(response.get("status"))) {
        // Include subordinate employee IDs in the response
        response.put("subordinateEmpIds", response.get("subordinateEmpIds"));

        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}


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
