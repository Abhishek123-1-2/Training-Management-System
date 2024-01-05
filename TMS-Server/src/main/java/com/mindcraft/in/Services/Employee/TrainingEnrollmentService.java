package com.mindcraft.in.Services.Employee;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;

public class TrainingEnrollmentService {
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrainingEnrollmentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

    }

    public void enrollTraining(TrainingScheduleDTO request) {
        try {
            if (request.getScheduleId() == null) {
                throw new IllegalArgumentException("scheduleId cannot be null");
            }

            String scheduleIdSql = "SELECT training_id, schedule_id, emp_id FROM training_schedule WHERE training_id = ?";
            Long scheduleId = jdbcTemplate.queryForObject(scheduleIdSql, Long.class, request.getTrainingId(), request.getScheduleId(), request.getEmpId());

            if (scheduleId == null) {
                throw new IllegalStateException("No schedule found for the given training_id: " + request.getTrainingId() +"schedule_id: " + request.getScheduleId() + "emp_id: " + request.getEmpId());
            }
            LocalDateTime currentDateTime = LocalDateTime.now();
            Timestamp registrationDate = Timestamp.valueOf(currentDateTime);
            String registrationStatus = "Registered";
            String sql = "INSERT INTO registration (training_id, schedule_id, emp_id, registration_date, registration_comments, registration_status, registration_response) VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(
                    sql,
                    request.getTrainingId(),
                    request.getScheduleId(),
                    request.getEmpId(),
                    registrationDate,
                    registrationStatus
            );
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error enrolling training", e);
        }
    }

    // public boolean isEnrolled(String empId, String scheduleId, String trainingId) {
    //     try {
    //         String sql = "SELECT COUNT(*) FROM registration where emp_id = ? AND schedule_id = ? AND training_id = ?";
    //         int count = jdbcTemplate.queryForObject(sql, Integer.class, empId, scheduleId, trainingId);
    //         return count > 0;
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         throw new RuntimeException("Error checking enrollment status", e);
    //     }
    // }
}
