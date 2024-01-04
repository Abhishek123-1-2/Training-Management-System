package com.mindcraft.in.Pojos.Trainer;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


public class TrainingDetails {
 
     @Column(name="attendance_id")
    private Long attendanceId;

    @Column(name = "training_id")
    private Long trainingId;    

    @Column(name="schedule_id")
    private Long scheduleId;

    @Column(name="course")
    private String course;

    @Column(name="planned_start_date")
    private Date plannedStartDate;

    @Column(name="planned_end_date")
    private Date plannedEndDate;

    @Column(name = "training_status")
    private String trainingStatus;

    public TrainingDetails(){}

    public TrainingDetails(String course, 
    Long attendanceId,
    Long trainingId,
    Long scheduleId,
    Date plannedStartDate,
    Date plannedEndDate, 
    String trainingStatus) {
        this.course = course;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainingStatus = trainingStatus;
        this.trainingId=trainingId;
        this.scheduleId=scheduleId;
        this.attendanceId=attendanceId;
    }


    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Date getPlannedStartDate() {
        return plannedStartDate;
    }

    public void setPlannedStartDate(Date plannedStartDate) {
        this.plannedStartDate = plannedStartDate;
    }

    public Date getPlannedEndDate() {
        return plannedEndDate;
    }

    public void setPlannedEndDate(Date plannedEndDate) {
        this.plannedEndDate = plannedEndDate;
    }

    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }


    // Constructor, getters, and setters
    
    
}
