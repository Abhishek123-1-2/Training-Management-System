package com.mindcraft.in.Pojos.Admin;

import java.sql.Timestamp;

public class CompletedCourseInfoDTO {

    private String course;
    private String trainerName;
    private Timestamp plannedStartDate;
    private Timestamp plannedEndDate;
    private String trainingStatus;

    // Constructors, getters, and setters

    // Constructors
    public CompletedCourseInfoDTO() {
    }

    public CompletedCourseInfoDTO(String course, String trainerName, Timestamp plannedStartDate, Timestamp plannedEndDate, String trainingStatus) {
        this.course = course;
        this.trainerName = trainerName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainingStatus = trainingStatus;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
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

    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    // Getters and Setters
    // ...
    
}

