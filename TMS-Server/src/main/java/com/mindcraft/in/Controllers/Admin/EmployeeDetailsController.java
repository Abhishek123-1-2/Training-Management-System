// EmployeeDetailsController.java
package com.mindcraft.in.Controllers.Admin;

import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Services.Admin.EmployeeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employee-details")
public class EmployeeDetailsController {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @GetMapping("/all")
    public List<EmployeeDetailsDTO> getAllEmployeeDetails() {
        return employeeDetailsService.getEmployeeDetails();
    }

    // You can add more methods and mappings as needed
}

