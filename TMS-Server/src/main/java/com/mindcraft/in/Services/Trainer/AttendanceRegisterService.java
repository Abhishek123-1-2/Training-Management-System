package com.mindcraft.in.Services.Trainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Trainer.AttendanceRegister;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceRegisterService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AttendanceRegisterService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveAttendance(AttendanceRegister attendanceRegister) {
        String sql = "INSERT INTO attendance_register (schedule_id, emp_id, attendance_date, attendance_comments, active_yn, created_by, created_on, updated_by, updated_on) " +
                "VALUES (?, ?, ?, ?, 'Y', ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)";
        jdbcTemplate.update(sql, attendanceRegister.getScheduleId(), attendanceRegister.getEmpId(),
                attendanceRegister.getAttendanceDate(), attendanceRegister.getAttendanceComments(),
                attendanceRegister.getCreatedBy(), attendanceRegister.getUpdatedBy());
    }

    public List<AttendanceRegister> getAttendanceByScheduleIdAndEmpId(Long scheduleId, Long empId) {
        String sql = "SELECT * FROM attendance_register WHERE schedule_id = ? AND emp_id = ?";
        return jdbcTemplate.query(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement preparedStatement) throws SQLException {
                preparedStatement.setLong(1, scheduleId);
                preparedStatement.setLong(2, empId);
            }
        }, new RowMapper<AttendanceRegister>() {
            @Override
            public AttendanceRegister mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new AttendanceRegister(
                        rs.getLong("attendance_id"),
                        rs.getLong("schedule_id"),
                        rs.getLong("emp_id"),
                        rs.getObject("attendance_date", LocalDate.class),
                        rs.getString("attendance_comments"),
                        rs.getString("active_yn"),
                        rs.getString("created_by"),
                        rs.getString("updated_by"),
                        rs.getObject("created_on", LocalDate.class),
                        rs.getObject("updated_on", LocalDate.class)
                );
            }
        });
    }

    // Other methods...
}





