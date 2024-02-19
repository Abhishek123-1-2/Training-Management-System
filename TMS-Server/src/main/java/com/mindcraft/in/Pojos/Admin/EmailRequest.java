package com.mindcraft.in.Pojos.Admin;

public class EmailRequest {
    private String email;
    private String subject;
    private String body;
    private String empName;
    public EmailRequest(String email, String subject, String body,String empName) {
        this.email = email;
        this.subject = subject;
        this.body = body;
        this.empName=empName;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    // Getters and setters
}
