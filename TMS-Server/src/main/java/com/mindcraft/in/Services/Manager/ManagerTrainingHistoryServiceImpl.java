package com.mindcraft.in.Services.Manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Employee.TrainingHistoryDTO;

import java.util.List;

@Service
public class ManagerTrainingHistoryServiceImpl {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    public ManagerTrainingHistoryServiceImpl(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    public List<TrainingHistoryDTO> getTrainingHistoryByEmpIds(List<Long> empIds) {
        // Implement the query to fetch training history based on empIds
        // String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        //              "FROM m_trainings t " +
        //              "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        //              "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        //              "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        //              "ORDER BY ts.planned_start_date DESC";
        String sql = "SELECT r.emp_id AS empId, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        "FROM m_trainings t " +
        "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        "ORDER BY ts.planned_start_date DESC";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("empIds", empIds);
    
        return namedParameterJdbcTemplate.query(sql, parameters, new BeanPropertyRowMapper<>(TrainingHistoryDTO.class));
    }
    
}
