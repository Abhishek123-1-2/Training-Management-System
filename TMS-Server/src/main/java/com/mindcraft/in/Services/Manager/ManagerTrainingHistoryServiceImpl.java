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
        // String sql = "SELECT r.emp_id AS empId, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        //              "FROM m_trainings t " +
        //              "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        //              "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        //              "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        //              "ORDER BY ts.planned_start_date DESC";
        // String sql = "SELECT r.emp_id AS empId, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "FROM m_trainings t " +
        // "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY ts.planned_start_date DESC";
        // String sql = "SELECT " +
        // "t.course, " +
        // "ts.trainer_name, " +
        // "ts.planned_start_date, " +
        // "ts.planned_end_date, " +
        // "ts.training_status " +
        // "FROM " +
        // "(SELECT DISTINCT course, training_id FROM m_trainings) t " +
        // "JOIN " +
        // "training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN " +
        // "registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE " +
        // "r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY " +
        // "ts.planned_start_date DESC";
        String sql = "SELECT " +
        "t.course, " +
        "ts.trainer_name, " +
        "ts.planned_start_date, " +
        "ts.planned_end_date, " +
        "ts.training_status " +
        "FROM " +
        "m_trainings t " +
        "JOIN " +
        "training_schedule ts ON t.training_id = ts.training_id " +
        "JOIN " +
        "registration r ON ts.schedule_id = r.schedule_id " +
        "WHERE " +
        "r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        "GROUP BY " +
        "t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        "ORDER BY " +
        "ts.planned_start_date DESC";
    
        // String sql = "SELECT r.emp_id AS empId, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "FROM m_trainings t " +
        // "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY ts.planned_start_date DESC";
        // String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        //       "FROM m_trainings t " +
        //       "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        //       "WHERE t.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        //       "ORDER BY ts.planned_start_date DESC";
        // String sql = "SELECT t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "FROM m_trainings t " +
        // "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN m_employee e ON t.emp_id = e.emp_id " +
        // "WHERE e.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY ts.planned_start_date DESC";

        // String sql = "SELECT r.emp_id AS empId, t.course, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
        // "FROM m_trainings t " +
        // "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY ts.planned_start_date DESC";
        // String sql = "SELECT DISTINCT " +
        // "r.emp_id AS empId, " +
        // "t.course, " +
        // "ts.trainer_name, " +
        // "ts.planned_start_date, " +
        // "ts.planned_end_date, " +
        // "ts.training_status " +
        // "FROM " +
        // "m_trainings t " +
        // "JOIN " +
        // "training_schedule ts ON t.training_id = ts.training_id " +
        // "JOIN " +
        // "registration r ON ts.schedule_id = r.schedule_id " +
        // "WHERE " +
        // "r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        // "ORDER BY " +
        // "ts.planned_start_date DESC";
        // String sql = "SELECT " +
        //         "r.emp_id AS empId, " +
        //         "t.course, " +
        //         "MIN(ts.trainer_name) AS trainerName, " +
        //         "MIN(ts.planned_start_date) AS plannedStartDate, " +
        //         "MAX(ts.planned_end_date) AS plannedEndDate, " +
        //         "ts.training_status " +
        //         "FROM " +
        //         "m_trainings t " +
        //         "JOIN " +
        //         "training_schedule ts ON t.training_id = ts.training_id " +
        //         "JOIN " +
        //         "registration r ON ts.schedule_id = r.schedule_id " +
        //         "WHERE " +
        //         "r.emp_id IN (:empIds) AND ts.training_status = 'Completed' " +
        //         "GROUP BY r.emp_id, t.course, ts.training_status " +
        //         "ORDER BY " +
        //         "MIN(ts.planned_start_date) DESC";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("empIds", empIds);
    
        return namedParameterJdbcTemplate.query(sql, parameters, new BeanPropertyRowMapper<>(TrainingHistoryDTO.class));
    }
    
}
