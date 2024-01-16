package com.mindcraft.in.Pojos.Trainer;

import java.sql.Timestamp;

public class TrainingsDTO {
    
    private Long trainingId;
    private Long scheduleId;
    private String course;
    private String training_status;
    private Timestamp plannedStartDate;
    private Timestamp plannedEndDate;
    private String trainerName;


    public TrainingsDTO() {

    }

    public TrainingsDTO(Long trainigId, Long scheduleId, String course, 
    String training_status, Timestamp plannedStartDate, Timestamp plannedEndDate,String trainerName) {
        this.trainingId = trainigId;
        this.scheduleId = scheduleId;
        this.course = course;
        this.training_status = training_status;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainerName=trainerName;
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

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getTraining_status() {
        return training_status;
    }

    public void setTraining_status(String training_status) {
        this.training_status = training_status;
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

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

}
