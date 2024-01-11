package com.mindcraft.in.Services.Admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.User;

// LoginService.java
@Service
public class LoginService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeService employeeService;

    @Autowired
    public LoginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

  
    public Map<String, String> login(User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        String reportingManagerName = getReportingManagerName(username);
    
        System.out.println("Attempting login with username: " + username + " and password: " + password);
    
        try {
            String sql = "SELECT u.user_role, e.emp_code, e.emp_id FROM users u " +
                    "JOIN m_employee e ON u.username = e.emp_code " +
                    "WHERE u.username = ? AND u.password = ?";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, user.getUsername(), user.getPassword());
    
            if (!result.isEmpty()) {
                String role = (String) result.get(0).get("user_role");
                String empCode = (String) result.get(0).get("emp_code");
                Long empId = (Long) result.get(0).get("emp_id");
    
                // Fetch employee name based on empCode from the employee table
                String employeeName = employeeService.getEmployeeName(empCode);
    
                // Ensure that the reportingManagerName fetched is correct
                System.out.println("Reporting Manager Name: " + reportingManagerName);
    
                // Update this line to use employeeName instead of reportingManagerName
                List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(employeeName);
    
                Map<String, String> response = new HashMap<>();
                response.put("status", "success");
                response.put("role", role);
                response.put("employeeName", employeeName);
                response.put("empId", String.valueOf(empId));
                response.put("empCode", empCode);
                response.put("reportingManagerName", reportingManagerName);
                response.put("subordinateEmpIds", subordinateEmpIds.toString());
                response.put("message", "Login successful");
    
                System.out.println("Employee Name: " + employeeName);
                System.out.println(role);
                return response;
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("status", "fail");
                response.put("message", "Invalid credentials");
                return response;
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
    
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Internal Server Error");
    
            return errorResponse;
        }
    }
    

        
    public String getReportingManagerName(String empCode) {
        try {
            String sql = "SELECT reporting_manager_name FROM m_employee WHERE emp_code = ?";
            return jdbcTemplate.queryForObject(sql, String.class, empCode);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}





