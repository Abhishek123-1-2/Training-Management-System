package com.mindcraft.in.Pojos.HR;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class AttendanceRecord 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_code")
    private Integer emp_code;
     @Column(name = "emp_name")
    private Integer emp_name;
    @Column(name = "course")
    private String  course;
    @Column(name = "trainer_names")
    private String  trainer_names;
    @Column(name = "planned_start_date")
    private Date planned_start_date;
    @Column(name = "planned_end_date")
    private Date planned_end_date;
    public Integer getEmp_code() {
        return emp_code;
    }
    public void setEmp_code(Integer emp_code) {
        this.emp_code = emp_code;
    }
    public Integer getEmp_name() {
        return emp_name;
    }
    public void setEmp_name(Integer emp_name) {
        this.emp_name = emp_name;
    }
    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }
    public String getTrainer_names() {
        return trainer_names;
    }
    public void setTrainer_names(String trainer_names) {
        this.trainer_names = trainer_names;
    }
    public Date getPlanned_start_date() {
        return planned_start_date;
    }
    public void setPlanned_start_date(Date planned_start_date) {
        this.planned_start_date = planned_start_date;
    }
    public Date getPlanned_end_date() {
        return planned_end_date;
    }
    public void setPlanned_end_date(Date planned_end_date) {
        this.planned_end_date = planned_end_date;
    }
    public AttendanceRecord(Integer emp_code, Integer emp_name, String course, String trainer_names,
            Date planned_start_date, Date planned_end_date) {
        this.emp_code = emp_code;
        this.emp_name = emp_name;
        this.course = course;
        this.trainer_names = trainer_names;
        this.planned_start_date = planned_start_date;
        this.planned_end_date = planned_end_date;
    }
    
}
