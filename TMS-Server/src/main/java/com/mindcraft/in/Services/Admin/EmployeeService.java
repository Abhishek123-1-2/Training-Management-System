package com.mindcraft.in.Services.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.Employee;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Employee> getEmployeeDetails(String empCode) {
        String sql = "SELECT * FROM m_employee WHERE emp_code = ?";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, empCode);

        return results.stream()
            .map(result -> {
                Employee employee = new Employee();
                employee.setEmpId((Long) result.get("emp_id"));
                employee.setEmpCode((String) result.get("emp_code"));
                employee.setEmpName((String) result.get("emp_name"));
                // Set other fields as needed
                return employee;
            })
            .collect(Collectors.toList());
    }
    
    public List<String> getEmployeeCodes() {
        String sql = "SELECT emp_code FROM m_employee";
        return jdbcTemplate.queryForList(sql, String.class);
    }
    public Long getEmployeeId(String empCode) {
        String sql = "SELECT emp_id FROM m_employee WHERE emp_code = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{empCode}, Long.class);
        } catch (Exception e) {
            // Handle exceptions (e.g., if empCode is not found)
            return null;
        }
    }
}

