package com.mindcraft.in.Services.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.Employee;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
    // EmployeeService.java
public String getEmployeeEmail(String empCode) {
    String sql = "SELECT email FROM m_employee WHERE emp_code = ?";
    try {
        return jdbcTemplate.queryForObject(sql, new Object[]{empCode}, String.class);
    } catch (Exception e) {
        // Handle exceptions (e.g., if empCode is not found)
        return null;
    }
}

    
    public String getEmployeeName(String empCode) {
        String sql = "SELECT emp_name FROM m_employee WHERE emp_code = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{empCode}, String.class);
        } catch (Exception e) {
            // Handle exceptions (e.g., if empCode is not found)
            return null;
        }
    } 
    
  
public List<Long> getSubordinateEmployeeIds(String employeeName) {
    try {
        String sql = "SELECT emp_id FROM m_employee WHERE TRIM(reporting_manager_name) = ?";;
        System.out.println("SQL Query: " + sql);
        System.out.println("Reporting Manager Name (parameter): " + employeeName);

        List<Long> subordinateEmpIds = jdbcTemplate.queryForList(sql, Long.class, employeeName);

        System.out.println("Subordinate Employee IDs: " + subordinateEmpIds);
        return subordinateEmpIds;
    } catch (Exception e) {
        e.printStackTrace();
        return Collections.emptyList();
    }
}

public String getEmployeeEmailByName(String empName) {
    String sql = "SELECT email FROM m_employee WHERE emp_name = ?";
    try {
        return jdbcTemplate.queryForObject(sql, new Object[]{empName}, String.class);
    } catch (Exception e) {
        // Handle exceptions (e.g., if empName is not found)
        return null;
    }
}

 public Map<Long, List<String>> getSubordinateEmployeeIdsWithCodes(String employeeName) {
        try {
            String sql = "SELECT emp_id, emp_code FROM m_employee WHERE TRIM(reporting_manager_name) = ?";
            System.out.println("SQL Query: " + sql);
            System.out.println("Reporting Manager Name (parameter): " + employeeName);

            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, employeeName);

            Map<Long, List<String>> subordinateIdsWithCodes = new HashMap<>();
            for (Map<String, Object> row : results) {
                Long empId = (Long) row.get("emp_id");
                String empCode = (String) row.get("emp_code");
                subordinateIdsWithCodes.computeIfAbsent(empId, k -> new ArrayList<>()).add(empCode);
            }

            System.out.println("Subordinate Employee IDs with Codes: " + subordinateIdsWithCodes);
            return subordinateIdsWithCodes;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyMap();
        }
    }

    public List<String> getSubordinateEmployeeCodes(String employeeName) {
        try {
            String sql = "SELECT emp_code FROM m_employee WHERE TRIM(reporting_manager_name) = ?";
            System.out.println("SQL Query: " + sql);
            System.out.println("Reporting Manager Name (parameter): " + employeeName);
    
            List<String> subordinateEmpCodes = jdbcTemplate.queryForList(sql, String.class, employeeName);
    
            // Log the extracted subordinate employee codes
            System.out.println("Subordinate Employee Codes: " + subordinateEmpCodes);
            return subordinateEmpCodes;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
public List<String> getEmployeeNamesBySearch(String search) {
    String sql = "SELECT emp_name FROM m_employee WHERE emp_name LIKE ?";
    String searchTerm = "%" + search + "%";

    return jdbcTemplate.queryForList(sql, String.class, searchTerm);
}

public String getEmployeeCodeByName(String empName) {
    String sql = "SELECT emp_code FROM m_employee WHERE emp_name = ?";
    try {
        return jdbcTemplate.queryForObject(sql, new Object[]{empName}, String.class);
    } catch (Exception e) {
        // Handle exceptions (e.g., if empName is not found)
        return null;
    }
}


}

