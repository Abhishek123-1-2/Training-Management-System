// package com.mindcraft.in.Services.Admin;

// import com.mindcraft.in.Pojos.Admin.CompletedCourseInfoDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeCourseDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeTrainingDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
// import com.mindcraft.in.Pojos.Admin.TrainingView;
// import com.mindcraft.in.Pojos.Admin.TrainingViewDto;
// import com.mindcraft.in.Services.Employee.TrainingScheduleService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.EmptyResultDataAccessException;
// import org.springframework.jdbc.core.BeanPropertyRowMapper;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import javax.sql.DataSource;
// import java.sql.Connection;
// import java.sql.Date;
// import java.sql.PreparedStatement;
// import java.sql.SQLException;
// import java.sql.Time;
// import java.sql.Timestamp;
// import java.time.LocalDate;
// import java.time.Year;
// import java.time.YearMonth;
// import java.time.format.DateTimeFormatter;
// import java.util.List;
// import java.util.Locale;
// import java.util.Map;
// import java.util.stream.Collectors;

// @Service
// public class TrainingViewService {

//     private final DataSource dataSource;
//     private final JdbcTemplate jdbcTemplate;
//     // private final TrainingScheduleService trainingScheduleService;

//     @Autowired
//     public TrainingViewService(DataSource dataSource, JdbcTemplate jdbcTemplate) {
//         this.dataSource = dataSource;
//         this.jdbcTemplate = jdbcTemplate;
//         // this.trainingScheduleService = trainingScheduleService;
//     }

//     // Existing methods...

//     // public void insertTrainingView(TrainingView trainingView) {
//     //     String sql = "INSERT INTO m_trainings " +
//     //             "(training_category, training_type, training_schedule, course, trainer_names, " +
//     //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
//     //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
//     //     try (Connection connection = dataSource.getConnection();
//     //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//     //         preparedStatement.setString(1, trainingView.getTraining_category());
//     //         preparedStatement.setString(2, trainingView.getTraining_type());
//     //         preparedStatement.setString(3, trainingView.getTraining_schedule());
//     //         preparedStatement.setString(4, trainingView.getCourse());
//     //         preparedStatement.setString(5, trainingView.getTrainer_names());
//     //         preparedStatement.setString(6, trainingView.getPrerequisites());
//     //         preparedStatement.setString(7, trainingView.getCourse_description());
//     //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
//     //         preparedStatement.setLong(9, trainingView.getTotal_days());
//     //         preparedStatement.setString(10, trainingView.getUrl());
//     //         preparedStatement.setString(11, trainingView.getUsername());
//     //         preparedStatement.setString(12, trainingView.getPassword());
    
//     //         preparedStatement.executeUpdate();
    
//     //     } catch (SQLException e) {
//     //         e.printStackTrace();
//     //         // Handle the exception according to your application's needs
//     //     }
//     // }
//     // public void insertTrainingView(TrainingView trainingView) {
//     //     // Modify the course field to concatenate trainer_names and course
//     //     String concatenatedCourse = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
//     //     trainingView.setCourse(concatenatedCourse);
    
//     //     String sql = "INSERT INTO m_trainings " +
//     //             "(training_category, training_type, training_schedule, course, trainer_names, " +
//     //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
//     //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
//     //     try (Connection connection = dataSource.getConnection();
//     //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//     //         preparedStatement.setString(1, trainingView.getTraining_category());
//     //         preparedStatement.setString(2, trainingView.getTraining_type());
//     //         preparedStatement.setString(3, trainingView.getTraining_schedule());
//     //         preparedStatement.setString(4, trainingView.getCourse());
//     //         preparedStatement.setString(5, trainingView.getTrainer_names());
//     //         preparedStatement.setString(6, trainingView.getPrerequisites());
//     //         preparedStatement.setString(7, trainingView.getCourse_description());
//     //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
//     //         preparedStatement.setLong(9, trainingView.getTotal_days());
//     //         preparedStatement.setString(10, trainingView.getUrl());
//     //         preparedStatement.setString(11, trainingView.getUsername());
//     //         preparedStatement.setString(12, trainingView.getPassword());
    
//     //         preparedStatement.executeUpdate();
    
//     //     } catch (SQLException e) {
//     //         e.printStackTrace();
//     //         // Handle the exception according to your application's needs
//     //         System.out.println("SQL State: " + e.getSQLState());
//     // System.out.println("Error Code: " + e.getErrorCode());
//     // System.out.println("Message: " + e.getMessage());
//     // System.out.println("Failed SQL statement: " + preparedStatement.toString());
//     //     }
//     // }
//     // public void insertTrainingView(TrainingView trainingView) {
//     //     // Modify the course field to concatenate trainer_names and course
//     //     String concatenatedCourse = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
//     //     trainingView.setCourse(concatenatedCourse);
    
//     //     String sql = "INSERT INTO m_trainings " +
//     //             "(training_category, training_type, training_schedule, course, trainer_names, " +
//     //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
//     //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
//     //     try (Connection connection = dataSource.getConnection();
//     //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//     //         preparedStatement.setString(1, trainingView.getTraining_category());
//     //         preparedStatement.setString(2, trainingView.getTraining_type());
//     //         preparedStatement.setString(3, trainingView.getTraining_schedule());
//     //         preparedStatement.setString(4, trainingView.getCourse());
//     //         preparedStatement.setString(5, trainingView.getTrainer_names());
//     //         preparedStatement.setString(6, trainingView.getPrerequisites());
//     //         preparedStatement.setString(7, trainingView.getCourse_description());
//     //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
//     //         preparedStatement.setLong(9, trainingView.getTotal_days());
//     //         preparedStatement.setString(10, trainingView.getUrl());
//     //         preparedStatement.setString(11, trainingView.getUsername());
//     //         preparedStatement.setString(12, trainingView.getPassword());
    
