package com.mindcraft.in.Pojos.Employee;
public class TrainingEnrollmentDTO {

    private Long trainingId;
    private Long scheduleId;
    private Long empId;
    private String course;

    // Constructors, getters, and setters
    
    public TrainingEnrollmentDTO(Long trainingId, Long scheduleId, Long empId, String course) {
        this.trainingId = trainingId;
        this.scheduleId = scheduleId;
        this.empId = empId;
        this.course = course;
    }
    public Long getTrainingId() {
        return trainingId;
    }
    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
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
    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }
    
    // Getters and Setters
    // ...

}

