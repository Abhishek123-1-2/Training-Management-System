package com.mindcraft.in.Services.Trainer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;

@Service
public class TrainingsServiceImpl implements TrainingsService{
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrainingsServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    // public List<TrainingsDTO> getTrainingsByTrainerName(String empName) {
    //     // String sql = "SELECT t.training_id, t.schedule_id, t.course, t.planned_start_date, t.planned_end_date, t.training_status " +
    //     //              "FROM training_schedule t " +
    //     //              "JOIN m_trainings mt ON t.training_id = mt.training_id" + 
    //     //              "WHERE t.trainer_name = ?";

    //     String sql = "SELECT t.training_id, t.schedule_id, t.trainer_name, mt.course, t.planned_start_date, t.planned_end_date, t.training_status " +
    //          "FROM training_schedule t " +
    //          "JOIN m_trainings mt ON t.training_id = mt.training_id " + 
    //          "WHERE t.trainer_name LIKE ?";

    //     return jdbcTemplate.query(sql, new Object[]{"%" + empName + "%"}, new BeanPropertyRowMapper<>(TrainingsDTO.class));
    // }
    // public List<TrainingsDTO> getTrainingsByTrainerName(String empName) {
    //     String sql = "SELECT t.training_id, t.schedule_id, t.trainer_name, mt.course, t.planned_start_date, t.planned_end_date, t.training_status " +
    //                  "FROM training_schedule t " +
    //                  "JOIN m_trainings mt ON t.training_id = mt.training_id " +
    //                  "WHERE t.trainer_name LIKE ?";

    //     return jdbcTemplate.query(sql, new Object[]{"%" + empName + "%"}, new BeanPropertyRowMapper<>(TrainingsDTO.class));
    // }
    // public List<TrainingsDTO> getTrainingsByTrainerAndEmpName(String trainerName, String empName) {
    //     String sql = "SELECT t.training_id, t.schedule_id, t.trainer_name, mt.course, t.planned_start_date, t.planned_end_date, t.training_status " +
    //                  "FROM training_schedule t " +
    //                  "JOIN m_trainings mt ON t.training_id = mt.training_id " +
    //                  "WHERE t.trainer_name LIKE ? AND t.emp_name LIKE ?";
    
    //     return jdbcTemplate.query(sql, new Object[]{"%" + trainerName + "%", "%" + empName + "%"}, new BeanPropertyRowMapper<>(TrainingsDTO.class));
    // }
    // public List<TrainingsDTO> getTrainingsByTrainerAndEmpName(String trainerName, String empName) {
    //     String sql = "SELECT t.training_id, t.schedule_id, t.trainer_name, mt.course, t.planned_start_date, t.planned_end_date, t.training_status " +
    //                  "FROM training_schedule t " +
    //                  "JOIN m_trainings mt ON t.training_id = mt.training_id " + 
    //                  "WHERE t.trainer_name LIKE ? AND t.trainer_name LIKE ?";
    
    //     return jdbcTemplate.query(sql, new Object[]{"%" + trainerName + "%", "%" + empName + "%"}, new BeanPropertyRowMapper<>(TrainingsDTO.class));
    // }
    public List<TrainingsDTO> getTrainingsByTrainerAndEmpName(String trainerName, String empName) {
        String sql = "SELECT t.training_id, t.schedule_id, t.trainer_name, mt.course, t.planned_start_date, t.planned_end_date, t.training_status " +
                     "FROM training_schedule t " +
                     "JOIN m_trainings mt ON t.training_id = mt.training_id " + 
                     "WHERE t.trainer_name LIKE ? AND t.trainer_name LIKE ? AND t.training_status = 'Completed'";
        
        return jdbcTemplate.query(sql, new Object[]{"%" + trainerName + "%", "%" + empName + "%"}, new BeanPropertyRowMapper<>(TrainingsDTO.class));
    }
    
}
