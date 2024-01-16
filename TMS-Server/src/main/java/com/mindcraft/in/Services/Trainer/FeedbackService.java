// package com.mindcraft.in.Services.Trainer;

// import java.util.List;

// import org.springframework.jdbc.core.BeanPropertyRowMapper;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// import com.mindcraft.in.Pojos.Trainer.EmpDetails;
// import com.mindcraft.in.Pojos.Trainer.FeedbackDTO;
// import com.mindcraft.in.Pojos.Trainer.FeedbackEntity;

// @Service
// public class FeedbackService 

//  {
//     private final JdbcTemplate jdbcTemplate;
     
//     public FeedbackService(JdbcTemplate jdbcTemplate   ) {
//         this.jdbcTemplate = jdbcTemplate;
       
//     }

    
//     public void saveFeedback(FeedbackDTO feedbackDTO) {
    

//        // WORKING CODE schedule_id,?,
//        String sql = "INSERT INTO feedback ( emp_id,schedule_id," +
//                 "attendance_id,"+
//                     "feedback_type,feedback_parameters_1, feedback_parameters_2, " +
//                     "feedback_parameters_3, feedback_parameters_4, " +
//                     "feedback_parameters_5, feedback_parameters_6, " +
//                      "feedback_parameters_7, feedback_parameters_8,feedback_parameters_9, " +
//                       "feedback_parameters_10,"+
//                     "feedback_comments , "+
//                     "active_yn, created_by, " +
//                     "created_on, updated_by, updated_on,Overall_Rate) " +
//                     "VALUES ( ?, ?, "+ 
//                     "?,"+
//                     " ?, ?, ?,"+
//                     " ?, ?,"+
//                     " ?, ?,"+
//                     " ?,"+
//                     " ?, ? ,?,"+
//                     " ?,?, ?,"+
//                     " ?, ?,?,?)";


      
       
//        jdbcTemplate.update(sql,
//                feedbackDTO.getEmpId(),
//                feedbackDTO.getScheduleId(),  
//                feedbackDTO.getAttendanceId(),
//                feedbackDTO.getFeedback_type(),
      
//                feedbackDTO.getTechnicalSkills(),
//                feedbackDTO.getGraspingPower(),
//                feedbackDTO.getProActiveness(),
//                feedbackDTO.getInterestQuality(),
//                feedbackDTO.getLeadershipQuality(),
//                feedbackDTO.getProblemSolvingAbility(),
//                feedbackDTO.getSmartnessRate(),
//                feedbackDTO.getSpokenEnglishRate(),
//                feedbackDTO.getAssignmentStatus(),
//                feedbackDTO.getPerformanceStatus(),
//                feedbackDTO.getCommentsFromTrainer(),
//                feedbackDTO.getActive_yn(),
//                feedbackDTO.getCreated_by(),
//                feedbackDTO.getCreated_on(),
//                feedbackDTO.getUpdated_by(),
//                feedbackDTO.getUpdated_on(),
//                feedbackDTO.getTotalRating());
//    }

//   public FeedbackEntity setEmpIdFromEmpDetails(FeedbackEntity feedback,EmpDetails empDetails){
//    feedback.setEid(empDetails.getEmpId());
//    return feedback;
//   }


// public List<FeedbackDTO> retrieveFeedbackData() {
//   // String sql ="select feedback_parameters_1, feedback_parameters_2, "+
//   //                        "feedback_parameters_3, feedback_parameters_4,"+
//   //                         "feedback_parameters_5, feedback_parameters_6, "+
//   //                         "feedback_parameters_7, feedback_parameters_8 "+
//   //     "from feedback  ";
//   String sql =" select * from feedback";
//   return jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(FeedbackDTO.class));
//    // return null;
// }

    
  
// }
package com.mindcraft.in.Services.Trainer;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Trainer.EmpDetails;
import com.mindcraft.in.Pojos.Trainer.FeedbackDTO;
import com.mindcraft.in.Pojos.Trainer.FeedbackEntity;

@Service
public class FeedbackService {

    private final JdbcTemplate jdbcTemplate;

