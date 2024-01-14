package com.mindcraft.in.Pojos.Admin;

public class EmployeeTrainingDetailsDTO {
    private String empCode;
    private String empName;
    private String plannedStartDate;
    private String plannedEndDate;
    private String trainingStatus;
    private String trainerName;

    // Constructors, getters, and setters
   public EmployeeTrainingDetailsDTO(){

   }
    // Adjust your constructor accordingly
    public EmployeeTrainingDetailsDTO(String empCode, String empName, String plannedStartDate, String plannedEndDate, String trainingStatus,String trainerName) {
        this.empCode = empCode;
        this.empName = empName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainingStatus = trainingStatus;
        this.trainerName=trainerName;
    }
    
    public String getEmpCode() {
        return empCode;
    }
    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }
    public String getEmpName() {
        return empName;
    }
    public void setEmpName(String empName) {
        this.empName = empName;
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
    public String getTrainerName() {
        return trainerName;
    }
    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }
    
    // Getters and setters
}

