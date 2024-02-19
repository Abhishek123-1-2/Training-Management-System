package com.mindcraft.in.Pojos.Admin;

import java.util.List;

public class MultipleEmailRequest {
    private List<String> emails;
    private String subject;
    private String body;
    public MultipleEmailRequest(List<String> emails, String subject, String body) {
        this.emails = emails;
        this.subject = subject;
        this.body = body;
    }
    public List<String> getEmails() {
        return emails;
    }
    public void setEmails(List<String> emails) {
        this.emails = emails;
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

    // Constructor, getters, and setters
    
}