//     //         preparedStatement.executeUpdate();
    
//     //     } catch (SQLException e) {
//     //         e.printStackTrace();
//     //         System.out.println("SQL State: " + e.getSQLState());
//     //         System.out.println("Error Code: " + e.getErrorCode());
//     //         System.out.println("Message: " + e.getMessage());
//     //         System.out.println("Failed SQL statement: " + sql);
//     //         // Handle the exception according to your application's needs
//     //     }
//     // }
//     // public void insertTrainingView(TrainingView trainingView) {
//     //     // Modify the trainer_names field to concatenate trainer_names and course
//     //     String concatenatedTrainerNames = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
//     //     trainingView.setTrainer_names(concatenatedTrainerNames);
    
//     //     String sql = "INSERT INTO m_trainings " +
//     //             "(training_category, training_type, training_schedule, course, trainer_names, " +
//     //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
//     //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
//     //     try (Connection connection = dataSource.getConnection();
//     //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//     //         preparedStatement.setString(1, trainingView.getTraining_category());
//     //         preparedStatement.setString(2, trainingView.getTraining_type());
//     //         preparedStatement.setString(3, trainingView.getTraining_schedule());
//     //         preparedStatement.setString(4, trainingView.getCourse());
//     //         preparedStatement.setString(5, trainingView.getTrainer_names());
//     //         preparedStatement.setString(6, trainingView.getPrerequisites());
//     //         preparedStatement.setString(7, trainingView.getCourse_description());
//     //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
//     //         preparedStatement.setLong(9, trainingView.getTotal_days());
//     //         preparedStatement.setString(10, trainingView.getUrl());
//     //         preparedStatement.setString(11, trainingView.getUsername());
//     //         preparedStatement.setString(12, trainingView.getPassword());
    
//     //         preparedStatement.executeUpdate();
    
//     //     } catch (SQLException e) {
//     //         e.printStackTrace();
//     //         System.out.println("SQL State: " + e.getSQLState());
//     //         System.out.println("Error Code: " + e.getErrorCode());
//     //         System.out.println("Message: " + e.getMessage());
//     //         System.out.println("Failed SQL statement: " + sql);
//     //         // Handle the exception according to your application's needs
//     //     }
//     // }
//     //  public List<TrainingViewDto> getTrainingSchedule() {
//     //     String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
//     //                  "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
//     //                  "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
//     //                  "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
//     //                  "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
//     //                  "FROM m_trainings t " +
//     //                  "JOIN training_schedule ts ON t.training_id = ts.training_id";
        
//     //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
//     // }
//     public List<TrainingViewDto> getTrainingSchedule() {
//         String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
//                      "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
//                      "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
//                      "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
//                      "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
//                      "FROM m_trainings t " +
//                      "JOIN training_schedule ts ON t.training_id = ts.training_id " +
//                      "ORDER BY ts.planned_start_date DESC";  // Add this line for ordering
        
//         return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
//     }
    
//     public void insertTrainingView(TrainingView trainingView) {
//         // Concatenate trainer_names and course
//         String concatenatedTrainerNames = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
//         trainingView.setTrainer_names(concatenatedTrainerNames);
    
//         String sql = "INSERT INTO m_trainings " +
//                 "(training_category, training_type, training_schedule, course, trainer_names, " +
//                 "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
//                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
//         try (Connection connection = dataSource.getConnection();
//              PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//             preparedStatement.setString(1, trainingView.getTraining_category());
//             preparedStatement.setString(2, trainingView.getTraining_type());
//             preparedStatement.setString(3, trainingView.getTraining_schedule());
//             preparedStatement.setString(4, trainingView.getCourse());
//             preparedStatement.setString(5, trainingView.getTrainer_names());
//             preparedStatement.setString(6, trainingView.getPrerequisites());
//             preparedStatement.setString(7, trainingView.getCourse_description());
//             preparedStatement.setLong(8, trainingView.getDaily_hrs());
//             preparedStatement.setLong(9, trainingView.getTotal_days());
//             preparedStatement.setString(10, trainingView.getUrl());
//             preparedStatement.setString(11, trainingView.getUsername());
//             preparedStatement.setString(12, trainingView.getPassword());
    
//             preparedStatement.executeUpdate();
    
//         } catch (SQLException e) {
//             e.printStackTrace();
//             // Handle the exception according to your application's needs
//             System.out.println("SQL State: " + e.getSQLState());
//             System.out.println("Error Code: " + e.getErrorCode());
//             System.out.println("Message: " + e.getMessage());
//             System.out.println("Failed SQL statement: " + sql);
//         }
//     }
//     public void updateTrainingView(Long trainingId, TrainingView updatedTrainingView) {
//         // Concatenate trainer_names and course
//         String concatenatedTrainerNames = updatedTrainingView.getTrainer_names() + "(" + updatedTrainingView.getCourse() + ")";
//         updatedTrainingView.setTrainer_names(concatenatedTrainerNames);
    
//         String sql = "UPDATE m_trainings SET " +
//                 "training_category = ?, " +
//                 "training_type = ?, " +
//                 "training_schedule = ?, " +
//                 "course = ?, " +
//                 "trainer_names = ?, " +
//                 "prerequisites = ?, " +
//                 "course_description = ?, " +
//                 "daily_hrs = ?, " +
//                 "total_days = ?, " +
//                 "url = ?, " +
//                 "username = ?, " +
//                 "password = ?, " +
//                 "updated_by = ?, " +
//                 "updated_on = CURRENT_TIMESTAMP " +
//                 "WHERE training_id = ?";
    
