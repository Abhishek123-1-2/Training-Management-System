package com.mindcraft.in.Services.Trainer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Trainer.EmpDetails;
import com.mindcraft.in.Pojos.Trainer.FeedbackDTO;
import com.mindcraft.in.Pojos.Trainer.FeedbackEntity;

@Service
public class FeedbackService 

 {
    private final JdbcTemplate jdbcTemplate;
     
    public FeedbackService(JdbcTemplate jdbcTemplate   ) {
        this.jdbcTemplate = jdbcTemplate;
       
    }

    
    public void saveFeedback(FeedbackDTO feedbackDTO) {
    

       // WORKING CODE schedule_id,?,
       String sql = "INSERT INTO feedback ( emp_id,schedule_id," +
                "attendance_id,"+
                    "feedback_type,feedback_parameters_1, feedback_parameters_2, " +
                    "feedback_parameters_3, feedback_parameters_4, " +
                    "feedback_parameters_5, feedback_parameters_6, " +
                     "feedback_parameters_7, feedback_parameters_8,feedback_parameters_9, " +
                      "feedback_parameters_10,"+
                    "feedback_comments , "+
                    "active_yn, created_by, " +
                    "created_on, updated_by, updated_on,Overall_Rate) " +
                    "VALUES ( ?, ?, "+ 
                    "?,"+
                    " ?, ?, ?,"+
                    " ?, ?,"+
                    " ?, ?,"+
                    " ?,"+
                    " ?, ? ,?,"+
                    " ?,?, ?,"+
                    " ?, ?,?,?)";


      
       
       jdbcTemplate.update(sql,
               feedbackDTO.getEmpId(),
               feedbackDTO.getScheduleId(),  
               feedbackDTO.getAttendanceId(),
               feedbackDTO.getFeedback_type(),
      
               feedbackDTO.getTechnicalSkills(),
               feedbackDTO.getGraspingPower(),
               feedbackDTO.getProActiveness(),
               feedbackDTO.getInterestQuality(),
               feedbackDTO.getLeadershipQuality(),
               feedbackDTO.getProblemSolvingAbility(),
               feedbackDTO.getSmartnessRate(),
               feedbackDTO.getSpokenEnglishRate(),
               feedbackDTO.getAssignmentStatus(),
               feedbackDTO.getPerformanceStatus(),
               feedbackDTO.getCommentsFromTrainer(),
               feedbackDTO.getActive_yn(),
               feedbackDTO.getCreated_by(),
               feedbackDTO.getCreated_on(),
               feedbackDTO.getUpdated_by(),
               feedbackDTO.getUpdated_on(),
               feedbackDTO.getTotalRating());
   }

  public FeedbackEntity setEmpIdFromEmpDetails(FeedbackEntity feedback,EmpDetails empDetails){
   feedback.setEid(empDetails.getEmpId());
   return feedback;
  }
  
}