    public FeedbackService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveFeedback(FeedbackDTO feedbackDTO) {
        String sql = "INSERT INTO feedback ( emp_id, schedule_id, attendance_id, " +
                "feedback_type, feedback_parameters_1, feedback_parameters_2, " +
                "feedback_parameters_3, feedback_parameters_4, feedback_parameters_5, " +
                "feedback_parameters_6, feedback_parameters_7, feedback_parameters_8, " +
                "feedback_parameters_9, feedback_parameters_10, feedback_comments, " +
                "active_yn, created_by, created_on, updated_by, updated_on, Overall_Rate) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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

    public FeedbackEntity setEmpIdFromEmpDetails(FeedbackEntity feedback, EmpDetails empDetails) {
        feedback.setEmpId(empDetails.getEmpId());
        return feedback;
    }

    // public List<FeedbackDTO> retrieveFeedbackData() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
    //             "attendance_id AS attendanceId, feedback_type, " +
    //             "feedback_parameters_1 AS technicalSkills, feedback_parameters_2 AS graspingPower, " +
    //             "feedback_parameters_3 AS proActiveness, feedback_parameters_4 AS interestQuality, " +
    //             "feedback_parameters_5 AS leadershipQuality, feedback_parameters_6 AS problemSolvingAbility, " +
    //             "feedback_parameters_7 AS smartnessRate, feedback_parameters_8 AS spokenEnglishRate, " +
    //             "feedback_parameters_9 AS assignmentStatus, feedback_parameters_10 AS performanceStatus, " +
    //             "feedback_comments AS commentsFromTrainer, active_yn, created_by, " +
    //             "created_on, updated_by, updated_on, Overall_Rate AS totalRating " +
    //             "FROM feedback";

    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FeedbackDTO.class));
    // }
  //   public List<FeedbackDTO> retrieveFeedbackData() {
  //     String sql = "SELECT f.emp_id AS empId, ts.schedule_id AS scheduleId, " +
  //             "ts.trainer_name AS trainerName, " +
  //             "f.feedback_type, f.feedback_parameters_1 AS technicalSkills, " +
  //             "f.feedback_parameters_2 AS graspingPower, f.feedback_parameters_3 AS proActiveness, " +
  //             "f.feedback_parameters_4 AS interestQuality, f.feedback_parameters_5 AS leadershipQuality, " +
  //             "f.feedback_parameters_6 AS problemSolvingAbility, f.feedback_parameters_7 AS smartnessRate, " +
  //             "f.feedback_parameters_8 AS spokenEnglishRate, f.feedback_parameters_9 AS assignmentStatus, " +
  //             "f.feedback_parameters_10 AS performanceStatus, f.feedback_comments AS commentsFromTrainer, " +
  //             "f.active_yn, f.created_by, f.created_on, f.updated_by, f.updated_on, f.Overall_Rate AS totalRating, " +
  //             "mt.course " +
  //             "FROM feedback f " +
  //             "INNER JOIN training_schedule ts ON f.schedule_id = ts.schedule_id " +
  //             "INNER JOIN m_trainings mt ON ts.training_id = mt.training_id";
  
  //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FeedbackDTO.class));
  // }
  
  //   public List<FeedbackDTO> retrieveFeedbackData() {
  //     String sql = "SELECT f.emp_id AS empId, f.schedule_id AS scheduleId, " +
  //             "f.attendance_id AS attendanceId, f.feedback_type, " +
  //             "f.feedback_parameters_1 AS technicalSkills, f.feedback_parameters_2 AS graspingPower, " +
  //             "f.feedback_parameters_3 AS proActiveness, f.feedback_parameters_4 AS interestQuality, " +
  //             "f.feedback_parameters_5 AS leadershipQuality, f.feedback_parameters_6 AS problemSolvingAbility, " +
  //             "f.feedback_parameters_7 AS smartnessRate, f.feedback_parameters_8 AS spokenEnglishRate, " +
  //             "f.feedback_parameters_9 AS assignmentStatus, f.feedback_parameters_10 AS performanceStatus, " +
  //             "f.feedback_comments AS commentsFromTrainer, f.active_yn, f.created_by, " +
  //             "f.created_on, f.updated_by, f.updated_on, f.Overall_Rate AS totalRating, " +
  //             "mt.course " + // Include the course field from m_trainings
  //             "FROM feedback f " +
  //             "INNER JOIN m_trainings mt ON f.training_id = mt.training_id"; // Assuming there's a foreign key relationship
  
  //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FeedbackDTO.class));
  // }
  

    // Add a method to retrieve feedback data for a specific employee and course
