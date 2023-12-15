package com.mindcraft.in.Services.Admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Admin.Participant;

@Service
public class ParticipantService 
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ParticipantService(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllParticipants()
    {
        String sql = "select * from registration";
        return jdbcTemplate.queryForList(sql);
    }
    
    public void addParticipants(Participant participant)
    {
        String sql = "Insert into registration(registration_id, schedule_id, training_id, emp_id, registration_date, registration_comments, registration_status, registration_response)" + "Values(?,?,?,?,?,?,?,?)";
        
       jdbcTemplate.update(sql, 
           participant.getRegistration_id(),
           participant.getSchedule_id(),
           participant.getTraining_id(),
           participant.getEmp_id(),
           participant.getRegistration_date(),
           participant.getRegistration_comments(),
           participant.getRegistration_status(),
           participant.getRegistration_response()


        );
    
    }
}
