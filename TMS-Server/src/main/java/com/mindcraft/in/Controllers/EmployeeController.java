package com.mindcraft.in.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Employee;
import com.mindcraft.in.Services.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{empCode}")
    public List<Employee> getEmployeeDetails(@PathVariable String empCode) {
        return employeeService.getEmployeeDetails(empCode);
    }
    

@GetMapping("/codes")
public List<String> getEmployeeCodes() {
    return employeeService.getEmployeeCodes();
}

}

