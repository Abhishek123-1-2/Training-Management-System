package com.mindcraft.in.Services.Employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Employee.CompletedCoursesDTO;

@Service
public class CompletedCoursesService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<CompletedCoursesDTO> getFeedbackByEmployeeId(String empId) {
        // Modify this query based on your database
        String query = "SELECT t.course, ts.training_id, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
                       "FROM m_trainings t " +
                       "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                       "JOIN registration r ON ts.schedule_id = r.schedule_id " +
                       "JOIN m_employee e ON r.emp_id = e.emp_id " +
                       "WHERE r.emp_id = CAST(? AS bigint) AND ts.training_status = 'Completed' " +
                       "ORDER BY ts.planned_start_date DESC";
        // String query = "SELECT " +
        // "r.emp_id, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "FROM " +
        // "m_trainings t " +
        // "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE " +
        // "r.emp_id = CAST(? AS bigint) AND ts.training_status = 'Completed' " +
        // "GROUP BY " +
        // "r.emp_id, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "ORDER BY " +
        // "ts.planned_start_date DESC";


        return jdbcTemplate.query(query, new Object[]{empId}, new BeanPropertyRowMapper<>(CompletedCoursesDTO.class));
    }
}
