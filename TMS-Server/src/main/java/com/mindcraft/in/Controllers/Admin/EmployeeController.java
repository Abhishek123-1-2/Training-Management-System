package com.mindcraft.in.Controllers.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Admin.Employee;
import com.mindcraft.in.Services.Admin.EmployeeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{empCode}")
    public List<Employee> getEmployeeDetails(@PathVariable String empCode) {
        return employeeService.getEmployeeDetails(empCode);
    }
//    @GetMapping("/email/{empCode}")
// public ResponseEntity<String> getEmployeeEmail(@PathVariable String empCode) {
//     String email = employeeService.getEmployeeEmail(empCode);
//     if (email != null) {
//         return ResponseEntity.ok(email); // Return the email ID as JSON string
//     } else {
//         return ResponseEntity.notFound().build();
//     }
// }

@GetMapping("/email")
public ResponseEntity<Map<String, String>> getEmployeeEmailByName(@RequestParam String empName) {
    String email = employeeService.getEmployeeEmailByName(empName);
    if (email != null) {
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("email", email);
        return ResponseEntity.ok(responseBody);
    } else {
        return ResponseEntity.notFound().build();
    }
}


@GetMapping("/email/{empCode}")
public ResponseEntity<Map<String, String>> getEmployeeEmail(@PathVariable String empCode) {
    String email = employeeService.getEmployeeEmail(empCode);
    if (email != null) {
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("email", email);
        return ResponseEntity.ok(responseBody);
    } else {
        return ResponseEntity.notFound().build();
    }
}

// @GetMapping("/email/{empCode}")
// public ResponseEntity<Map<String, String>> getEmployeeEmail(@PathVariable String empCode) {
//     String email = employeeService.getEmployeeEmail(empCode);
//     if (email != null) {
//         Map<String, String> responseBody = new HashMap<>();
//         responseBody.put("email", email);
//         return ResponseEntity.ok(responseBody);
//     } else {
//         return ResponseEntity.notFound().build();
//     }
// }


@GetMapping("/codes")
public List<String> getEmployeeCodes() {
    return employeeService.getEmployeeCodes();
}
@GetMapping("/id/{empCode}")
    public Long getEmployeeId(@PathVariable String empCode) {
        return employeeService.getEmployeeId(empCode);
    }

    
    @GetMapping("/subordinates")
public List<Long> getSubordinateEmployeeIds(@RequestParam String reportingManagerName) {
    System.out.println("Controller: Reporting Manager Name (parameter): " + reportingManagerName);
    
    List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(reportingManagerName);

    System.out.println("Controller: Subordinate Employee IDs: " + subordinateEmpIds);
    return subordinateEmpIds;
}

@GetMapping("/subordinates-with-codes")
public ResponseEntity<Map<Long, List<String>>> getSubordinateEmployeeIdsWithCodes(@RequestParam String reportingManagerName) {
    System.out.println("Controller: Reporting Manager Name (parameter): " + reportingManagerName);

    Map<Long, List<String>> subordinateIdsWithCodes = employeeService.getSubordinateEmployeeIdsWithCodes(reportingManagerName);

    System.out.println("Controller: Subordinate Employee IDs with Codes: " + subordinateIdsWithCodes);
    return ResponseEntity.ok(subordinateIdsWithCodes);
}


@GetMapping("/subordinates-with-empcodes")
public ResponseEntity<List<String>> getSubordinateEmployeeCodes(@RequestParam String reportingManagerName) {
    System.out.println("Controller: Reporting Manager Name (parameter): " + reportingManagerName);

    List<String> subordinateEmpCodes = employeeService.getSubordinateEmployeeCodes(reportingManagerName);

    // Log the extracted subordinate employee codes
    System.out.println("Controller: Subordinate Employee Codes: " + subordinateEmpCodes);
    return ResponseEntity.ok(subordinateEmpCodes);
}
@GetMapping("/names")
public List<String> getEmployeeNamesBySearch(@RequestParam String search) {
    return employeeService.getEmployeeNamesBySearch(search);
}

@GetMapping("/codeByName")
public String getEmployeeCodeByName(@RequestParam String empName) {
    return employeeService.getEmployeeCodeByName(empName);
}


}

