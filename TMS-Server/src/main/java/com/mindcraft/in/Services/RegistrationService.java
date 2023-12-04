package com.mindcraft.in.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Registration;

import java.sql.PreparedStatement;
import java.sql.SQLException;

@Service
public class RegistrationService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RegistrationService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addRegistration(Registration registration) {
        String sql = "INSERT INTO registration (schedule_id, training_id, emp_id, registration_date, " +
                     "registration_comments, registration_status, registration_response) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
    
        jdbcTemplate.update(sql,
                registration.getScheduleId(),
                registration.getTrainingId(),
                registration.getEmpId(),
                registration.getRegistrationDate(),
                registration.getRegistrationComments(),
                registration.getRegistrationStatus(),
                registration.getRegistrationResponse());
    }
}
