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

    // You can add more methods as needed for specific requirements
}

