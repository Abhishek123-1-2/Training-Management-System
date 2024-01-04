package com.mindcraft.in.Pojos.Employee;

public class TrainingHistoryDTO {

    private String empId;
    private String course;
    private String trainerName;
    private String plannedStartDate;
    private String plannedEndDate;
    private String trainingStatus;

    public TrainingHistoryDTO() {

    }

    public TrainingHistoryDTO(String empId, String course, String trainerName, String plannedStartDate, String plannedEndDate, String trainingStatus) {
        this.empId = empId;
        this.course = course;
        this.trainerName = trainerName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainingStatus = trainingStatus;    
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
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
    public String getPlannedStartDate() {
        return plannedStartDate;
    }
    public void setPlannedStartDate(String plannedStartDate) {
        this.plannedStartDate = plannedStartDate;
    }
    public String getPlannedEndDate() {
        return plannedEndDate;
    }
    public void setPlannedEndDate(String plannedEndDate) {
        this.plannedEndDate = plannedEndDate;
    }
    public String getTrainingStatus() {
        return trainingStatus;
    }
    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }   
}
