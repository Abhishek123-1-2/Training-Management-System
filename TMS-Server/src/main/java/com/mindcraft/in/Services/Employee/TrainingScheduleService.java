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
                 "e.emp_id, r.registration_status  " +  // Include emp_id from m_employee table
                 "FROM m_trainings t " +
                 "JOIN training_schedule ts ON t.training_id = ts.training_id " +
                 "JOIN registration r on t.training_id = r.training_id " +
                 "JOIN m_employee e ON t.username = e.emp_code";
        
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TrainingScheduleDTO.class));
    }

        public List<TrainingScheduleDTO> getPreDefinedTrainingSchedules(String empId) {

        // String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, t.trainer_names, t.prerequisites, " +
        //     "t.course_description, t.daily_hrs, t.total_days, t.url, t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, " +
        //     "ts.planned_end_date, ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, ts.from_time, " +
        //     "ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on, r.registration_status, r.registration_response, r.emp_id " +
        //     "FROM m_trainings t " +
        //     "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        //     "LEFT JOIN registration r ON t.training_id = r.training_id " +
        //     "WHERE t.training_schedule = 'PRE-DEFINED' AND ts.training_status = 'Upcoming' " +
        //     "AND r.emp_id = COALESCE(CAST(? AS BIGINT), r.emp_id) " +
        //     "GROUP BY t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, t.trainer_names, t.prerequisites, " +
        //     "t.course_description, t.daily_hrs, t.total_days, t.url, t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, " +
        //     "ts.planned_end_date, ts.actual_start_date, ts.actual_end_date, ts.training_status, ts.active_yn, ts.from_time, ts.to_time, " +
        //     "ts.created_by, ts.created_on, ts.updated_by, ts.updated_on, r.registration_status, r.registration_response, r.emp_id " +
        //     "ORDER BY ts.planned_start_date DESC";

        String sql = "SELECT t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, t.trainer_names, t.prerequisites, " +
        "t.course_description, t.daily_hrs, t.total_days, t.url, t.username, t.password, ts.schedule_id, ts.trainer_name, ts.planned_start_date, " +
        "ts.planned_end_date, ts.actual_start_date, ts.actual_end_date, ts.training_status, CAST(ts.active_yn AS CHAR) AS active_yn, ts.from_time, " +
        "ts.to_time, ts.created_by, ts.created_on, ts.updated_by, ts.updated_on, r.registration_status, r.registration_response, r.emp_id " +
        "FROM m_trainings t " +
        "JOIN training_schedule ts ON t.training_id = ts.training_id " +
        "LEFT JOIN registration r ON t.training_id = r.training_id AND r.emp_id = COALESCE(CAST(? AS BIGINT)) " +
        "WHERE t.training_schedule = 'PRE-DEFINED' AND ts.training_status = 'Upcoming' " +
        "ORDER BY ts.planned_start_date DESC";




        return jdbcTemplate.query(sql, new Object[]{Long.parseLong(empId)} ,new BeanPropertyRowMapper<>(TrainingScheduleDTO.class));
    }


        public List<TrainingScheduleDTO> getOnRequestTrainingSchedules(String empId) {

        String sql = "SELECT " +
    "t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, t.trainer_names, t.prerequisites, " +
    "t.course_description, t.daily_hrs, t.total_days, t.url, t.username, t.password, " +
    "MAX(ts.schedule_id) AS schedule_id, MAX(ts.trainer_name) AS trainer_name, " +
    "MAX(ts.planned_start_date) AS planned_start_date, MAX(ts.planned_end_date) AS planned_end_date, " +
    "MAX(ts.actual_start_date) AS actual_start_date, MAX(ts.actual_end_date) AS actual_end_date, " +
    "MAX(ts.training_status) AS training_status, MAX(CAST(ts.active_yn AS CHAR)) AS active_yn, " +
    "MAX(ts.from_time) AS from_time, MAX(ts.to_time) AS to_time, MAX(ts.created_by) AS created_by, " +
    "MAX(ts.created_on) AS created_on, MAX(ts.updated_by) AS updated_by, MAX(ts.updated_on) AS updated_on, " +
    "MAX(r.registration_status) AS registration_status, MAX(r.emp_id) AS emp_id " +
    "FROM " +
    "m_trainings t " +
    "JOIN " +
    "training_schedule ts ON t.training_id = ts.training_id " +
    "LEFT JOIN " +
    "registration r ON t.training_id = r.training_id AND r.emp_id = COALESCE(CAST(? AS BIGINT))" +
    "WHERE " +
    "t.training_schedule = 'ON-REQUEST' AND ts.training_status = 'Upcoming' " +
    "GROUP BY " +
    "t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, t.trainer_names, t.prerequisites, " +
    "t.course_description, t.daily_hrs, t.total_days, t.url, t.username, t.password " +
    "ORDER BY " +
    "MAX(ts.planned_start_date) DESC";
        
            return jdbcTemplate.query(sql, new Object[]{Long.parseLong(empId)} ,new BeanPropertyRowMapper<>(TrainingScheduleDTO.class));
        }

        public List<TrainingScheduleDTO> getExternalCourseTrainings(String empId) {
            
            String sql = "SELECT " +
            "t.training_id, t.training_category, t.training_type, t.training_schedule, t.course, " +
            "t.url, t.username, t.password, r.registration_status, r.emp_id " +
            "FROM m_trainings t " +
            "LEFT JOIN registration r ON t.training_id = r.training_id AND r.emp_id = COALESCE(CAST(? AS BIGINT)) " +
            "WHERE t.training_schedule = 'ON-REQUEST' ";

            return jdbcTemplate.query(sql, new Object[]{Long.parseLong(empId)}, new BeanPropertyRowMapper<>(TrainingScheduleDTO.class));

        }

}
