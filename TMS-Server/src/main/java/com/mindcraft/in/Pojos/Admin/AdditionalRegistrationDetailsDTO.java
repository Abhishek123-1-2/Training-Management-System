package com.mindcraft.in.Pojos.Admin;

import java.util.Date;

public class AdditionalRegistrationDetailsDTO {
    private String empCode;
    private String courseName;
    private String trainerName;
    private Date startDate;
    private Date endDate;
    private String fromTime;
    private String toTime;
    private String status;

    // Constructors, getters, and setters

    // Constructors
    public AdditionalRegistrationDetailsDTO() {
    }

    public AdditionalRegistrationDetailsDTO(String courseName, String trainerName, Date startDate, Date endDate, String fromTime, String toTime, String status,String empCode) {
        this.courseName = courseName;
        this.trainerName = trainerName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.status = status;
        this.empCode=empCode;
    }

    // Getters and Setters
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }
}
