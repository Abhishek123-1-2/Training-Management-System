package com.mindcraft.in.Pojos.Admin;

import java.util.Date;

public class RegistrationDetailsDTO {

    private Long registrationId;
    private String empCode;
    private String empName;
    private Date registrationDate;
    private String courseName;
    private String registrationComments;
    private String status;
    private String registrationResponse;
    private Date plannedStartDate;
private Date plannedEndDate;

    // Constructors, getters, and setters

    // Constructors
    public RegistrationDetailsDTO() {
    }

    public RegistrationDetailsDTO(String empCode, String empName, Date registrationDate, String courseName, String registrationComments, String status,String registrationResponse,Long registrationId,Date plannedStartDate,Date plannedEndDate) {
        this.empCode = empCode;
        this.empName = empName;
        this.registrationDate = registrationDate;
        this.courseName = courseName;
        this.registrationComments = registrationComments;
        this.status = status;
        this.registrationResponse = registrationResponse;
        this.registrationId = registrationId;
        this.plannedStartDate=plannedStartDate;
        this.plannedEndDate=plannedEndDate;
        
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

    // Getters and Setters
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

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getRegistrationComments() {
        return registrationComments;
    }

    public void setRegistrationComments(String registrationComments) {
        this.registrationComments = registrationComments;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRegistrationResponse() {
        return registrationResponse;
    }

    public void setRegistrationResponse(String registrationResponse) {
        this.registrationResponse = registrationResponse;
    }

    public Long getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(Long registrationId) {
        this.registrationId = registrationId;
    }

    
}
