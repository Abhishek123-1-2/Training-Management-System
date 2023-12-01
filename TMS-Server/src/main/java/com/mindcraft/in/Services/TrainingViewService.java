package com.mindcraft.in.Services;

import com.mindcraft.in.Pojos.TrainingSchedule;
import com.mindcraft.in.Pojos.TrainingView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Service
public class TrainingViewService {

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrainingViewService(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    // Existing methods...

    public void insertTrainingView(TrainingView trainingView) {
        String sql = "INSERT INTO m_trainings " +
                "(training_category, training_type, training_schedule, course, trainer_names, " +
                "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
            preparedStatement.setString(1, trainingView.getTraining_category());
            preparedStatement.setString(2, trainingView.getTraining_type());
            preparedStatement.setString(3, trainingView.getTraining_schedule());
            preparedStatement.setString(4, trainingView.getCourse());
            preparedStatement.setString(5, trainingView.getTrainer_names());
            preparedStatement.setString(6, trainingView.getPrerequisites());
            preparedStatement.setString(7, trainingView.getCourse_description());
            preparedStatement.setLong(8, trainingView.getDaily_hrs());
            preparedStatement.setLong(9, trainingView.getTotal_days());
            preparedStatement.setString(10, trainingView.getUrl());
            preparedStatement.setString(11, trainingView.getUsername());
            preparedStatement.setString(12, trainingView.getPassword());
    
            preparedStatement.executeUpdate();
    
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception according to your application's needs
        }
    }
    
    public List<TrainingView> getAllTrainingViews() {
        String sql = "SELECT * FROM m_trainings";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingView.class));
    }

    public List<String> getTrainerNames() {
        String sql = "SELECT DISTINCT trainer_names FROM m_trainings";
        return jdbcTemplate.queryForList(sql, String.class);
    }
   public Long getTrainingIdByTrainerName(String trainerName) {
    String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ?";
    try {
        return jdbcTemplate.queryForObject(sql, Long.class, trainerName);
    } catch (EmptyResultDataAccessException e) {
        // Handle the case where no training_id is found for the given trainer name
        // You might want to log a message or throw a custom exception
        return null;
    }
}
public void scheduleTraining(Long trainingId, TrainingSchedule request) {
    // Assuming you have a separate table named 'training_schedule'
    String scheduleSql = "INSERT INTO training_schedule " +
            "(training_id, trainer_name, planned_start_date, planned_end_date, actual_start_date, actual_end_date, training_status) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";

    try (Connection connection = dataSource.getConnection();
         PreparedStatement scheduleStatement = connection.prepareStatement(scheduleSql)) {

        // Set parameters for the schedule insertion
        scheduleStatement.setLong(1, trainingId);
        scheduleStatement.setString(2, request.getTrainerName());
        scheduleStatement.setDate(3, new Date(request.getPlannedStartDate().getTime()));
        scheduleStatement.setDate(4, new Date(request.getPlannedEndDate().getTime()));
        scheduleStatement.setDate(5, new Date(request.getActualStartDate().getTime()));
        scheduleStatement.setDate(6, new Date(request.getActualEndDate().getTime()));
        scheduleStatement.setString(7, request.getTrainingStatus());

        // Execute the schedule insertion
        scheduleStatement.executeUpdate();

    } catch (SQLException e) {
        e.printStackTrace();
        // Handle the exception according to your application's needs
    }
}
    

    // Add other methods as needed...
}
