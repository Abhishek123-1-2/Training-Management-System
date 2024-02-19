package com.mindcraft.in.Pojos.Admin;

public class CreateUserRequest {
    private String username;
    private String password;
    private String userRole;
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUserRole() {
        return userRole;
    }
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    // Getters and setters
    
}
