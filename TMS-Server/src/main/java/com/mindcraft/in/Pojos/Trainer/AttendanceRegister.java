package com.mindcraft.in.Pojos.Trainer;

import java.time.LocalDate;

public class AttendanceRegister {
    private Long attendanceId;
    private Long scheduleId;
    private Long empId;
    private LocalDate attendanceDate;
    private String attendanceComments;
    private String activeYN;
    private String createdBy;
    private String updatedBy;
    private LocalDate createdOn;
    private LocalDate updatedOn;
    public AttendanceRegister(Long attendanceId, Long scheduleId, Long empId, LocalDate attendanceDate,
            String attendanceComments, String activeYN, String createdBy, String updatedBy, LocalDate createdOn,
            LocalDate updatedOn) {
        this.attendanceId = attendanceId;
        this.scheduleId = scheduleId;
        this.empId = empId;
        this.attendanceDate = attendanceDate;
        this.attendanceComments = attendanceComments;
        this.activeYN = activeYN;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }
    public Long getAttendanceId() {
        return attendanceId;
    }
    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }
    public Long getScheduleId() {
        return scheduleId;
    }
    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
    public Long getEmpId() {
        return empId;
    }
    public void setEmpId(Long empId) {
        this.empId = empId;
    }
    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }
    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }
    public String getAttendanceComments() {
        return attendanceComments;
    }
    public void setAttendanceComments(String attendanceComments) {
        this.attendanceComments = attendanceComments;
    }
    public String getActiveYN() {
        return activeYN;
    }
    public void setActiveYN(String activeYN) {
        this.activeYN = activeYN;
    }
    public String getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public String getUpdatedBy() {
        return updatedBy;
    }
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
    public LocalDate getCreatedOn() {
        return createdOn;
    }
    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }
    public LocalDate getUpdatedOn() {
        return updatedOn;
    }
    public void setUpdatedOn(LocalDate updatedOn) {
        this.updatedOn = updatedOn;
    }

    // Constructors, getters, setters...
    
}

