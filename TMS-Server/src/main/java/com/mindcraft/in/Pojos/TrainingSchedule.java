package com.mindcraft.in.Pojos;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "training_schedule")
public class TrainingSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "training_id", referencedColumnName = "training_id")
    private TrainingView training;

    @Column(name = "trainer_name")
    private String trainerName;

    @Column(name = "planned_start_date")
    private Date plannedStartDate;

    @Column(name = "planned_end_date")
    private Date plannedEndDate;

    @Column(name = "actual_start_date")
    private Date actualStartDate;

    @Column(name = "actual_end_date")
    private Date actualEndDate;

    @Column(name = "training_status")
    private String trainingStatus;

    @Column(name = "active_yn")
    private char active_yn;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_on")
    private Date createdOn;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_on")
    private Date updatedOn;

    // Constructors, getters, and setters

    // Constructors
    public TrainingSchedule() {
    }

    public TrainingSchedule(Long scheduleId, TrainingView training, String trainerName, Date plannedStartDate,
            Date plannedEndDate, Date actualStartDate, Date actualEndDate, String trainingStatus, char active_yn,
            String createdBy, Date createdOn, String updatedBy, Date updatedOn) {
        this.scheduleId = scheduleId;
        this.training = training;
        this.trainerName = trainerName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.actualStartDate = actualStartDate;
        this.actualEndDate = actualEndDate;
        this.trainingStatus = trainingStatus;
        this.active_yn = active_yn;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }

    // Getters and Setters
    // ...

    // toString() method for debugging or logging
    @Override
    public String toString() {
        return "TrainingSchedule{" +
                "scheduleId=" + scheduleId +
                ", training=" + training +
                ", trainerName='" + trainerName + '\'' +
                ", plannedStartDate=" + plannedStartDate +
                ", plannedEndDate=" + plannedEndDate +
                ", actualStartDate=" + actualStartDate +
                ", actualEndDate=" + actualEndDate +
                ", trainingStatus='" + trainingStatus + '\'' +
                ", active_yn=" + active_yn +
                ", createdBy='" + createdBy + '\'' +
                ", createdOn=" + createdOn +
                ", updatedBy='" + updatedBy + '\'' +
                ", updatedOn=" + updatedOn +
                '}';
    }

    // Getter and Setter for scheduleId
    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    // Getter and Setter for training
    public TrainingView getTraining() {
        return training;
    }

    public void setTraining(TrainingView training) {
        this.training = training;
    }

    // Getter and Setter for trainerName
    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    // Getter and Setter for plannedStartDate
    public Date getPlannedStartDate() {
        return plannedStartDate;
    }

    public void setPlannedStartDate(Date plannedStartDate) {
        this.plannedStartDate = plannedStartDate;
    }

    // Getter and Setter for plannedEndDate
    public Date getPlannedEndDate() {
        return plannedEndDate;
    }

    public void setPlannedEndDate(Date plannedEndDate) {
        this.plannedEndDate = plannedEndDate;
    }

    // Getter and Setter for actualStartDate
    public Date getActualStartDate() {
        return actualStartDate;
    }

    public void setActualStartDate(Date actualStartDate) {
        this.actualStartDate = actualStartDate;
    }

    // Getter and Setter for actualEndDate
    public Date getActualEndDate() {
        return actualEndDate;
    }

    public void setActualEndDate(Date actualEndDate) {
        this.actualEndDate = actualEndDate;
    }

    // Getter and Setter for trainingStatus
    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    // Getter and Setter for active_yn
    public char getActive_yn() {
        return active_yn;
    }

    public void setActive_yn(char active_yn) {
        this.active_yn = active_yn;
    }

    // Getter and Setter for createdBy
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    // Getter and Setter for createdOn
    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    // Getter and Setter for updatedBy
    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    // Getter and Setter for updatedOn
    public Date getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Date updatedOn) {
        this.updatedOn = updatedOn;
    }
}
