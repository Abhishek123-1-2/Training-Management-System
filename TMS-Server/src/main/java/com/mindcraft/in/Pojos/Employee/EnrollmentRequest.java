package com.mindcraft.in.Pojos.Employee;

public class EnrollmentRequest {
    
    private Long training_id;
    private Long schedule_id;
    private Long empId;

    public EnrollmentRequest() {
        
    }

    public EnrollmentRequest(Long training_id, Long schedule_id, Long empId) {
        this.training_id = training_id;
        this.schedule_id = schedule_id;
        this.empId = empId;
    }

    public Long getTrainingId() {
        return training_id;
    }
    public void setTrainingId(Long training_id) {
        this.training_id = training_id;
    }
    public Long getScheduleId() {
        return schedule_id;
    }
    public void setScheduleId(Long schedule_id) {
        this.schedule_id = schedule_id;
    }
    public Long getEmpId() {
        return empId;
    }
    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    // public Object getEmp_id() {
    //     return null;
    // }

    public Object getRegistration_comments() {
        return null;
    }

    public Object getRegistration_response() {
        return null;
    }

    
}