// public List<FeedbackDTO> retrieveFeedbackDataForEmployeeAndCourse(int empId, String courseName) {
//   String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
//           "attendance_id AS attendanceId, feedback_type, " +
//           "feedback_parameters_1 AS technicalSkills, feedback_parameters_2 AS graspingPower, " +
//           "feedback_parameters_3 AS proActiveness, feedback_parameters_4 AS interestQuality, " +
//           "feedback_parameters_5 AS leadershipQuality, feedback_parameters_6 AS problemSolvingAbility, " +
//           "feedback_parameters_7 AS smartnessRate, feedback_parameters_8 AS spokenEnglishRate, " +
//           "feedback_parameters_9 AS assignmentStatus, feedback_parameters_10 AS performanceStatus, " +
//           "feedback_comments AS commentsFromTrainer, active_yn, created_by, " +
//           "created_on, updated_by, updated_on, Overall_Rate AS totalRating " +
//           "FROM feedback " +
//           "WHERE emp_id = ? AND course = ?";

//   return jdbcTemplate.query(sql, new Object[]{empId, courseName}, new BeanPropertyRowMapper<>(FeedbackDTO.class));
// }
// public List<FeedbackDTO> retrieveFeedbackDataForEmployeeAndCourse(int empId, String courseName) {
//   String sql = "SELECT f.emp_id AS empId, ts.schedule_id AS scheduleId, " +
//           "ts.trainer_name AS trainerName, " +
//           "f.feedback_type, f.feedback_parameters_1 AS technicalSkills, " +
//           "f.feedback_parameters_2 AS graspingPower, f.feedback_parameters_3 AS proActiveness, " +
//           "f.feedback_parameters_4 AS interestQuality, f.feedback_parameters_5 AS leadershipQuality, " +
//           "f.feedback_parameters_6 AS problemSolvingAbility, f.feedback_parameters_7 AS smartnessRate, " +
//           "f.feedback_parameters_8 AS spokenEnglishRate, f.feedback_parameters_9 AS assignmentStatus, " +
//           "f.feedback_parameters_10 AS performanceStatus, f.feedback_comments AS commentsFromTrainer, " +
//           "f.active_yn, f.created_by, f.created_on, f.updated_by, f.updated_on, f.Overall_Rate AS totalRating, " +
//           "mt.course " +
//           "FROM feedback f " +
//           "INNER JOIN training_schedule ts ON f.schedule_id = ts.schedule_id " +
//           "INNER JOIN m_trainings mt ON ts.training_id = mt.training_id " +
//           "WHERE f.emp_id = ? AND mt.course = ?";

//   return jdbcTemplate.query(sql, new Object[]{empId, courseName}, new BeanPropertyRowMapper<>(FeedbackDTO.class));
// }
// public List<FeedbackDTO> retrieveFeedbackDataForEmployeeAndCourse(String empCode, String courseName) {
//   String sql = "SELECT f.emp_id AS empId, e.emp_code AS empCode, ts.schedule_id AS scheduleId, " +
//           "ts.trainer_name AS trainerName, " +
//           "f.feedback_type, f.feedback_parameters_1 AS technicalSkills, " +
//           "f.feedback_parameters_2 AS graspingPower, f.feedback_parameters_3 AS proActiveness, " +
//           "f.feedback_parameters_4 AS interestQuality, f.feedback_parameters_5 AS leadershipQuality, " +
//           "f.feedback_parameters_6 AS problemSolvingAbility, f.feedback_parameters_7 AS smartnessRate, " +
//           "f.feedback_parameters_8 AS spokenEnglishRate, f.feedback_parameters_9 AS assignmentStatus, " +
//           "f.feedback_parameters_10 AS performanceStatus, f.feedback_comments AS commentsFromTrainer, " +
//           "f.active_yn, f.created_by, f.created_on, f.updated_by, f.updated_on, f.Overall_Rate AS totalRating, " +
//           "mt.course " +
//           "FROM feedback f " +
//           "INNER JOIN training_schedule ts ON f.schedule_id = ts.schedule_id " +
//           "INNER JOIN m_trainings mt ON ts.training_id = mt.training_id " +
//           "INNER JOIN m_employee e ON f.emp_id = e.emp_id " +
//           "WHERE f.emp_id = ? AND mt.course = ?";

