package com.mindcraft.in.Services.Employee;

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
        empFeedbackDTO.getFeedback_type(),
        empFeedbackDTO.getEffectiveness(),
        empFeedbackDTO.getContent(),
        empFeedbackDTO.getMethodology(),
        empFeedbackDTO.getOrganization(),
        empFeedbackDTO.getTrainer_rating(),
        empFeedbackDTO.getCommentsFromEmp());
    }
}
