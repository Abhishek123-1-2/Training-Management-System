package com.mindcraft.in.Pojos.Employee;

public class EmpFeedbackDTO {

    private Long scheduleId;
    private Long attendanceId;
    private Long empId;
    private int effectiveness;
    private int content;
    private int methodology;
    private int organization;
    private int trainer_rating;
    private String commentsFromEmployee;
    private String feedback_type;

    public EmpFeedbackDTO() {

    }

    public EmpFeedbackDTO(Long scheduleId, Long attendanceId, Long empId, int effectiveness, int content,
    int methodology, int organization, int trainer_rating, String commentsFromEmployee, String feedback_type) {
        this.scheduleId = scheduleId;
        this.attendanceId = attendanceId;
        this.empId = empId;
        this.effectiveness = effectiveness;
        this.content = content;
        this.methodology = methodology;
        this.organization = organization;
        this.trainer_rating = trainer_rating;
        this.commentsFromEmployee = commentsFromEmployee;
        this.feedback_type = feedback_type;
    }

    public Long getScheduleId() {
        return scheduleId;
    }
    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
    public Long getAttendanceId() {
        return attendanceId;
    }
    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }
    public Long getEmpId() {
        return empId;
    }
    public void setEmpId(Long empId) {
        this.empId = empId;
    }
    public int getEffectiveness() {
        return effectiveness;
    }
    public void setEffectiveness(int effectiveness) {
        this.effectiveness = effectiveness;
    }
    public int getContent() {
        return content;
    }
    public void setContent(int content) {
        this.content = content;
    }
    public int getMethodology() {
        return methodology;
    }
    public void setMethodology(int methodology) {
        this.methodology = methodology;
    }
    public int getOrganization() {
        return organization;
    }
    public void setOrganization(int organization) {
        this.organization = organization;
    }
    public int getTrainer_rating() {
        return trainer_rating;
    }
    public void setTrainer_rating(int trainer_rating) {
        this.trainer_rating = trainer_rating;
    }
    public String getCommentsFromEmployee() {
        return commentsFromEmployee;
    }
    public void setCommentsFromEmployee(String commentsFromEmployee) {
        this.commentsFromEmployee = commentsFromEmployee;
    }
    public String getFeedback_type() {
        return feedback_type;
    }
    public void setFeedback_type(String feedback_type) {
        this.feedback_type = feedback_type;
    }
    
}
