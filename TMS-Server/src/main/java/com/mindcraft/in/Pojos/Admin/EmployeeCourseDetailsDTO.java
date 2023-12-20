// EmployeeCourseDetailsDTO.java
package com.mindcraft.in.Pojos.Admin;

public class EmployeeCourseDetailsDTO {
    private String empCode;
    private String empName;
    private String courseName;
    private String trainerName;
    private String startDate;
    private String endDate;
    private String trainingStatus;

    // Constructors, getters, and setters
   public EmployeeCourseDetailsDTO(){

   }

    public EmployeeCourseDetailsDTO(String empCode, String empName, String courseName, String trainerName, String startDate, String endDate, String trainingStatus) {
        this.empCode = empCode;
        this.empName = empName;
        this.courseName = courseName;
        this.trainerName = trainerName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainingStatus = trainingStatus;
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

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }
    
    // Getters and setters
    // ...
}