//         try (Connection connection = dataSource.getConnection();
//              PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
//             preparedStatement.setString(1, updatedTrainingView.getTraining_category());
//             preparedStatement.setString(2, updatedTrainingView.getTraining_type());
//             preparedStatement.setString(3, updatedTrainingView.getTraining_schedule());
//             preparedStatement.setString(4, updatedTrainingView.getCourse());
//             preparedStatement.setString(5, updatedTrainingView.getTrainer_names());
//             preparedStatement.setString(6, updatedTrainingView.getPrerequisites());
//             preparedStatement.setString(7, updatedTrainingView.getCourse_description());
//             preparedStatement.setLong(8, updatedTrainingView.getDaily_hrs());
//             preparedStatement.setLong(9, updatedTrainingView.getTotal_days());
//             preparedStatement.setString(10, updatedTrainingView.getUrl());
//             preparedStatement.setString(11, updatedTrainingView.getUsername());
//             preparedStatement.setString(12, updatedTrainingView.getPassword());
//             preparedStatement.setString(13, updatedTrainingView.getUpdated_by());
//             preparedStatement.setLong(14, trainingId);
    
//             preparedStatement.executeUpdate();
    
//         } catch (SQLException e) {
//             e.printStackTrace();
//             // Handle the SQL exception as needed
//             // You may log the exception or throw a custom exception
//             System.out.println("SQL State: " + e.getSQLState());
//             System.out.println("Error Code: " + e.getErrorCode());
//             System.out.println("Message: " + e.getMessage());
//             System.out.println("Failed SQL statement: " + sql);
//         }
//     }
    
//     //  public List<TrainingViewDto> getTrainingSchedule() {
//     //     String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
//     //                  "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
//     //                  "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
//     //                  "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
//     //                  "ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
//     //                  "FROM m_trainings t " +
//     //                  "JOIN training_schedule ts ON t.training_id = ts.training_id";
    
//     //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
//     // }
   
    
    
    
//     public List<TrainingView> getAllTrainingViews() {
//         String sql = "SELECT * FROM m_trainings ORDER BY created_on DESC";
//         return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingView.class));
//     }
//     public List<String> getAllTrainerNames() {
//         String sql = "SELECT DISTINCT trainer_names FROM m_trainings";
//         return jdbcTemplate.queryForList(sql, String.class);
//     }
//     public List<String> getTrainerNames() {
//         String sql = "SELECT DISTINCT trainer_names FROM m_trainings";
//         return jdbcTemplate.queryForList(sql, String.class);
//     }
// //    public Long getTrainingIdByTrainerName(String trainerName) {
// //     String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ?";
// //     try {
// //         return jdbcTemplate.queryForObject(sql, Long.class, trainerName);
// //     } catch (EmptyResultDataAccessException e) {
// //         // Handle the case where no training_id is found for the given trainer name
// //         // You might want to log a message or throw a custom exception
// //         return null;
// //     }
// // }
// // public Long getTrainingIdByTrainerName(String trainerName) {
// //     String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ?";
    
// //     try {
// //         // Try to fetch the training ID for the given trainer name
// //         Long trainingId = jdbcTemplate.queryForObject(sql, Long.class, trainerName);
// //         if (trainingId != null) {
// //             return trainingId;
// //         }
        
// //         // If the training ID is not found for the given trainer name,
// //         // try fetching the training ID for any other trainer with the same name
// //         String alternativeSql = "SELECT training_id FROM m_trainings WHERE trainer_names = ? LIMIT 1";
// //         return jdbcTemplate.queryForObject(alternativeSql, Long.class, trainerName);
        
// //     } catch (EmptyResultDataAccessException e) {
// //         // Handle the case where no training_id is found for the given trainer name
// //         // You might want to log a message or throw a custom exception
// //         return null;
// //     }
// // }
// public Long getTrainingIdByTrainerName(String trainerName) {
//     String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ? LIMIT 1";
    
//     try {
//         // Try to fetch the training ID for the given trainer name
//         return jdbcTemplate.queryForObject(sql, Long.class, trainerName);
        
//     } catch (EmptyResultDataAccessException e) {
//         // Handle the case where no training_id is found for the given trainer name
//         // You might want to log a message or throw a custom exception
//         return null;
//     }
// }



// public void scheduleTraining(Long trainingId, TrainingSchedule request) {
//     // Assuming you have a separate table named 'training_schedule'
//     String scheduleSql = "INSERT INTO training_schedule " +
//             "(training_id, trainer_name, planned_start_date, planned_end_date, actual_start_date, actual_end_date, training_status, from_time, to_time) " +
//             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     try (Connection connection = dataSource.getConnection();
//          PreparedStatement scheduleStatement = connection.prepareStatement(scheduleSql)) {

//         // Set parameters for the schedule insertion
//         scheduleStatement.setLong(1, trainingId);
//         scheduleStatement.setString(2, request.getTrainerName());
//         scheduleStatement.setDate(3, request.getPlannedStartDate() != null ? new Date(request.getPlannedStartDate().getTime()) : null);
//         scheduleStatement.setDate(4, request.getPlannedEndDate() != null ? new Date(request.getPlannedEndDate().getTime()) : null);
//         scheduleStatement.setDate(5, request.getActualStartDate() != null ? new Date(request.getActualStartDate().getTime()) : null);
//         scheduleStatement.setDate(6, request.getActualEndDate() != null ? new Date(request.getActualEndDate().getTime()) : null);
//         scheduleStatement.setString(7, request.getTrainingStatus());
//         scheduleStatement.setString(8, request.getFromTime());
//         scheduleStatement.setString(9, request.getToTime());

//         // Execute the schedule insertion
//         scheduleStatement.executeUpdate();

