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
        String sql = "SELECT u.user_role, e.emp_code, e.emp_id, e.emp_name FROM users u " +
                "JOIN m_employee e ON u.username = e.emp_code " +
                "WHERE u.username = ? AND u.password = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, user.getUsername(), user.getPassword());

        if (!result.isEmpty()) {

            
            String role = (String) result.get(0).get("user_role");
            String empCode = (String) result.get(0).get("emp_code");
            Long empId = (Long) result.get(0).get("emp_id");

            // Fetch employee name based on empCode from the employee table
            String employeeName = employeeService.getEmployeeName(empCode);

            String additionalParamsSql = "SELECT joining_date, mobileno, email, designation_name, reporting_manager_name FROM m_employee WHERE emp_code = ?";
                Map<String, Object> employeeDetails = jdbcTemplate.queryForMap(additionalParamsSql, empCode);

                String reportingManagerEmail = getReportingManagerEmail((String) employeeDetails.get("reporting_manager_name"));
                
            // Ensure that the reportingManagerName fetched is correct
            System.out.println("Reporting Manager Name: " + reportingManagerName);

            // Fetch reporting manager's email
            // String reportingManagerEmail = getReportingManagerEmail(reportingManagerName);

            // Update this line to use employeeName instead of reportingManagerName
            List<Long> subordinateEmpIds = employeeService.getSubordinateEmployeeIds(employeeName);

            Map<String, String> response = new HashMap<>();
            response.put("reportingManagerEmail", reportingManagerEmail);
            response.put("status", "success");
            response.put("role", role);
            response.put("employeeName", employeeName);
            response.put("empId", String.valueOf(empId));
            response.put("empCode", empCode);
            response.put("joiningDate", employeeDetails.get("joining_date").toString());
                response.put("mobileNo", employeeDetails.get("mobileno").toString());
                response.put("email", employeeDetails.get("email").toString());
                response.put("designation", employeeDetails.get("designation_name").toString());
                response.put("reportingManager", employeeDetails.get("reporting_manager_name").toString());
            response.put("message", "Login successful");

            // Update this line to include subordinateEmpIds in the response
            response.put("subordinateEmpIds", subordinateEmpIds.toString());
            System.out.println("Role: " + role);
            System.out.println("Employee Name: " + employeeName);
            System.out.println("Employee ID: " + empId);
            System.out.println("Employee Code: " + empCode);
            System.out.println("Joining Date: " + employeeDetails.get("joining_date"));
            System.out.println("Mobile No: " + employeeDetails.get("mobileno"));
            System.out.println("Email: " + employeeDetails.get("email"));
            System.out.println("Designation: " + employeeDetails.get("designation_name"));
            System.out.println("Reporting Manager: " + employeeDetails.get("reporting_manager_name"));
            System.out.println("Subordinate Employee IDs: " + subordinateEmpIds);
            
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


        
    
    // private String getReportingManagerName(String username) {
    //     try {
    //         String sql = "SELECT reporting_manager_name FROM m_employee WHERE emp_code = ?";
    //         return jdbcTemplate.queryForObject(sql, String.class, username);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return null;
    //     }
    // }
    private String getReportingManagerName(String username) {
        try {
            String sql = "SELECT reporting_manager_name FROM m_employee WHERE emp_code = ?";
            String reportingManagerName = jdbcTemplate.queryForObject(sql, String.class, username);
            System.out.println("Reporting Manager Name: " + reportingManagerName);
    
            // Pass reporting manager name to get email
            String reportingManagerEmail = getReportingManagerEmail(reportingManagerName);
            System.out.println("Reporting Manager Email: " + reportingManagerEmail);
    
            return reportingManagerName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    

   
    // public String getReportingManagerEmail(String employeeName) {
    //     try {
    //         // Fetch reporting manager name for the given employee name
    //         String reportingManagerName = getReportingManagerName(employeeName);

    //         if (reportingManagerName != null) {
    //             // Query to fetch email using reporting manager name
    //             String sql = "SELECT email FROM m_employee WHERE emp_name = ?";
    //             return jdbcTemplate.queryForObject(sql, String.class, reportingManagerName);
    //         } else {
    //             // Handle case when reporting manager name is not found
    //             System.err.println("Reporting manager name not found for employee: " + employeeName);
    //             return null;
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return null;
    //     }
    // }

    public String getReportingManagerEmail(String reportingManagerName) {
        try {
            // Query to fetch email using reporting manager name
            String sql = "SELECT email FROM m_employee WHERE emp_name = ?";
            return jdbcTemplate.queryForObject(sql, String.class, reportingManagerName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
    
}





