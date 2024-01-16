package com.mindcraft.in.Pojos.Trainer;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="m_employee")
public class EmpDetails {

    @Id
    @Column(name="emp_id")
    private Long empId;

    @Column(name="schedule_id")
    private Long scheduleId;
    
    @Column(name="emp_code")
    private String empCode;

    @Column(name="emp_name")
    private String empName;

    @Column(name="planned_start_date")
    private Date plannedStartDate;  //startDate

    @Column(name="planned_end_date")
    private Date plannedEndDate;  //endDate

    @Column(name="training_status")
    private String status;

    @Column(name = "trainer_name")
    private String trainerName;

    public EmpDetails(){   
    }

    public EmpDetails(Long empId,Long scheduleId,String empCode, String empName, Date plannedStartDate, Date plannedEndDate, String status,String trainerName) {
        this.empId=empId;
        this.scheduleId=scheduleId;
        this.empCode = empCode;
        this.empName = empName;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.status = status;
        this.trainerName=trainerName;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getEmpId() {
        return empId;
        //System.out.println(empId);
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "EmpDetails [empId=" + empId + ", scheduleId=" + scheduleId + ", empCode=" + empCode + "]";
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    
   

}
