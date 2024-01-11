package com.mindcraft.in.Pojos.Trainer;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class FeedbackDTO {
    
    private Long attendanceId;
    private Long empId;
    private String empCode;
    private Long scheduleId;
    private String course;
    private int technicalSkills;

    private int graspingPower;

    private int proActiveness;

    private int interestQuality;

    private int leadershipQuality;

private int  problemSolvingAbility;

private int  smartnessRate;

private int  spokenEnglishRate;

private String commentsFromTrainer;


private double totalRating;

     
    private char active_yn;

   
    private String created_by;

    private String feedback_type;

    
    private Timestamp created_on;

    
    private String updated_by;

    
    private Timestamp updated_on;

    private String assignmentStatus; // New field for assignment status

    private String performanceStatus;


    public FeedbackDTO(){

    }

    //other fields 

public FeedbackDTO(
Long attendanceId,    
Long empId, String empCode,Long scheduleId, String course,
int technicalSkills, 
int graspingPower, int proActiveness,
int interestQuality, int leadershipQuality, 
int problemSolvingAbility, String commentsFromTrainer,
String assignmentStatus,
String performanceStatus,
int  smartnessRate,
int  spokenEnglishRate,
String feedback_type,
double totalRating,
char active_yn, String created_by, Timestamp created_on, 
String updated_by, Timestamp updated_on) {

this.attendanceId=attendanceId;

this.totalRating=totalRating;
this.empId = empId;
this.scheduleId = scheduleId;
this.technicalSkills = technicalSkills;
this.graspingPower = graspingPower;
this.proActiveness = proActiveness;
this.interestQuality = interestQuality;
this.feedback_type=feedback_type;
this.leadershipQuality = leadershipQuality;
this.problemSolvingAbility = problemSolvingAbility;
this.smartnessRate=smartnessRate;
this.spokenEnglishRate=spokenEnglishRate;
this.commentsFromTrainer = commentsFromTrainer;
this.active_yn = active_yn;
this.created_by = created_by;
this.created_on = created_on;
this.updated_by = updated_by;
this.updated_on = updated_on;
this.assignmentStatus=assignmentStatus;
this.performanceStatus=performanceStatus;
this.course=course;
}

    public double getTotalRating() {
        return totalRating;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setTotalRating(double totalRating) {
        this.totalRating = totalRating;
    }

    public String getPerformanceStatus() {
        return performanceStatus;
    }

    public void setPerformanceStatus(String performanceStatus) {
        this.performanceStatus = performanceStatus;
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

    public int getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(int technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public int getGraspingPower() {
        return graspingPower;
    }

    public void setGraspingPower(int graspingPower) {
        this.graspingPower = graspingPower;
    }

    public int getProActiveness() {
        return proActiveness;
    }
    public String getFeedback_type() {
    return feedback_type;
}

public void setFeedback_type(String feedback_type) {
    this.feedback_type = feedback_type;
}



    public void setProActiveness(int proActiveness) {
        this.proActiveness = proActiveness;
    }

    public int getInterestQuality() {
        return interestQuality;
    }

    public void setInterestQuality(int interestQuality) {
        this.interestQuality = interestQuality;
    }

    public int getLeadershipQuality() {
        return leadershipQuality;
    }

    public void setLeadershipQuality(int leadershipQuality) {
        this.leadershipQuality = leadershipQuality;
    }

    public int getProblemSolvingAbility() {
        return problemSolvingAbility;
    }

    public void setProblemSolvingAbility(int problemSolvingAbility) {
        this.problemSolvingAbility = problemSolvingAbility;
    }

    public String getCommentsFromTrainer() {
        return commentsFromTrainer;
    }

    public void setCommentsFromTrainer(String commentsFromTrainer) {
        this.commentsFromTrainer = commentsFromTrainer;
    }

    public char getActive_yn() {
        return active_yn;
    }

    public void setActive_yn(char active_yn) {
        this.active_yn = active_yn;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public Timestamp getCreated_on() {
        return created_on;
    }

    public void setCreated_on(Timestamp created_on) {
        this.created_on = created_on;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public Timestamp getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(Timestamp updated_on) {
        this.updated_on = updated_on;
    }

    public int getSmartnessRate() {
        return smartnessRate;
    }

    public void setSmartnessRate(int smartnessRate) {
        this.smartnessRate = smartnessRate;
    }

    public int getSpokenEnglishRate() {
        return spokenEnglishRate;
    }

    public void setSpokenEnglishRate(int spokenEnglishRate) {
        this.spokenEnglishRate = spokenEnglishRate;
    }

    public String getAssignmentStatus() {
        return assignmentStatus;
    }

    public void setAssignmentStatus(String assignmentStatus) {
        this.assignmentStatus = assignmentStatus;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    //getters and setters
    
    

}
