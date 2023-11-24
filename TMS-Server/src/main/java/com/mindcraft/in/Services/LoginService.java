package com.mindcraft.in.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.User;

// LoginService.java
@Service
public class LoginService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public LoginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map<String, String> login(User user) {
        String sql = "SELECT user_role FROM users WHERE username = ? AND password = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, user.getUsername(), user.getPassword());

        if (!result.isEmpty()) {
            String role = (String) result.get(0).get("user_role");
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("role", role);
            response.put("message", "Login successful");
            System.out.println(role);
            return response;
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("status", "fail");
            response.put("message", "Invalid credentials");
            return response;
        }
    }
}
