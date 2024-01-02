package com.mindcraft.in.Services.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Admin.RegistrationDetailsDTO;

import jakarta.persistence.Query;
import com.mindcraft.in.Pojos.Employee.EnrollmentRequest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RegistrationService(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    public Long register(Registration registration) {
    String sql = "INSERT INTO registration " +
            "(schedule_id, training_id, emp_id, registration_date, registration_comments, " +
            "registration_status, registration_response) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";

    try (Connection connection = dataSource.getConnection();
         PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

        // Set the registration_date to the current system date
            LocalDateTime currentDateTime = LocalDateTime.now();
            Timestamp registrationDate = Timestamp.valueOf(currentDateTime);

            // Set the registration_status to "Registered"
            String registrationStatus = "Registered";

            Long scheduleId = registration.getSchedule_id();
            if (scheduleId == null) {
                // Handle the case where scheduleId is null
                throw new IllegalArgumentException("schedule_id cannot be null");
            }

        preparedStatement.setLong(1, scheduleId);
        preparedStatement.setLong(2, registration.getTraining_id());
        preparedStatement.setLong(3, registration.getEmp_id());
        preparedStatement.setTimestamp(4, registrationDate);
        preparedStatement.setString(5, registration.getRegistration_comments());
        preparedStatement.setString(6, registrationStatus);
        preparedStatement.setString(7, registration.getRegistration_response());

        preparedStatement.executeUpdate();

        // Retrieve the generated registration ID
        ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
        if (generatedKeys.next()) {
            return generatedKeys.getLong(1);
        } else {
            return null;  // Handle the case where no ID is returned
        }

    } catch (SQLException e) {
        e.printStackTrace();
        // Handle the exception according to your application's needs
        return null;
    }
}

    public List<Registration> getAllRegistrations() {
        String sql = "SELECT * FROM registration";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Registration.class));
    }

    public Registration getRegistrationDetails(Long registrationId) {
        String sql = "SELECT * FROM registration WHERE registration_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{registrationId}, new BeanPropertyRowMapper<>(Registration.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    // Add other methods as needed...
    // public void updateRegistration(Registration registration) {
    //     String sql = "UPDATE registration SET " +
    //             "schedule_id = ?, " +
    //             "training_id = ?, " +
    //             "emp_id = ?, " +
    //             "registration_date = ?, " +
    //             "registration_comments = ?, " +
    //             "registration_status = ?, " +
    //             "registration_response = ? " +
    //             "WHERE registration_id = ?";  // Add WHERE clause
    
    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
    //         preparedStatement.setLong(1, registration.getSchedule_id());
    //         preparedStatement.setLong(2, registration.getTraining_id());
    //         preparedStatement.setLong(3, registration.getEmp_id());
    //         preparedStatement.setTimestamp(4, registration.getRegistration_date());
    //         preparedStatement.setString(5, registration.getRegistration_comments());
    //         preparedStatement.setString(6, registration.getRegistration_status());
    //         preparedStatement.setString(7, registration.getRegistration_response());
    
    //         // Add this line to set the registration_id in the WHERE clause
    //         preparedStatement.setLong(8, registration.getRegistration_id());
    
    //         preparedStatement.executeUpdate();
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         // Handle the exception according to your application's needs
    //     }
    // }
    public void updateRegistration(Registration registration) {
        String sql = "UPDATE registration SET " +
                "registration_status = ?, " +
                "registration_response = ? " +
                "WHERE registration_id = ?";
    
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
            preparedStatement.setString(1, registration.getRegistration_status());
            preparedStatement.setString(2, registration.getRegistration_response());
            preparedStatement.setLong(3, registration.getRegistration_id());
    
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception according to your application's needs
        }
    }
    
}