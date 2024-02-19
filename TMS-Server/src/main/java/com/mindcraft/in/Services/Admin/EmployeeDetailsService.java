// EmployeeDetailsService.java
package com.mindcraft.in.Services.Admin;

import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<EmployeeDetailsDTO> getEmployeeDetails() {
        // Add your SQL query to fetch employee details
        String sql = "SELECT emp_code, emp_name, designation_name, function_name, email FROM m_employee";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmployeeDetailsDTO.class));
    }

    public String getEmployeePrimarySkill(String empCode) {
        // Add SQL query to fetch the primary skill of the employee based on empCode
        String sql = "SELECT primary_skill_name FROM m_employee WHERE emp_code = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{empCode}, String.class);
        } catch (Exception e) {
            // Handle exceptions appropriately
            return null; // or throw exception
        }
    }
    // You can add more methods as needed for specific requirements
}

