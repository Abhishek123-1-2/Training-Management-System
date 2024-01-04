// package com.mindcraft.in.Services.Employee;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.BeanPropertyRowMapper;
// import org.springframework.jdbc.core.JdbcTemplate;

// import com.mindcraft.in.Pojos.Employee.TrainingHistoryDTO;

// public class TrainingHistoryService {
//     private final JdbcTemplate jdbcTemplate;

//     @Autowired
//     public TrainingHistoryService(JdbcTemplate jdbcTemplate) {
//         this.jdbcTemplate = jdbcTemplate;
//     }

//     @Override
//     public List<TrainingHistoryDTO> getTrainingHistoryByEmpId(String empId) {
//         // Implement the query to fetch training history based on empId
//         String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
//                      "FROM m_trainings t " +
//                      "JOIN training_schedule ts ON t.training_id = ts.training_id " +
//                      "JOIN registration r ON ts.schedule_id = r.schedule_id " +
//                      "WHERE r.emp_id = ? AND ts.training_status = 'Completed' " +
//                      "ORDER BY ts.planned_start_date DESC";

//         return jdbcTemplate.query(sql, new Object[]{empId}, new BeanPropertyRowMapper<>(TrainingHistoryDTO.class));
//     }
// }

package com.mindcraft.in.Services.Employee;

import java.util.List;

import com.mindcraft.in.Pojos.Employee.TrainingHistoryDTO;

public interface TrainingHistoryService {
    List<TrainingHistoryDTO> getTrainingHistoryByEmpId(String empId);
}

