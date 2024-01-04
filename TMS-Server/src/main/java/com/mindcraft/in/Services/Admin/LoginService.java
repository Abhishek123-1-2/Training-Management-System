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

                Map<String, String> response = new HashMap<>();
                response.put("status", "success");
                response.put("role", role);
                response.put("employeeName", employeeName);
                response.put("empId", String.valueOf(empId));
                response.put("empCode", empCode); 
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
            // TODO: handle exception
            e.printStackTrace(); // Log the exception for debugging purposes

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Internal Server Error");

            return errorResponse;
        }
        // String sql = "SELECT user_role FROM users WHERE username = ? AND password = ?";
        // List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, user.getUsername(), user.getPassword());

        // if (!result.isEmpty()) {
        //     String role = (String) result.get(0).get("user_role");
        //     Map<String, String> response = new HashMap<>();
        //     response.put("status", "success");
        //     response.put("role", role);
        //     response.put("message", "Login successful");
        //     System.out.println(role);
        //     return response;
        // } else {
        //     Map<String, String> response = new HashMap<>();
        //     response.put("status", "fail");
        //     response.put("message", "Invalid credentials");
        //     return response;
        // }
    }
}