//     } catch (SQLException e) {
//         e.printStackTrace();
//         // Handle the exception according to your application's needs
//     }
// }
// public void updateTrainingSchedule(TrainingSchedule updatedSchedule) {
//     String sql = "UPDATE training_schedule " +
//                  "SET planned_start_date = ?, planned_end_date = ?, actual_start_date = ?, actual_end_date = ?, " +
//                  "training_status = ?, from_time = ?, to_time = ? " +
//                  "WHERE schedule_id = ?";

//     try (Connection connection = dataSource.getConnection();
//          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

//         // Convert Date objects to Timestamp
//         Timestamp plannedStartDate = updatedSchedule.getPlannedStartDate() != null
//                 ? new Timestamp(updatedSchedule.getPlannedStartDate().getTime())
//                 : null;

//         Timestamp plannedEndDate = updatedSchedule.getPlannedEndDate() != null
//                 ? new Timestamp(updatedSchedule.getPlannedEndDate().getTime())
//                 : null;

//         Timestamp actualStartDate = updatedSchedule.getActualStartDate() != null
//                 ? new Timestamp(updatedSchedule.getActualStartDate().getTime())
//                 : null;

//         Timestamp actualEndDate = updatedSchedule.getActualEndDate() != null
//                 ? new Timestamp(updatedSchedule.getActualEndDate().getTime())
//                 : null;

//         // Set parameters for the update
//         preparedStatement.setTimestamp(1, plannedStartDate);
//         preparedStatement.setTimestamp(2, plannedEndDate);
//         preparedStatement.setTimestamp(3, actualStartDate);
//         preparedStatement.setTimestamp(4, actualEndDate);
//         preparedStatement.setString(5, updatedSchedule.getTrainingStatus());
//         preparedStatement.setString(6, updatedSchedule.getFromTime());
//         preparedStatement.setString(7, updatedSchedule.getToTime());
//         preparedStatement.setLong(8, updatedSchedule.getScheduleId());

//         // Execute the update
//         preparedStatement.executeUpdate();

//     } catch (SQLException e) {
//         e.printStackTrace();
//         // Handle the exception according to your application's needs
//     }
// }


// public List<String> getTrainingCourses() {
//     String sql = "SELECT t.course || ' - ' || ts.planned_start_date AS course_info " +
//                  "FROM m_trainings t " +
//                  "JOIN training_schedule ts ON t.training_id = ts.training_id";
//     return jdbcTemplate.queryForList(sql, String.class);
// }
//     // Add other methods as needed...

//     public TrainingView getTrainingDetailsByCourse(String course) {
//         String sql = "SELECT * FROM m_trainings WHERE course = ?";
    
//         try {
//             return jdbcTemplate.queryForObject(sql, new Object[]{course}, new BeanPropertyRowMapper<>(TrainingView.class));
//         } catch (EmptyResultDataAccessException e) {
//             return null;
//         }
//     }
//     public Long getTrainingIdByCourse(String course) {
//         String sql = "SELECT training_id FROM m_trainings WHERE course = ?";
//         try {
//             return jdbcTemplate.queryForObject(sql, Long.class, course);
//         } catch (EmptyResultDataAccessException e) {
//             // Handle the case where no training_id is found for the given course
//             // You might want to log a message or throw a custom exception
//             return null;
//         }
//     }
//     public Long getTrainingIdByCourseName(String courseName) {
//         String sql = "SELECT training_id FROM m_trainings WHERE course = ?";
    
//         try {
//             return jdbcTemplate.queryForObject(sql, Long.class, courseName);
//         } catch (EmptyResultDataAccessException e) {
//             return null;
//         }
//     }
//     public Map<String, Long> getTrainingStatusCounts() {
//         String sql = "SELECT training_status, COUNT(*) AS count FROM training_schedule GROUP BY training_status";

//         List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

//         return result.stream()
//                 .collect(Collectors.toMap(
//                         entry -> (String) entry.get("training_status"),
//                         entry -> ((Number) entry.get("count")).longValue()
//                 ));
//     }
//     public Long getScheduleIdByTrainerName(String trainerName) {
//         String sql = "SELECT schedule_id FROM training_schedule WHERE trainer_name = ? LIMIT 1";

//         try {
//             // Try to fetch the schedule_id for the given trainer name
//             return jdbcTemplate.queryForObject(sql, Long.class, trainerName);

//         } catch (EmptyResultDataAccessException e) {
//             // Handle the case where no schedule_id is found for the given trainer name
//             // You might want to log a message or throw a custom exception
//             return null;
//         }
//     }
    
    
// }
package com.mindcraft.in.Services.Admin;

