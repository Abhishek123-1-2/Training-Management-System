package com.mindcraft.in.Services.Employee;

import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Admin.TrainingViewDto;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingScheduleService {
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrainingScheduleService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
        public List<TrainingScheduleDTO> getTrainings() {
        // String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
        //              "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
        //              "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
        //              "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
        //              "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on " +
        //              "FROM m_trainings t " +
        //              "JOIN training_schedule ts ON t.training_id = ts.training_id";

        String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
                 "t.trainer_names, t.prerequisites, t.course_description, t.daily_hrs, t.total_days, t.url, " +
                 "t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, ts.planned_end_date, " +
                 "ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, " +
                 "ts.from_time, ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on, " +
                 "e.emp_id " +  // Include emp_id from m_employee table
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "JOIN m_employee e ON t.username = e.emp_code";
        
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingScheduleDTO.class));
    }

        public List<TrainingSchedule> getPreDefinedTrainingSchedules() {
           String sql = "SELECT training_id, trainer_name, planned_start_date, planned_end_date, training_status FROM training_schedule WHERE training_id = ? AND training_schedule = 'PRE-DEFINED'";

            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingSchedule.class));
        }

        public List<TrainingSchedule> getOnRequestTrainingSchedules() {
           String sql = "SELECT training_id, trainer_name, planned_start_date, planned_end_date, training_status FROM training_schedule WHERE training_id = ? AND training_schedule = 'ON-REQUEST'";

            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingSchedule.class));
        }

}
