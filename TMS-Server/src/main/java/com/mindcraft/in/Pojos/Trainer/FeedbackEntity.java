package com.mindcraft.in.Pojos.Trainer;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="feedback")
public class FeedbackEntity{

    @Column(name="attendance_id")
    private Long attendanceId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feedback_id")
    private Long fid;

    @Column(name="schedule_id")
    private Long scheduleId;

    @Column(name="emp_id")
    private Long empId;

    @Column(name="feedback_parameters_1")
    private int technicalSkills;

    @Column(name="feedback_parameters_2")
    private int graspingPower;

    @Column(name="feedback_parameters_3")
    private int proActiveness;

    @Column(name="feedback_parameters_4")
    private int interestQuality;

    @Column(name="feedback_parameters_5")
    private int leadershipQuality;

    @Column(name="feedback_parameters_6")
private int  problemSolvingAbility;

@Column(name="feedback_parameters_7")
private int  smartnessRate;

@Column(name="feedback_parameters_8")
private int  spokenEnglishRate;

@Column(name="feedback_parameters_9")
private String assignmentStatus; // New field for assignment status

@Column(name="feedback_parameters_10")
private String performanceStatus;

@Column(name="feedback_comments")
private String commentsFromTrainer;

@Column(name="feedback_paramters_11")
private int effectiveness;

@Column(name="feedback_paramters_12")
private int content;

@Column(name="feedback_paramters_13")
private int methodology;

@Column(name="feedback_paramters_14")
private int organization;

@Column(name="feedback_paramters_15")
private int trainer_rating;

@Column(name="feedback_comments_employee")
private String commentsFromEmployee;

@Column(name = "feedback_type")
    private String feedback_type;

     @Column(name = "active_yn")
    private char active_yn;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "created_on")
    private Timestamp created_on;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "updated_on")
    private Timestamp updated_on;

    @Column(name="Overall_Rate")
       private double totalRating;

    public FeedbackEntity(){
        
    }

    public FeedbackEntity(
Long attendanceId,
double totalRating,     
Long fid, 
Long scheduleId, 
Long empId, 
int technicalSkills, int graspingPower, int proActiveness,
int interestQuality, int leadershipQuality, 
int problemSolvingAbility, String commentsFromTrainer,
int effectiveness, int content, int methodology,
int organization, int trainer_rating,
String commentsFromEmpoyee,
char active_yn, 
String performanceStatus,
String created_by, 
String feedback_type,
int  smartnessRate,
int  spokenEnglishRate,
String assignmentStatus,
Timestamp created_on, String updated_by, Timestamp updated_on) {
    
        this.attendanceId=attendanceId;

        this.fid = fid;
        this.scheduleId = scheduleId;
        this.empId = empId;
        this.technicalSkills = technicalSkills;
        this.graspingPower = graspingPower;
        this.proActiveness = proActiveness;
        this.interestQuality = interestQuality;
        this.leadershipQuality = leadershipQuality;
        this.problemSolvingAbility = problemSolvingAbility;
        this.smartnessRate=smartnessRate;
        this.spokenEnglishRate=spokenEnglishRate;
        this.commentsFromTrainer = commentsFromTrainer;
        this.effectiveness = effectiveness;
        this.content = content;
        this.methodology = methodology;
        this.organization = organization;
        this.trainer_rating = trainer_rating;
        this.commentsFromEmployee = commentsFromEmpoyee;
        this.active_yn = active_yn;
        this.created_by = created_by;
        this.feedback_type=feedback_type;
        this.created_on = created_on;
        this.updated_by = updated_by;
        this.updated_on = updated_on;

        this.assignmentStatus=assignmentStatus;
        this.performanceStatus=performanceStatus;
        this.totalRating=totalRating;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public double getTotalRating() {
        return totalRating;
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

    public Long getFid() {
        return fid;
    }

    public void setFid(Long fid) {
        this.fid = fid;
    }

    public String getFeedback_type() {
        return feedback_type;
    }

    public void setFeedback_type(String feedback_type) {
        this.feedback_type = feedback_type;
    }

    public Long getSid() {
        return scheduleId;
    }

    public void setSid(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getEid() {
        return  empId;
    }

    public void setEid(Long empId) {
        this.empId = empId;
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

    public int getproblemSolvingAbility() {
        return problemSolvingAbility;
    }

    public void setproblemSolvingAbility(int problemSolvingAbility) {
        this.problemSolvingAbility = problemSolvingAbility;
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
    

    public String getAssignmentStatus() {
        return assignmentStatus;
    }

    public void setAssignmentStatus(String assignmentStatus) {
        this.assignmentStatus = assignmentStatus;
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

    @Override
    public String toString() {
        return "FeedbackEntity [sid=" + scheduleId + ", eid=" + empId + "]";
    }



    
}