import com.mindcraft.in.Pojos.Admin.CompletedCourseInfoDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeCourseDetailsDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeTrainingDetailsDTO;
import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Admin.TrainingView;
import com.mindcraft.in.Pojos.Admin.TrainingViewDto;
import com.mindcraft.in.Services.Employee.TrainingScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TrainingViewService {

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;
    // private final TrainingScheduleService trainingScheduleService;

    @Autowired
    public TrainingViewService(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
        // this.trainingScheduleService = trainingScheduleService;
    }

    // Existing methods...

    // public void insertTrainingView(TrainingView trainingView) {
    //     String sql = "INSERT INTO m_trainings " +
    //             "(training_category, training_type, training_schedule, course, trainer_names, " +
    //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
    //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
    //         preparedStatement.setString(1, trainingView.getTraining_category());
    //         preparedStatement.setString(2, trainingView.getTraining_type());
    //         preparedStatement.setString(3, trainingView.getTraining_schedule());
    //         preparedStatement.setString(4, trainingView.getCourse());
    //         preparedStatement.setString(5, trainingView.getTrainer_names());
    //         preparedStatement.setString(6, trainingView.getPrerequisites());
    //         preparedStatement.setString(7, trainingView.getCourse_description());
    //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
    //         preparedStatement.setLong(9, trainingView.getTotal_days());
    //         preparedStatement.setString(10, trainingView.getUrl());
    //         preparedStatement.setString(11, trainingView.getUsername());
    //         preparedStatement.setString(12, trainingView.getPassword());
    
    //         preparedStatement.executeUpdate();
    
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         // Handle the exception according to your application's needs
    //     }
    // }
    // public void insertTrainingView(TrainingView trainingView) {
    //     // Modify the course field to concatenate trainer_names and course
    //     String concatenatedCourse = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
    //     trainingView.setCourse(concatenatedCourse);
    
    //     String sql = "INSERT INTO m_trainings " +
    //             "(training_category, training_type, training_schedule, course, trainer_names, " +
    //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
    //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
    //         preparedStatement.setString(1, trainingView.getTraining_category());
    //         preparedStatement.setString(2, trainingView.getTraining_type());
    //         preparedStatement.setString(3, trainingView.getTraining_schedule());
    //         preparedStatement.setString(4, trainingView.getCourse());
    //         preparedStatement.setString(5, trainingView.getTrainer_names());
    //         preparedStatement.setString(6, trainingView.getPrerequisites());
    //         preparedStatement.setString(7, trainingView.getCourse_description());
    //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
    //         preparedStatement.setLong(9, trainingView.getTotal_days());
    //         preparedStatement.setString(10, trainingView.getUrl());
    //         preparedStatement.setString(11, trainingView.getUsername());
    //         preparedStatement.setString(12, trainingView.getPassword());
    
    //         preparedStatement.executeUpdate();
    
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         // Handle the exception according to your application's needs
    //         System.out.println("SQL State: " + e.getSQLState());
    // System.out.println("Error Code: " + e.getErrorCode());
    // System.out.println("Message: " + e.getMessage());
    // System.out.println("Failed SQL statement: " + preparedStatement.toString());
    //     }
    // }
    // public void insertTrainingView(TrainingView trainingView) {
    //     // Modify the course field to concatenate trainer_names and course
    //     String concatenatedCourse = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
    //     trainingView.setCourse(concatenatedCourse);
    
    //     String sql = "INSERT INTO m_trainings " +
    //             "(training_category, training_type, training_schedule, course, trainer_names, " +
    //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
    //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
    //         preparedStatement.setString(1, trainingView.getTraining_category());
    //         preparedStatement.setString(2, trainingView.getTraining_type());
    //         preparedStatement.setString(3, trainingView.getTraining_schedule());
    //         preparedStatement.setString(4, trainingView.getCourse());
    //         preparedStatement.setString(5, trainingView.getTrainer_names());
    //         preparedStatement.setString(6, trainingView.getPrerequisites());
    //         preparedStatement.setString(7, trainingView.getCourse_description());
    //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
    //         preparedStatement.setLong(9, trainingView.getTotal_days());
    //         preparedStatement.setString(10, trainingView.getUrl());
    //         preparedStatement.setString(11, trainingView.getUsername());
    //         preparedStatement.setString(12, trainingView.getPassword());
    
    //         preparedStatement.executeUpdate();
    
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         System.out.println("SQL State: " + e.getSQLState());
    //         System.out.println("Error Code: " + e.getErrorCode());
    //         System.out.println("Message: " + e.getMessage());
    //         System.out.println("Failed SQL statement: " + sql);
    //         // Handle the exception according to your application's needs
    //     }
    // }
    // public void insertTrainingView(TrainingView trainingView) {
    //     // Modify the trainer_names field to concatenate trainer_names and course
    //     String concatenatedTrainerNames = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
    //     trainingView.setTrainer_names(concatenatedTrainerNames);
    
    //     String sql = "INSERT INTO m_trainings " +
    //             "(training_category, training_type, training_schedule, course, trainer_names, " +
    //             "prerequisites, course_description, daily_hrs, total_days, url, username, password) " +
    //             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    //     try (Connection connection = dataSource.getConnection();
    //          PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
    //         preparedStatement.setString(1, trainingView.getTraining_category());
    //         preparedStatement.setString(2, trainingView.getTraining_type());
    //         preparedStatement.setString(3, trainingView.getTraining_schedule());
    //         preparedStatement.setString(4, trainingView.getCourse());
    //         preparedStatement.setString(5, trainingView.getTrainer_names());
    //         preparedStatement.setString(6, trainingView.getPrerequisites());
    //         preparedStatement.setString(7, trainingView.getCourse_description());
    //         preparedStatement.setLong(8, trainingView.getDaily_hrs());
    //         preparedStatement.setLong(9, trainingView.getTotal_days());
    //         preparedStatement.setString(10, trainingView.getUrl());
    //         preparedStatement.setString(11, trainingView.getUsername());
    //         preparedStatement.setString(12, trainingView.getPassword());
    
    //         preparedStatement.executeUpdate();
    
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         System.out.println("SQL State: " + e.getSQLState());
    //         System.out.println("Error Code: " + e.getErrorCode());
    //         System.out.println("Message: " + e.getMessage());
    //         System.out.println("Failed SQL statement: " + sql);
    //         // Handle the exception according to your application's needs
    //     }
    // }
    //  public List<TrainingViewDto> getTrainingSchedule() {
    //     String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
    //                  "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
    //                  "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
    //                  "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
    //                  "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
    //                  "FROM m_trainings t " +
    //                  "JOIN training_schedule ts ON t.training_id = ts.training_id";
        
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
    // }
    public List<TrainingViewDto> getTrainingSchedule() {
        String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
                     "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
                     "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
                     "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
                     "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
                     "FROM m_trainings t " +
                     "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                     "ORDER BY ts.planned_start_date DESC";  // Add this line for ordering
        
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
    }
    
    public void insertTrainingView(TrainingView trainingView) {
        // Concatenate trainer_names and course
        String concatenatedTrainerNames = trainingView.getTrainer_names() + "(" + trainingView.getCourse() + ")";
        trainingView.setTrainer_names(concatenatedTrainerNames);
    
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
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Failed SQL statement: " + sql);
        }
    }
    public void updateTrainingView(Long trainingId, TrainingView updatedTrainingView) {
        // Concatenate trainer_names and course
        String concatenatedTrainerNames = updatedTrainingView.getTrainer_names() + "(" + updatedTrainingView.getCourse() + ")";
        updatedTrainingView.setTrainer_names(concatenatedTrainerNames);
    
        String sql = "UPDATE m_trainings SET " +
                "training_category = ?, " +
                "training_type = ?, " +
                "training_schedule = ?, " +
                "course = ?, " +
                "trainer_names = ?, " +
                "prerequisites = ?, " +
                "course_description = ?, " +
                "daily_hrs = ?, " +
                "total_days = ?, " +
                "url = ?, " +
                "username = ?, " +
                "password = ?, " +
                "updated_by = ?, " +
                "updated_on = CURRENT_TIMESTAMP " +
                "WHERE training_id = ?";
    
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    
            preparedStatement.setString(1, updatedTrainingView.getTraining_category());
            preparedStatement.setString(2, updatedTrainingView.getTraining_type());
            preparedStatement.setString(3, updatedTrainingView.getTraining_schedule());
            preparedStatement.setString(4, updatedTrainingView.getCourse());
            preparedStatement.setString(5, updatedTrainingView.getTrainer_names());
            preparedStatement.setString(6, updatedTrainingView.getPrerequisites());
            preparedStatement.setString(7, updatedTrainingView.getCourse_description());
            preparedStatement.setLong(8, updatedTrainingView.getDaily_hrs());
            preparedStatement.setLong(9, updatedTrainingView.getTotal_days());
            preparedStatement.setString(10, updatedTrainingView.getUrl());
            preparedStatement.setString(11, updatedTrainingView.getUsername());
            preparedStatement.setString(12, updatedTrainingView.getPassword());
            preparedStatement.setString(13, updatedTrainingView.getUpdated_by());
            preparedStatement.setLong(14, trainingId);
    
            preparedStatement.executeUpdate();
    
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the SQL exception as needed
            // You may log the exception or throw a custom exception
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Failed SQL statement: " + sql);
        }
    }
    
    //  public List<TrainingViewDto> getTrainingSchedule() {
    //     String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
    //                  "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
    //                  "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
    //                  "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
    //                  "ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
    //                  "FROM m_trainings t " +
    //                  "JOIN training_schedule ts ON t.training_id = ts.training_id";
    
    //     return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingViewDto.class));
    // }
   
    
    
    
    public List<TrainingView> getAllTrainingViews() {
        String sql = "SELECT * FROM m_trainings ORDER BY created_on DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingView.class));
    }
    public List<String> getAllTrainerNames() {
        String sql = "SELECT DISTINCT trainer_names FROM m_trainings";
        return jdbcTemplate.queryForList(sql, String.class);
    }
    public List<String> getTrainerNames() {
        String sql = "SELECT DISTINCT trainer_names FROM m_trainings";
        return jdbcTemplate.queryForList(sql, String.class);
    }
