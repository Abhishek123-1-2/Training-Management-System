package com.mindcraft.in.Pojos.Admin;

import java.sql.Timestamp;

public class TrainingViewDto {

    private Long scheduleId;
    private Long trainingId;
    private String trainerName;
    private Timestamp plannedStartDate;
    private Timestamp plannedEndDate;
    private Timestamp actualStartDate;
    private Timestamp actualEndDate;
    private String trainingStatus;
    private String fromTime;
    private String toTime;
    private char activeYn;
    private String createdBy;
    private Timestamp createdOn;
    private String updatedBy;
    private Timestamp updatedOn;
    private String course;

    // Default constructor
    public TrainingViewDto() {
        // Empty constructor
    }

    // Parameterized constructor
    public TrainingViewDto(Long scheduleId, Long trainingId, 
    String trainerName, Timestamp plannedStartDate,
            Timestamp plannedEndDate, 
            Timestamp actualStartDate, 
            Timestamp actualEndDate, String trainingStatus,
            char activeYn, String createdBy, 
            Timestamp createdOn, String updatedBy, 
            Timestamp updatedOn,
            String course,String fromTime,
            String toTime) {
        this.scheduleId = scheduleId;
        this.trainingId = trainingId;
        this.trainerName = trainerName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.actualStartDate = actualStartDate;
        this.actualEndDate = actualEndDate;
        this.trainingStatus = trainingStatus;
        this.fromTime=fromTime;
        this.toTime=toTime;
        this.activeYn = activeYn;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
        this.course = course;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public Timestamp getPlannedStartDate() {
        return plannedStartDate;
    }

    public void setPlannedStartDate(Timestamp plannedStartDate) {
        this.plannedStartDate = plannedStartDate;
    }

    public Timestamp getPlannedEndDate() {
        return plannedEndDate;
    }

    public void setPlannedEndDate(Timestamp plannedEndDate) {
        this.plannedEndDate = plannedEndDate;
    }

    public Timestamp getActualStartDate() {
        return actualStartDate;
    }

    public void setActualStartDate(Timestamp actualStartDate) {
        this.actualStartDate = actualStartDate;
    }

    public Timestamp getActualEndDate() {
        return actualEndDate;
    }

    public void setActualEndDate(Timestamp actualEndDate) {
        this.actualEndDate = actualEndDate;
    }

    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    public char getActiveYn() {
        return activeYn;
    }

    public void setActiveYn(char activeYn) {
        this.activeYn = activeYn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    // Getters and setters
    
    // Add any additional fields or methods as needed
}
