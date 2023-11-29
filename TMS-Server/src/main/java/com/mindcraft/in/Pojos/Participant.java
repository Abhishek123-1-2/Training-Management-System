package com.mindcraft.in.Pojos;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Participant 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_id")
    private Integer registration_id;
    
    @Column(name = "schedule_id")
    private Integer schedule_id;


    @Column(name = "training_id")
    private Integer training_id;

    @Column(name = "emp_id")
    private Integer emp_id;

    @Column(name = "registration_date")
    private Date registration_date;

    @Column(name = "registration_comments")
    private String registration_comments;
    
    @Column(name = "registration_status")
    private String registration_status;

    @Column(name = "registration_response")
    private String registration_response;

    @Column(name = "active_yn")
    private Date active_yn;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "created_on")
    private Date created_on;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "updated_on")
    private Date updated_on;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRegistration_id() {
        return registration_id;
    }

    public void setRegistration_id(Integer registration_id) {
        this.registration_id = registration_id;
    }

    public Integer getSchedule_id() {
        return schedule_id;
    }

    public void setSchedule_id(Integer schedule_id) {
        this.schedule_id = schedule_id;
    }

    public Integer getTraining_id() {
        return training_id;
    }

    public void setTraining_id(Integer training_id) {
        this.training_id = training_id;
    }

    public Integer getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(Integer emp_id) {
        this.emp_id = emp_id;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
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

    public Date getActive_yn() {
        return active_yn;
    }

    public void setActive_yn(Date active_yn) {
        this.active_yn = active_yn;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public Date getCreated_on() {
        return created_on;
    }

    public void setCreated_on(Date created_on) {
        this.created_on = created_on;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public Date getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(Date updated_on) {
        this.updated_on = updated_on;
    }

    public Participant(Long id, Integer registration_id, Integer schedule_id, Integer training_id, Integer emp_id,
            Date registration_date, String registration_comments, String registration_status,
            String registration_response, Date active_yn, String created_by, Date created_on, String updated_by,
            Date updated_on) {
        this.id = id;
        this.registration_id = registration_id;
        this.schedule_id = schedule_id;
        this.training_id = training_id;
        this.emp_id = emp_id;
        this.registration_date = registration_date;
        this.registration_comments = registration_comments;
        this.registration_status = registration_status;
        this.registration_response = registration_response;
        this.active_yn = active_yn;
        this.created_by = created_by;
        this.created_on = created_on;
        this.updated_by = updated_by;
        this.updated_on = updated_on;
    }


    

    

    
    
}
