package com.mindcraft.in.Services;

import com.mindcraft.in.Pojos.TrainingView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
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
                "prerequisites, course_description, daily_hrs, total_days, url, username, password, active_yn, " +
                "created_by, created_on, updated_by, updated_on) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
            preparedStatement.setString(13, String.valueOf(trainingView.getActive_yn()));
            preparedStatement.setString(14, trainingView.getCreated_by());
            preparedStatement.setTimestamp(15, trainingView.getCreated_on());
            preparedStatement.setString(16, trainingView.getUpdated_by());
            preparedStatement.setTimestamp(17, trainingView.getUpdated_on());

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception according to your application's needs
        }
    }

    public List<TrainingView> getAllTrainingViews() {
        String sql = "SELECT * FROM m_trainings";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingView.class));
    }

    // Add other methods as needed...
}