//    public Long getTrainingIdByTrainerName(String trainerName) {
//     String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ?";
//     try {
//         return jdbcTemplate.queryForObject(sql, Long.class, trainerName);
//     } catch (EmptyResultDataAccessException e) {
//         // Handle the case where no training_id is found for the given trainer name
//         // You might want to log a message or throw a custom exception
//         return null;
//     }
// }
// public Long getTrainingIdByTrainerName(String trainerName) {
//     String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ?";
    
//     try {
//         // Try to fetch the training ID for the given trainer name
//         Long trainingId = jdbcTemplate.queryForObject(sql, Long.class, trainerName);
//         if (trainingId != null) {
//             return trainingId;
//         }
        
//         // If the training ID is not found for the given trainer name,
//         // try fetching the training ID for any other trainer with the same name
//         String alternativeSql = "SELECT training_id FROM m_trainings WHERE trainer_names = ? LIMIT 1";
//         return jdbcTemplate.queryForObject(alternativeSql, Long.class, trainerName);
        
//     } catch (EmptyResultDataAccessException e) {
//         // Handle the case where no training_id is found for the given trainer name
//         // You might want to log a message or throw a custom exception
//         return null;
//     }
// }
public Long getTrainingIdByTrainerName(String trainerName) {
    String sql = "SELECT training_id FROM m_trainings WHERE trainer_names = ? LIMIT 1";
    
    try {
        // Try to fetch the training ID for the given trainer name
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
            "(training_id, trainer_name, planned_start_date, planned_end_date, actual_start_date, actual_end_date, training_status, from_time, to_time) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try (Connection connection = dataSource.getConnection();
         PreparedStatement scheduleStatement = connection.prepareStatement(scheduleSql)) {

        // Set parameters for the schedule insertion
        scheduleStatement.setLong(1, trainingId);
        scheduleStatement.setString(2, request.getTrainerName());
        scheduleStatement.setDate(3, request.getPlannedStartDate() != null ? new Date(request.getPlannedStartDate().getTime()) : null);
        scheduleStatement.setDate(4, request.getPlannedEndDate() != null ? new Date(request.getPlannedEndDate().getTime()) : null);
        scheduleStatement.setDate(5, request.getActualStartDate() != null ? new Date(request.getActualStartDate().getTime()) : null);
        scheduleStatement.setDate(6, request.getActualEndDate() != null ? new Date(request.getActualEndDate().getTime()) : null);
        scheduleStatement.setString(7, request.getTrainingStatus());
        scheduleStatement.setString(8, request.getFromTime());
        scheduleStatement.setString(9, request.getToTime());

        // Execute the schedule insertion
        scheduleStatement.executeUpdate();

    } catch (SQLException e) {
        e.printStackTrace();
        // Handle the exception according to your application's needs
    }
}
public void updateTrainingSchedule(TrainingSchedule updatedSchedule) {
    String sql = "UPDATE training_schedule " +
                 "SET planned_start_date = ?, planned_end_date = ?, actual_start_date = ?, actual_end_date = ?, " +
                 "training_status = ?, from_time = ?, to_time = ? " +
                 "WHERE schedule_id = ?";

    try (Connection connection = dataSource.getConnection();
         PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

        // Convert Date objects to Timestamp
        Timestamp plannedStartDate = updatedSchedule.getPlannedStartDate() != null
                ? new Timestamp(updatedSchedule.getPlannedStartDate().getTime())
                : null;

        Timestamp plannedEndDate = updatedSchedule.getPlannedEndDate() != null
                ? new Timestamp(updatedSchedule.getPlannedEndDate().getTime())
                : null;

        Timestamp actualStartDate = updatedSchedule.getActualStartDate() != null
                ? new Timestamp(updatedSchedule.getActualStartDate().getTime())
                : null;

        Timestamp actualEndDate = updatedSchedule.getActualEndDate() != null
                ? new Timestamp(updatedSchedule.getActualEndDate().getTime())
                : null;

        // Set parameters for the update
        preparedStatement.setTimestamp(1, plannedStartDate);
        preparedStatement.setTimestamp(2, plannedEndDate);
        preparedStatement.setTimestamp(3, actualStartDate);
        preparedStatement.setTimestamp(4, actualEndDate);
        preparedStatement.setString(5, updatedSchedule.getTrainingStatus());
        preparedStatement.setString(6, updatedSchedule.getFromTime());
        preparedStatement.setString(7, updatedSchedule.getToTime());
        preparedStatement.setLong(8, updatedSchedule.getScheduleId());

        // Execute the update
        preparedStatement.executeUpdate();

    } catch (SQLException e) {
        e.printStackTrace();
        // Handle the exception according to your application's needs
    }
}


