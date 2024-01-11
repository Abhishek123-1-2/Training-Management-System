package com.mindcraft.in.Pojos.Employee;

public class EmpFeedbackDTO {
    
    private Long attendanceId;
    private Long empId;
    private Long scheduleId;
    private String feedback_type;
    private int effectiveness;
    private int content;
    private int methodology;
    private int organization;
    private int trainer_rating;
    private String commentsFromEmp;

    public EmpFeedbackDTO() {
    
    }

    public EmpFeedbackDTO(Long attendanceId, Long empId, Long scheduleId, String feedback_type,
    int effectiveness, int content, int methodology, int organization, int trainer_rating, String commentsFromEmp) {
        this.attendanceId = attendanceId;
        this.empId = empId;
        this.scheduleId = scheduleId;
        this.effectiveness = effectiveness;
        this.content = content;
        this.methodology = methodology;
        this.organization = organization;
        this.trainer_rating = trainer_rating;
        this.commentsFromEmp = commentsFromEmp;
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

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getFeedback_type() {
        return feedback_type;
    }

    public void setFeedback_type(String feedback_type) {
        this.feedback_type = feedback_type;
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

    public String getCommentsFromEmp() {
        return commentsFromEmp;
    }

    public void setCommentsFromEmp(String commentsFromEmp) {
        this.commentsFromEmp = commentsFromEmp;
    }
}

