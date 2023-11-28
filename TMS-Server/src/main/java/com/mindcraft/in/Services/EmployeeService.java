package com.mindcraft.in.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Employee;

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
                employee.setEmpCode((String) result.get("emp_code"));
                employee.setEmpName((String) result.get("emp_name"));
                // Set other fields as needed
                return employee;
            })
            .collect(Collectors.toList());
    }
}

