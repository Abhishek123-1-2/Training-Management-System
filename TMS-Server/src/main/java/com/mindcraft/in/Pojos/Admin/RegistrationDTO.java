package com.mindcraft.in.Pojos.Admin;

import java.sql.Timestamp;

public class RegistrationDTO {
    private Long registration_id;
    private Long training_id;
    private Long emp_id;
    private Timestamp registration_date;
    private String registration_comments;
    private String registration_status;
    private String registration_response;
    private char active_yn;
    private String created_by;

    public RegistrationDTO() {

    }

    public RegistrationDTO(Long registartion_id, Long training_id, Long emp_id,
    Timestamp registartion_date, String registration_comments, String registration_status, String registration_response,
    char active_yn, String created_by) {
        this.registration_id = registartion_id;
        this.training_id = training_id;
        this.emp_id = emp_id;
        this.registration_date = registartion_date;
        this.registration_comments = registration_comments;
        this.registration_status = registration_status;
        this.registration_response = registration_response;
        this.active_yn = active_yn;
        this.created_by = created_by;
    }

    public Long getRegistration_id() {
        return registration_id;
    }

    public void setRegistration_id(Long registration_id) {
        this.registration_id = registration_id;
    }

    public Long getTraining_id() {
        return training_id;
    }

    public void setTraining_id(Long training_id) {
        this.training_id = training_id;
    }

    public Long getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(Long emp_id) {
        this.emp_id = emp_id;
    }

    public Timestamp getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Timestamp registration_date) {
        this.registration_date = registration_date;
    }

    public String getRegistration_comments() {
        return registration_comments;
    }

    public void setRegistration_comments(String registration_comments) {
        this.registration_comments = registration_comments;
    }

    public String getRegistration_status() {
        return registration_status;
    }

    public void setRegistration_status(String registration_status) {
        this.registration_status = registration_status;
    }

    public String getRegistration_response() {
        return registration_response;
    }

    public void setRegistration_response(String registration_response) {
        this.registration_response = registration_response;
    }

    public char getActive_yn() {
        return active_yn;
    }

    public void setActive_yn(char active_yn) {
        this.active_yn = active_yn;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }
}
