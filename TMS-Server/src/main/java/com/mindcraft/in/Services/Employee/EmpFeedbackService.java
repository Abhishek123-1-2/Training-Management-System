package com.mindcraft.in.Services.Employee;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Employee.EmpFeedbackDTO;

@Service
public class EmpFeedbackService {
    
    private final JdbcTemplate jdbcTemplate;

    public EmpFeedbackService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveFeedback(EmpFeedbackDTO empFeedbackDTO) {
        String sql = "INSERT INTO feedback (emp_id, schedule_id, attendance_id, feedback_type," + 
        "feedback_parameters_11, feedback_parameters_12, feedback_parameters_13, feedback_parameters_14, feedback_parameters_15," + 
        "feedback_comments_employee) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?)";

        jdbcTemplate.update(sql,
        empFeedbackDTO.getEmpId(),
        empFeedbackDTO.getScheduleId(),
        empFeedbackDTO.getAttendanceId(),
        empFeedbackDTO.getFeedbackType(),
        empFeedbackDTO.getEffectiveness(),
        empFeedbackDTO.getContent(),
        empFeedbackDTO.getMethodology(),
        empFeedbackDTO.getOrganization(),
        empFeedbackDTO.getTrainer_rating(),
        empFeedbackDTO.getCommentsFromEmp());
    }
    // public void saveFeedback(EmpFeedbackDTO empFeedbackDTO) {
    //     String sql = "INSERT INTO feedback (emp_id, schedule_id, attendance_id, feedback_type," + 
    //     "feedback_parameters_11, feedback_parameters_12, feedback_parameters_13, feedback_parameters_14, feedback_parameters_15," + 
    //     "feedback_comments_employee) " +
    //     "VALUES (?,?,?,?,?,?,?,?,?,?)";

    //     jdbcTemplate.update(sql,
    //     empFeedbackDTO.getEmpId(),
    //     empFeedbackDTO.getScheduleId(),
    //     empFeedbackDTO.getAttendanceId(),
    //     empFeedbackDTO.getFeedbackType(),  // Updated property name
    //     empFeedbackDTO.getEffectiveness(),
    //     empFeedbackDTO.getContent(),
    //     empFeedbackDTO.getMethodology(),
    //     empFeedbackDTO.getOrganization(),
    //     empFeedbackDTO.getTrainerRating(),  // Updated property name
    //     empFeedbackDTO.getCommentsFromEmp());
    // }

    //  public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT * FROM feedback";
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }
    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, attendance_id AS attendanceId, " +
    //                  "feedback_type, feedback_parameters_11 AS effectiveness, " +
    //                  "feedback_parameters_12 AS content, feedback_parameters_13 AS methodology, " +
    //                  "feedback_parameters_14 AS organization, feedback_parameters_15 AS trainer_rating, " +
    //                  "feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }

    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
    //                  "attendance_id AS attendanceId, feedback_type, " +
    //                  "feedback_parameters_11 AS effectiveness, " +
    //                  "feedback_parameters_12 AS content, " +
    //                  "feedback_parameters_13 AS methodology, " +
    //                  "feedback_parameters_14 AS organization, " +
    //                  "feedback_parameters_15 AS trainer_rating, " +
    //                  "feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }
    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
    //                  "attendance_id AS attendanceId, feedback_type, " +
    //                  "feedback_parameters_11 AS effectiveness, " +
    //                  "feedback_parameters_12 AS content, " +
    //                  "feedback_parameters_13 AS methodology, " +
    //                  "feedback_parameters_14 AS organization, " +
    //                  "feedback_parameters_15 AS trainer_rating, " +
    //                  "feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }
    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
    //                  "attendance_id AS attendanceId, feedback_type AS feedbackType, " +
    //                  "feedback_parameters_11 AS effectiveness, " +
    //                  "feedback_parameters_12 AS content, " +
    //                  "feedback_parameters_13 AS methodology, " +
    //                  "feedback_parameters_14 AS organization, " +
    //                  "feedback_parameters_15 AS trainer_rating, " +
    //                  "feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }

    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT emp_id AS empId, schedule_id AS scheduleId, " +
    //                  "attendance_id AS attendanceId, feedback_type AS feedbackType, " +
    //                  "feedback_parameters_11 AS effectiveness, " +
    //                  "feedback_parameters_12 AS content, " +
    //                  "feedback_parameters_13 AS methodology, " +
    //                  "feedback_parameters_14 AS organization, " +
    //                  "feedback_parameters_15 AS trainer_rating, " +
    //                  "feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback " +
    //                  "WHERE feedback_type = 'Employee Feedback'";  // Add this WHERE clause
        
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }
    // public List<EmpFeedbackDTO> getAllFeedback() {
    //     String sql = "SELECT e.emp_code AS empCode, mt.course, " +
    //                  "f.emp_id AS empId, " +
    //                  "f.schedule_id AS scheduleId, " +
    //                  "f.feedback_type AS feedbackType, " +
    //                  "f.feedback_parameters_11 AS effectiveness, " +
    //                  "f.feedback_parameters_12 AS content, " +
    //                  "f.feedback_parameters_13 AS methodology, " +
    //                  "f.feedback_parameters_14 AS organization, " +
    //                  "f.feedback_parameters_15 AS trainer_rating, " +
    //                  "f.feedback_comments_employee AS commentsFromEmp " +
    //                  "FROM feedback f " +
    //                  "INNER JOIN training_schedule ts ON f.schedule_id = ts.schedule_id " +
    //                  "INNER JOIN m_trainings mt ON ts.training_id = mt.training_id " +
    //                  "INNER JOIN m_employee e ON f.emp_id = e.emp_id " +
    //                  "WHERE f.feedback_type = 'Employee Feedback'";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    // }
    public List<EmpFeedbackDTO> getAllFeedback(String empCode, String course) {
        String sql = "SELECT e.emp_code AS empCode, mt.course, " +
                     "f.emp_id AS empId, " +
                     "f.schedule_id AS scheduleId, " +
                     "f.feedback_type AS feedbackType, " +
                     "f.feedback_parameters_11 AS effectiveness, " +
                     "f.feedback_parameters_12 AS content, " +
                     "f.feedback_parameters_13 AS methodology, " +
                     "f.feedback_parameters_14 AS organization, " +
                     "f.feedback_parameters_15 AS trainer_rating, " +
                     "f.feedback_comments_employee AS commentsFromEmp " +
                     "FROM feedback f " +
                     "INNER JOIN training_schedule ts ON f.schedule_id = ts.schedule_id " +
                     "INNER JOIN m_trainings mt ON ts.training_id = mt.training_id " +
                     "INNER JOIN m_employee e ON f.emp_id = e.emp_id " +
                     "WHERE f.feedback_type = 'Employee Feedback' " +
                     "AND e.emp_code = ? " +
                     "AND mt.course = ?";
    
        return jdbcTemplate.query(sql, new Object[]{empCode, course}, new BeanPropertyRowMapper<>(EmpFeedbackDTO.class));
    }
    
    
    
    
}
