package com.mindcraft.in.Services.Employee;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Employee.TrainingEnrollmentDTO;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TrainingEnrollmentService {
    
    private final JdbcTemplate jdbcTemplate;
    // private final RegistrationRepository registrationRepository;

    @Autowired
    public TrainingEnrollmentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

    }

    public void enrollTraining(TrainingScheduleDTO request) {
        
        // // Implement your business logic here
        // // Insert data into the registration table
        // Registration registration = new Registration();
        // registration.setTraining_id(request.getTrainingId());
        // registration.setSchedule_id(request.getScheduleId());
        // // Set other fields as needed
        // registrationRepository.save(registration);
        try {
            if (request.getScheduleId() == null) {
                throw new IllegalArgumentException("scheduleId cannot be null");
            }

            String scheduleIdSql = "SELECT training_id, schedule_id, emp_id FROM training_schedule WHERE training_id = ?";
            Long scheduleId = jdbcTemplate.queryForObject(scheduleIdSql, Long.class, request.getTrainingId(), request.getScheduleId(), request.getEmpId());

            if (scheduleId == null) {
                throw new IllegalStateException("No schedule found for the given training_id: " + request.getTrainingId() +"schedule_id: " + request.getScheduleId() + "emp_id: " + request.getEmpId());
            }

            // Set the registration_date to the current system date
            LocalDateTime currentDateTime = LocalDateTime.now();
            Timestamp registrationDate = Timestamp.valueOf(currentDateTime);

            // Set the registration_status to "Registered"
            String registrationStatus = "Registered";
            // Insert data into the registration table
            String sql = "INSERT INTO registration (training_id, schedule_id, emp_id, registration_date, registration_comments, registration_status, registration_response) VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(
                    sql,
                    request.getTrainingId(),
                    request.getScheduleId(),
                    request.getEmpId(),
                    /* add other parameters as needed */
                    /* provide values for other parameters as needed */
                    registrationDate,
                    /* provide values for other parameters as needed */
                    registrationStatus
            );
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            throw new RuntimeException("Error enrolling training", e);
        }
    }

    // public List<Map<String, Object>> getEnrollmentData(Long empId) {
    //     // Implement logic to fetch enrollment data based on empId
    //     String sql = "SELECT * FROM registration WHERE emp_id = ?";
    //     return jdbcTemplate.queryForList(sql, empId);
    // }
//     public List<TrainingEnrollmentDTO> getEnrollmentData(Long empId) {
//     // String sql = "SELECT t.training_id, t.schedule_id, r.emp_id, t.course " +
//     //         "FROM registration r " +
//     //         "JOIN training_schedule t ON r.training_id = t.training_id " +
//     //         "WHERE r.emp_id = ?";
//     // String sql = "SELECT * FROM registration WHERE emp_id = ?";
//     String sql = "SELECT r.training_id, r.schedule_id, r.emp_id, t.course " +
//                  "FROM registration r " +
//                  "JOIN training_schedule t ON r.training_id = t.training_id " +
//                  "WHERE r.emp_id = ?";

//     List<Map<String, Object>> enrollmentData = jdbcTemplate.queryForList(sql, empId);

//     return enrollmentData.stream()
//             .map(enrollmentRow -> new TrainingEnrollmentDTO(
//                     (Long) enrollmentRow.get("training_id"),
//                     (Long) enrollmentRow.get("schedule_id"),
//                     empId,
//                     (String) enrollmentRow.get("course")
//             ))
//             .collect(Collectors.toList());
// }
// public List<TrainingEnrollmentDTO> getEnrollmentData(Long empId) {
//     String sql = "SELECT t.training_id, t.schedule_id, r.emp_id, t.course " +
//                  "FROM registration r " +
//                  "JOIN training_schedule t ON r.training_id = t.training_id " +
//                  "WHERE r.emp_id = ?";

//     try {
//         List<Map<String, Object>> enrollmentData = jdbcTemplate.queryForList(sql, empId);

//         return enrollmentData.stream()
//                 .map(enrollmentRow -> new TrainingEnrollmentDTO(
//                         (Long) enrollmentRow.get("training_id"),
//                         (Long) enrollmentRow.get("schedule_id"),
//                         empId,
//                         (String) enrollmentRow.get("course")
//                 ))
//                 .collect(Collectors.toList());
//     } catch (Exception e) {
//         // Handle the exception or log it
//         e.printStackTrace();
//         return Collections.emptyList();
//     }
// }

public List<TrainingEnrollmentDTO> getEnrollmentData(Long empId) {
    String sql = "SELECT t.training_id, t.schedule_id, r.emp_id, m.course " +
                 "FROM registration r " +
                 "JOIN training_schedule t ON r.schedule_id = t.schedule_id " +
                 "JOIN m_trainings m ON t.training_id = m.training_id " +
                 "WHERE r.emp_id = ?";

    try {
        List<Map<String, Object>> enrollmentData = jdbcTemplate.queryForList(sql, empId);

        return enrollmentData.stream()
                .map(enrollmentRow -> new TrainingEnrollmentDTO(
                        (Long) enrollmentRow.get("training_id"),
                        (Long) enrollmentRow.get("schedule_id"),
                        empId,
                        (String) enrollmentRow.get("course")
                ))
                .collect(Collectors.toList());
    } catch (Exception e) {
        // Handle the exception or log it
        e.printStackTrace();
        return Collections.emptyList();
    }
}


}