public List<String> getTrainingCourses() {
    String sql = "SELECT t.course || ' - ' || ts.planned_start_date AS course_info " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id";
    return jdbcTemplate.queryForList(sql, String.class);
}
    // Add other methods as needed...

    public TrainingView getTrainingDetailsByCourse(String course) {
        String sql = "SELECT * FROM m_trainings WHERE course = ?";
    
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{course}, new BeanPropertyRowMapper<>(TrainingView.class));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public Long getTrainingIdByCourse(String course) {
        String sql = "SELECT training_id FROM m_trainings WHERE course = ?";
        try {
            return jdbcTemplate.queryForObject(sql, Long.class, course);
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no training_id is found for the given course
            // You might want to log a message or throw a custom exception
            return null;
        }
    }
    public Long getTrainingIdByCourseName(String courseName) {
        String sql = "SELECT training_id FROM m_trainings WHERE course = ?";
    
        try {
            return jdbcTemplate.queryForObject(sql, Long.class, courseName);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public Map<String, Long> getTrainingStatusCounts() {
        String sql = "SELECT training_status, COUNT(*) AS count FROM training_schedule GROUP BY training_status";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

        return result.stream()
                .collect(Collectors.toMap(
                        entry -> (String) entry.get("training_status"),
                        entry -> ((Number) entry.get("count")).longValue()
                ));
    }
    public Long getScheduleIdByTrainerName(String trainerName) {
        String sql = "SELECT schedule_id FROM training_schedule WHERE trainer_name = ? LIMIT 1";

        try {
            // Try to fetch the schedule_id for the given trainer name
            return jdbcTemplate.queryForObject(sql, Long.class, trainerName);

        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no schedule_id is found for the given trainer name
            // You might want to log a message or throw a custom exception
            return null;
        }
    }

    public Map<String, Map<String, Long>> getTrainingStatusCountsByMonth() {
        // Get the current year
        int currentYear = LocalDate.now().getYear();

        // SQL query to fetch data for the current year with month names
        String sql = "SELECT TO_CHAR(planned_start_date, 'yyyy-MM') AS month, training_status, COUNT(*) AS count " +
                     "FROM training_schedule " +
                     "WHERE EXTRACT(YEAR FROM planned_start_date) = ? " +
                     "GROUP BY month, training_status";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, currentYear);

        // Format month names
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM yyyy", Locale.ENGLISH);

        return result.stream()
                .filter(entry -> entry.get("month") != null)
                .collect(Collectors.groupingBy(
                        entry -> YearMonth.parse((String) entry.get("month"), DateTimeFormatter.ofPattern("yyyy-MM")).format(formatter),
                        Collectors.groupingBy(
                                entry -> ((String) entry.get("training_status")).toUpperCase(),
                                Collectors.summingLong(entry -> ((Number) entry.get("count")).longValue())
                        )
                ));
    }


    private YearMonth parseMonth(String month, DateTimeFormatter formatter) {
        // Handle extra spaces and parse the month
        return YearMonth.parse(month.trim(), formatter);
    }
    public List<CompletedCourseInfoDTO> getCompletedCoursesInfo(String empCode) {
    String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "JOIN registration r ON ts.schedule_id = r.schedule_id " +
                 "JOIN m_employee e ON r.emp_id = e.emp_id " +
                 "WHERE e.emp_code = ? AND ts.training_status = 'Completed' " +
                 "ORDER BY ts.planned_start_date DESC";

    return jdbcTemplate.query(sql, new Object[]{empCode}, (rs, rowNum) -> new CompletedCourseInfoDTO(
            rs.getString("course"),
            rs.getString("trainer_name"),
            rs.getTimestamp("planned_start_date"),
            rs.getTimestamp("planned_end_date"),
            rs.getString("training_status")
    ));
}
public CompletedCourseInfoDTO updateTrainingStatusAndMoveToCompleted(String empCode, Long scheduleId) {
    // Fetch the training schedule details
    TrainingViewDto trainingViewDto = getTrainingScheduleDetails(scheduleId);

    // Perform the update of training status to 'Completed' in the database
    updateTrainingStatusToCompleted(scheduleId);

    // Move data to CompletedCourseInfoDTO
    CompletedCourseInfoDTO completedCourseInfoDTO = new CompletedCourseInfoDTO(
            trainingViewDto.getCourse(),
            trainingViewDto.getTrainerName(),
            trainingViewDto.getPlannedStartDate(),
            trainingViewDto.getPlannedEndDate(),
            "Completed"  // Assuming the training status is now 'Completed'
    );

    // Optionally, you can log or perform other actions

    return completedCourseInfoDTO;
}
public TrainingViewDto getTrainingScheduleDetails(Long scheduleId) {
    String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
                 "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
                 "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
                 "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
                 "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "WHERE ts.schedule_id = ?";

    return jdbcTemplate.queryForObject(sql, new Object[]{scheduleId}, new BeanPropertyRowMapper<>(TrainingViewDto.class));
}

public void updateTrainingStatusToCompleted(Long scheduleId) {
    String sql = "UPDATE training_schedule SET training_status = 'Completed' WHERE schedule_id = ?";
    jdbcTemplate.update(sql, scheduleId);
}
public List<EmployeeTrainingDetailsDTO> getEmployeesCompletedCourseInfo(String course) {
    String sql = "SELECT e.emp_code, e.emp_name, " +
                 "TO_CHAR(ts.planned_start_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_start_date, " +
                 "TO_CHAR(ts.planned_end_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_end_date, " +
                 "ts.training_status " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "JOIN registration r ON ts.schedule_id = r.schedule_id " +
                 "JOIN m_employee e ON r.emp_id = e.emp_id " +
                 "WHERE t.course = ? AND ts.training_status = 'Completed' " +
                 "ORDER BY ts.planned_start_date DESC";

    return jdbcTemplate.query(sql, new Object[]{course}, (rs, rowNum) -> new EmployeeTrainingDetailsDTO(
            rs.getString("emp_code"),
            rs.getString("emp_name"),
            rs.getString("planned_start_date"),
            rs.getString("planned_end_date"),
            rs.getString("training_status")
    ));
}

public List<CompletedCourseInfoDTO> getCompletedCourses() {
    String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "WHERE ts.training_status = 'Completed' " +
                 "ORDER BY ts.planned_start_date DESC";

    return jdbcTemplate.query(sql, (rs, rowNum) -> new CompletedCourseInfoDTO(
            rs.getString("course"),
            rs.getString("trainer_name"),
            rs.getTimestamp("planned_start_date"),
            rs.getTimestamp("planned_end_date"),
            rs.getString("training_status")
    ));
}

public List<String> getUniqueTrainerNames() {
    String sql = "SELECT DISTINCT trainer_name FROM training_schedule";
    
    return jdbcTemplate.queryForList(sql, String.class);
}

//   public List<EmployeeCourseDetailsDTO> getEmployeesCompletedCourseDetails(String course) {
//         String sql = "SELECT e.emp_code, e.emp_name, t.course, t.trainer_name, " +
//                      "TO_CHAR(ts.planned_start_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_start_date, " +
//                      "TO_CHAR(ts.planned_end_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_end_date, " +
//                      "ts.training_status " +
//                      "FROM m_trainings t " +
//                      "JOIN training_schedule ts ON t.training_id = ts.training_id " +
//                      "JOIN registration r ON ts.schedule_id = r.schedule_id " +
//                      "JOIN m_employee e ON r.emp_id = e.emp_id " +
//                      "WHERE t.course = ? AND ts.training_status = 'Completed' " +
//                      "ORDER BY ts.planned_start_date DESC";

//         return jdbcTemplate.query(sql, new Object[]{course}, (rs, rowNum) -> new EmployeeCourseDetailsDTO(
//                 rs.getString("emp_code"),
//                 rs.getString("emp_name"),
//                 rs.getString("course"),
//                 rs.getString("trainer_name"),
//                 rs.getString("planned_start_date"),
//                 rs.getString("planned_end_date"),
//                 rs.getString("training_status")
//         ));
//     }
public List<EmployeeCourseDetailsDTO> getEmployeesCompletedCourseDetails(String course) {
    String sql = "SELECT e.emp_code, e.emp_name, t.course, t.trainer_names, " +
                 "TO_CHAR(ts.planned_start_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_start_date, " +
                 "TO_CHAR(ts.planned_end_date, 'YYYY-MM-DD HH24:MI:SS') AS planned_end_date, " +
                 "ts.training_status " +
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "JOIN registration r ON ts.schedule_id = r.schedule_id " +
                 "JOIN m_employee e ON r.emp_id = e.emp_id " +
                 "WHERE t.course = ? AND ts.training_status = 'Completed' " +
                 "ORDER BY ts.planned_start_date DESC";

    return jdbcTemplate.query(sql, new Object[]{course}, (rs, rowNum) -> new EmployeeCourseDetailsDTO(
            rs.getString("emp_code"),
            rs.getString("emp_name"),
            rs.getString("course"),
            rs.getString("trainer_names"),
            rs.getString("planned_start_date"),
            rs.getString("planned_end_date"),
            rs.getString("training_status")
    ));
}
    
    
}