//   return jdbcTemplate.query(sql, new Object[]{empCode, courseName}, new BeanPropertyRowMapper<>(FeedbackDTO.class));
// }
// public List<FeedbackDTO> retrieveFeedbackDataForEmployeeAndCourse(String empCode, String courseName) {
//   String sql = "SELECT " +
//           "f.emp_id AS empId, " +
//           "e.emp_code AS empCode, " +
//           "ts.schedule_id AS scheduleId, " +
//           "ts.trainer_name AS trainerName, " +
//           "f.feedback_type, " +
//           "f.feedback_parameters_1 AS technicalSkills, " +
//           "f.feedback_parameters_2 AS graspingPower, " +
//           "f.feedback_parameters_3 AS proActiveness, " +
//           "f.feedback_parameters_4 AS interestQuality, " +
//           "f.feedback_parameters_5 AS leadershipQuality, " +
//           "f.feedback_parameters_6 AS problemSolvingAbility, " +
//           "f.feedback_parameters_7 AS smartnessRate, " +
//           "f.feedback_parameters_8 AS spokenEnglishRate, " +
//           "f.feedback_parameters_9 AS assignmentStatus, " +
//           "f.feedback_parameters_10 AS performanceStatus, " +
//           "f.feedback_comments AS commentsFromTrainer, " +
//           "f.active_yn, " +
//           "f.created_by, " +
//           "f.created_on, " +
//           "f.updated_by, " +
//           "f.updated_on, " +
//           "f.Overall_Rate AS totalRating, " +
//           "mt.course " +
//           "FROM " +
//           "feedback f " +
//           "INNER JOIN " +
//           "training_schedule ts ON f.schedule_id = ts.schedule_id " +
//           "INNER JOIN " +
//           "m_trainings mt ON ts.training_id = mt.training_id " +
//           "INNER JOIN " +
//           "m_employee e ON f.emp_id = e.emp_id " +
//           "WHERE " +
//           "e.emp_code = ? AND mt.course = ?";

//   return jdbcTemplate.query(sql, new Object[]{empCode, courseName}, new BeanPropertyRowMapper<>(FeedbackDTO.class));
// }
public List<FeedbackDTO> retrieveFeedbackDataForEmployeeAndCourse(String empCode, String courseName) {
  String sql = "SELECT " +
          "f.emp_id AS empId, " +
          "e.emp_code AS empCode, " +
          "ts.schedule_id AS scheduleId, " +
          "ts.trainer_name AS trainerName, " +
          "f.feedback_type, " +
          "f.feedback_parameters_1 AS technicalSkills, " +
          "f.feedback_parameters_2 AS graspingPower, " +
          "f.feedback_parameters_3 AS proActiveness, " +
          "f.feedback_parameters_4 AS interestQuality, " +
          "f.feedback_parameters_5 AS leadershipQuality, " +
          "f.feedback_parameters_6 AS problemSolvingAbility, " +
          "f.feedback_parameters_7 AS smartnessRate, " +
          "f.feedback_parameters_8 AS spokenEnglishRate, " +
          "f.feedback_parameters_9 AS assignmentStatus, " +
          "f.feedback_parameters_10 AS performanceStatus, " +
          "f.feedback_comments AS commentsFromTrainer, " +
          "f.active_yn, " +
          "f.created_by, " +
          "f.created_on, " +
          "f.updated_by, " +
          "f.updated_on, " +
          "f.Overall_Rate AS totalRating, " +
          "mt.course " +
          "FROM " +
          "feedback f " +
          "INNER JOIN " +
          "training_schedule ts ON f.schedule_id = ts.schedule_id " +
          "INNER JOIN " +
          "m_trainings mt ON ts.training_id = mt.training_id " +
          "INNER JOIN " +
          "m_employee e ON f.emp_id = e.emp_id " +
          "WHERE " +
          "e.emp_code = ? AND mt.course = ? AND f.feedback_type = 'Trainer_Feedback'";

  return jdbcTemplate.query(sql, new Object[]{empCode, courseName}, new BeanPropertyRowMapper<>(FeedbackDTO.class));
}
}


