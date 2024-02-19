// package com.mindcraft.in.Services.Admin;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {

//     @Autowired
//     private JdbcTemplate jdbcTemplate;

//     public void insertUser(String username, String password, String userRole) {
//         String sql = "INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)";
//         jdbcTemplate.update(sql, username, password, userRole);
//     }
// }
package com.mindcraft.in.Services.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertUser(String username, String plainPassword, String userRole) {
        String sql = "INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, username, plainPassword, userRole);
    }
}
