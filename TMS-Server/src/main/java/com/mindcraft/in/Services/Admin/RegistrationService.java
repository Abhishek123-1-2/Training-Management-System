package com.mindcraft.in.Services.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.AdditionalRegistrationDetailsDTO;
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
import java.util.Collections;
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

        preparedStatement.setLong(1, registration.getSchedule_id());
        preparedStatement.setLong(2, registration.getTraining_id());
        preparedStatement.setLong(3, registration.getEmp_id());
        preparedStatement.setTimestamp(4, registration.getRegistration_date());
        preparedStatement.setString(5, registration.getRegistration_comments());
        preparedStatement.setString(6, registration.getRegistration_status());
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
    
    public Long enrollTraining(Registration registration) {
        // You might want to validate inputs and handle business logic here
    
        // Set other properties if needed
        registration.setRegistration_date(new Timestamp(System.currentTimeMillis()));
        registration.setActive_yn('Y');  // Assuming 'Y' represents active status
    
        return register(registration);  // Reuse the existing registration method
    }

    // Add other methods as needed...

        public List<EmployeeDetailsDTO> getAttendees(String course, String trainingStatus) {
    String sql = "SELECT e.emp_code AS empCode, e.emp_name AS empName, " +
                 "e.designation_name AS designationName, e.function_name AS functionName, " +
                 "e.email AS email " +
                 "FROM m_employee e " +
                 "JOIN registration r ON e.emp_id = r.emp_id " +
                 "JOIN training_schedule s ON r.schedule_id = s.schedule_id " +
                 "JOIN m_trainings t ON s.training_id = t.training_id " +
                 "WHERE t.course = ? AND s.training_status = ? " +
                 "ORDER BY r.registration_date DESC";

    return jdbcTemplate.query(sql, new Object[]{course, trainingStatus}, new BeanPropertyRowMapper<>(EmployeeDetailsDTO.class));
}

 public List<RegistrationDetailsDTO> getRegistrationDetails() {
        String sql = "SELECT e.emp_code AS empCode, e.emp_name AS empName, r.registration_id AS registrationId, " +
                "r.registration_date AS registrationDate, t.course AS courseName, " +
                "r.registration_comments AS registrationComments, r.registration_status AS status, " +
                "r.registration_response AS registrationResponse " +
                "FROM m_employee e " +
                "JOIN registration r ON e.emp_id = r.emp_id " +
                "JOIN training_schedule s ON r.schedule_id = s.schedule_id " +
                "JOIN m_trainings t ON s.training_id = t.training_id " +
                "ORDER BY r.registration_date DESC";
    
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(RegistrationDetailsDTO.class));
    }

   
    
    public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithAdditionalDetails(String empId) {
        String sql = "SELECT " +
                "e.emp_code AS empCode, " +
                "e.emp_name AS empName, " +
                "r.registration_id AS registrationId, " +
                "r.registration_date AS registrationDate, " +
                "t.course AS courseName, " +
                "r.registration_comments AS registrationComments, " +
                "r.registration_status AS status, " +
                "r.registration_response AS registrationResponse, " +
                "t.trainer_names AS trainerName, " +
                "s.planned_start_date AS startDate, " +
                "s.planned_end_date AS endDate, " +
                "s.from_time AS fromTime, " +
                "s.to_time AS toTime, " +
                "s.actual_start_date AS actualStartDate, " +
                "s.actual_end_date AS actualEndDate, " +
                "e.emp_id AS empId, " +
                "ts.training_status AS trainingStatus " +  // Add this line
                "FROM " +
                "m_employee e " +
                "JOIN " +
                "registration r ON e.emp_id = r.emp_id " +
                "JOIN " +
                "training_schedule s ON r.schedule_id = s.schedule_id " +
                "JOIN " +
                "m_trainings t ON s.training_id = t.training_id " +
                "JOIN " +
                "training_schedule ts ON ts.schedule_id = r.schedule_id " +
                "WHERE e.emp_id = CAST(? AS BIGINT) AND r.registration_status = 'confirmed' " +
                "ORDER BY " +
                "r.registration_date DESC";
    
        return jdbcTemplate.query(sql, new Object[]{empId}, new BeanPropertyRowMapper<>(AdditionalRegistrationDetailsDTO.class));
    }
    
   

    public List<AdditionalRegistrationDetailsDTO> getDetailsForCourse(String courseName) {
        String sql = "SELECT r.emp_id AS empCode, mt.course AS courseName, ts.trainer_name AS trainerName, " +
                     "ts.planned_start_date AS startDate, ts.planned_end_date AS endDate, " +
                     "ts.from_time AS fromTime, ts.to_time AS toTime, " +
                     "r.registration_status AS status, r.emp_id AS empId, ts.training_status AS trainingStatus " +
                     "FROM registration r " +
                     "JOIN training_schedule ts ON r.schedule_id = ts.schedule_id " +
                     "JOIN m_trainings mt ON ts.training_id = mt.training_id " +
                     "WHERE mt.course = ?";
    
        try {
            return jdbcTemplate.query(sql, new Object[]{courseName},
                    new BeanPropertyRowMapper<>(AdditionalRegistrationDetailsDTO.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    // public List<AdditionalRegistrationDetailsDTO> getDetailsForCourse(String courseName) {
    //     String sql = "SELECT " +
    //             "r.registration_id AS registrationId, " +
    //             "r.emp_id AS empCode, " +
    //             "e.emp_name AS empName, " +
    //             "r.registration_date AS registrationDate, " +
    //             "mt.course AS courseName, " +
    //             "r.registration_comments AS registrationComments, " +
    //             "r.registration_status AS status, " +
    //             "r.registration_response AS registrationResponse, " +
    //             "ts.planned_start_date AS plannedStartDate, " +
    //             "ts.planned_end_date AS plannedEndDate, " +
    //             "ts.training_schedule AS trainingSchedule " +
    //             "FROM " +
    //             "registration r " +
    //             "JOIN " +
    //             "training_schedule ts ON r.schedule_id = ts.schedule_id " +
    //             "JOIN " +
    //             "m_trainings mt ON ts.training_id = mt.training_id " +
    //             "JOIN " +
    //             "m_employee e ON r.emp_id = e.emp_id " +
    //             "WHERE " +
    //             "mt.course = ?";
    
    //     try {
    //         return jdbcTemplate.query(sql, new Object[]{courseName},
    //                 new BeanPropertyRowMapper<>(AdditionalRegistrationDetailsDTO.class));
    //     } catch (EmptyResultDataAccessException e) {
    //         return Collections.emptyList(); // Return an empty list when no results are found
    //     }
    // }
    


    public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithPlannedDates() {
        // String sql = "SELECT " +
        //         "r.registration_id AS registrationId, " +
        //         "e.emp_code AS empCode, " +
        //         "e.emp_name AS empName, " +
        //         "r.registration_date AS registrationDate, " +
        //         "t.course AS courseName, " +
        //         "r.registration_comments AS registrationComments, " +
        //         "r.registration_status AS status, " +
        //         "r.registration_response AS registrationResponse, " +
        //         "s.planned_start_date AS plannedStartDate, " +
        //         "s.planned_end_date AS plannedEndDate " +
        //         "FROM " +
        //         "registration r " +
        //         "JOIN " +
        //         "m_employee e ON r.emp_id = e.emp_id " +
        //         "JOIN " +
        //         "training_schedule s ON r.schedule_id = s.schedule_id " +
        //         "JOIN " +
        //         "m_trainings t ON s.training_id = t.training_id " +
        //         "ORDER BY " +
        //         "r.registration_date DESC";
        String sql = "SELECT " +
        "r.registration_id AS registrationId, " +
        "e.emp_code AS empCode, " +
        "e.emp_name AS empName, " +
        "r.registration_date AS registrationDate, " +
        "t.course AS courseName, " +
        "r.registration_comments AS registrationComments, " +
        "r.registration_status AS status, " +
        "r.registration_response AS registrationResponse, " +
        "s.planned_start_date AS plannedStartDate, " +
        "s.planned_end_date AS plannedEndDate, " +
        "t.training_schedule AS trainingSchedule " +  // Include the training_schedule field
        "FROM " +
        "registration r " +
        "JOIN " +
        "m_employee e ON r.emp_id = e.emp_id " +
        "JOIN " +
        "training_schedule s ON r.schedule_id = s.schedule_id " +
        "JOIN " +
        "m_trainings t ON s.training_id = t.training_id " +
        "WHERE " +
        "t.training_schedule = 'PRE-DEFINED' " +  // Add the WHERE clause to filter by training_schedule
        "ORDER BY " +
        "r.registration_date DESC";

    
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AdditionalRegistrationDetailsDTO.class));
    }
    

    public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithPlannedDatesOnRequest() {
        // String sql = "SELECT " +
        //         "r.registration_id AS registrationId, " +
        //         "e.emp_code AS empCode, " +
        //         "e.emp_name AS empName, " +
        //         "r.registration_date AS registrationDate, " +
        //         "t.course AS courseName, " +
        //         "r.registration_comments AS registrationComments, " +
        //         "r.registration_status AS status, " +
        //         "r.registration_response AS registrationResponse, " +
        //         "s.planned_start_date AS plannedStartDate, " +
        //         "s.planned_end_date AS plannedEndDate " +
        //         "FROM " +
        //         "registration r " +
        //         "JOIN " +
        //         "m_employee e ON r.emp_id = e.emp_id " +
        //         "JOIN " +
        //         "training_schedule s ON r.schedule_id = s.schedule_id " +
        //         "JOIN " +
        //         "m_trainings t ON s.training_id = t.training_id " +
        //         "ORDER BY " +
        //         "r.registration_date DESC";
        String sql = "SELECT " +
        "r.registration_id AS registrationId, " +
        "e.emp_code AS empCode, " +
        "e.emp_name AS empName, " +
        "r.registration_date AS registrationDate, " +
        "t.course AS courseName, " +
        "r.registration_comments AS registrationComments, " +
        "r.registration_status AS status, " +
        "r.registration_response AS registrationResponse, " +
        "s.planned_start_date AS plannedStartDate, " +
        "s.planned_end_date AS plannedEndDate, " +
        "t.training_schedule AS trainingSchedule " +  // Include the training_schedule field
        "FROM " +
        "registration r " +
        "JOIN " +
        "m_employee e ON r.emp_id = e.emp_id " +
        "JOIN " +
        "training_schedule s ON r.schedule_id = s.schedule_id " +
        "JOIN " +
        "m_trainings t ON s.training_id = t.training_id " +
        "WHERE " +
        "t.training_schedule = 'ON-REQUEST' " +  // Add the WHERE clause to filter by training_schedule
        "ORDER BY " +
        "r.registration_date DESC";

    
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AdditionalRegistrationDetailsDTO.class));
    }
    

    // public void updateRegistrationStatus(Long registrationId, String newStatus) {
    //     String sql = "UPDATE registration SET registration_status = ? WHERE registration_id = ?";

    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

    //         preparedStatement.setString(1, newStatus);
    //         preparedStatement.setLong(2, registrationId);

    //         int rowsAffected = preparedStatement.executeUpdate();

    //         if (rowsAffected == 0) {
    //             // No registration found with the given ID
    //             throw new EmptyResultDataAccessException("No registration found with ID: " + registrationId, 1);
    //         }

    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         // Handle the exception according to your application's needs
    //     }
    // }
    public void updateRegistrationStatus(Long registrationId, String newStatus, String registrationResponse) {
        String sql = "UPDATE registration SET registration_status = ?, registration_response = ? WHERE registration_id = ?";
    
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
            preparedStatement.setString(1, newStatus);
            preparedStatement.setString(2, registrationResponse);
            preparedStatement.setLong(3, registrationId);
    
            int rowsAffected = preparedStatement.executeUpdate();
    
            if (rowsAffected == 0) {
                // No registration found with the given ID
                throw new EmptyResultDataAccessException("No registration found with ID: " + registrationId, 1);
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception according to your application's needs
        }
    }
    
    
    
}