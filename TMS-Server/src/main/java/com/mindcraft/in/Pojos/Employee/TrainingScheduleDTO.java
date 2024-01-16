package com.mindcraft.in.Pojos.Employee;

import java.sql.Timestamp;

public class TrainingScheduleDTO {
    
    private Long trainingId;
    private Long scheduleId;
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
    private String training_schedule;
    private Long empId;
    private String registrationStatus;
    private String registrationResponse;

    // Constructors, getters, and setters

    public TrainingScheduleDTO() {
        
    }

    public TrainingScheduleDTO(Long trainingId, Long scheduleId, Long empId, String trainerName, Timestamp plannedStartDate,
    Timestamp plannedEndDate, Timestamp actualStartDate, Timestamp actualEndDate, String trainingStatus,
    char activeYn, String createdBy, Timestamp createdOn, String updatedBy, Timestamp updatedOn,
    String course,String training_schedule,String fromTime,String toTime, String registrationStatus, String registrationResponse) {
        this.trainingId = trainingId;
        this.scheduleId = scheduleId;
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
        this.training_schedule = training_schedule;
        this.empId = empId;
        this.registrationStatus = registrationStatus;
        this.registrationResponse = registrationResponse;
    }

    // Getters and Setters

     public String getRegistrationResponse() {
        return registrationResponse;
    }

    public void setRegistrationResponse(String registrationResponse) {
        this.registrationResponse = registrationResponse;
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

    public String getTrainingSchedule() {
        return training_schedule;
    }

    public void setTrainingSchedule(String training_schedule) {
        this.training_schedule = training_schedule;
    }
    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

     public String getRegistrationStatus() {
        return registrationStatus;
    }

    public void setRegistrationStatus(String registrationStatus) {
        this.registrationStatus = registrationStatus;
    }
}
