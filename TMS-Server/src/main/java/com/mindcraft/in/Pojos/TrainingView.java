package com.mindcraft.in.Pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Timestamp;

@Entity
@Table(name = "m_trainings")  // Specify the table name if it's different from the class name
public class TrainingView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_id")
    private Long training_id;

    @Column(name = "training_category")
    private String training_category;

    @Column(name = "training_type")
    private String training_type;

    @Column(name = "training_schedule")
    private String training_schedule;

    @Column(name = "course")
    private String course;

    @Column(name = "trainer_names")
    private String trainer_names;

    @Column(name = "prerequisites")
    private String prerequisites;

    @Column(name = "course_description")
    private String course_description;

    @Column(name = "daily_hrs")
    private Long daily_hrs;

    @Column(name = "total_days")
    private Long total_days;

    @Column(name = "url")
    private String url;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "active_yn")
    private char active_yn;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "created_on")
    private Timestamp created_on;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "updated_on")
    private Timestamp updated_on;

    public Long getTraining_id() {
        return training_id;
    }

    public void setTraining_id(Long training_id) {
        this.training_id = training_id;
    }

    public String getTraining_category() {
        return training_category;
    }

    public void setTraining_category(String training_category) {
        this.training_category = training_category;
    }

    public String getTraining_type() {
        return training_type;
    }

    public void setTraining_type(String training_type) {
        this.training_type = training_type;
    }

    public String getTraining_schedule() {
        return training_schedule;
    }

    public void setTraining_schedule(String training_schedule) {
        this.training_schedule = training_schedule;
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

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getCourse_description() {
        return course_description;
    }

    public void setCourse_description(String course_description) {
        this.course_description = course_description;
    }

    public Long getDaily_hrs() {
        return daily_hrs;
    }

    public void setDaily_hrs(Long daily_hrs) {
        this.daily_hrs = daily_hrs;
    }

    public Long getTotal_days() {
        return total_days;
    }

    public void setTotal_days(Long total_days) {
        this.total_days = total_days;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

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

    public Timestamp getCreated_on() {
        return created_on;
    }

    public void setCreated_on(Timestamp created_on) {
        this.created_on = created_on;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public Timestamp getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(Timestamp updated_on) {
        this.updated_on = updated_on;
    }

   
}
