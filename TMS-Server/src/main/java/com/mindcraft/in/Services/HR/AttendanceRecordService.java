package com.mindcraft.in.Services.HR;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.HR.AttendanceRecord;

@Service
public class AttendanceRecordService 
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AttendanceRecordService(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    } 


    public List<Map<String, Object>> getAllAttendance()
    {
        String sql = "SELECT e.emp_code, e.emp_name, t.course, t.trainer_names, ts.planned_start_date, ts.planned_end_date " +
                     "FROM m_employee e " +
                     "JOIN m_trainings t ON e.emp_code = t.emp_code " +
                     "JOIN training_schedule ts ON t.training_id = ts.training_id";

        return jdbcTemplate.queryForList(sql);
    }
    
}
