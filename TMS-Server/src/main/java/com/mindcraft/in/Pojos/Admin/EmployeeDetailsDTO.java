package com.mindcraft.in.Pojos.Admin;

import java.util.Date;

public class EmployeeDetailsDTO {
    private String empCode;
    private String empName;
    private String designationName;
    private String functionName;
    private String email;
    private String registrationStatus;
    private String trainerName;
    private Date plannedStartDate;
    private Date plannedEndDate;
    public EmployeeDetailsDTO(){

    }

    public EmployeeDetailsDTO(String empCode, String empName, String designationName, String functionName,
            String email,String registrationStatus, String trainerName, Date plannedStartDate,Date plannedEndDate) {
        this.empCode = empCode;
        this.empName = empName;
        this.designationName = designationName;
        this.functionName = functionName;
        this.email = email;
        this.registrationStatus=registrationStatus;
        this.trainerName=trainerName;
        this.plannedStartDate=plannedStartDate;
        this.plannedEndDate=plannedEndDate;

    }

    public String getEmpCode() {
        return empCode;
    }public Date getPlannedStartDate() {
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



    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
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

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegistrationStatus() {
        return registrationStatus;
    }

    public void setRegistrationStatus(String registrationStatus) {
        this.registrationStatus = registrationStatus;
    }
    
    // Constructors, getters, and setters
    
}

