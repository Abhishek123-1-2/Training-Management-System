package com.mindcraft.in.Services.Trainer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.mindcraft.in.Pojos.Trainer.TrainingDetails;

@Repository
public class TrainingDetailsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<TrainingDetails> getCombinedTrainingDetails() {
        String query = "SELECT ts.training_id,ts.schedule_id,c.course, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
                       "FROM m_trainings c " +
                       "JOIN training_schedule ts ON c.training_id = ts.training_id";

        return jdbcTemplate.query(query, (resultSet, rowNum) -> {
            TrainingDetails details = new TrainingDetails();
            //newly added
            details.setScheduleId(resultSet.getLong("schedule_id"));
            details.setTrainingId(resultSet.getLong("training_id"));

            details.setCourse(resultSet.getString("course"));
            details.setPlannedStartDate(resultSet.getDate("planned_start_date"));
            details.setPlannedEndDate(resultSet.getDate("planned_end_date"));
            details.setTrainingStatus(resultSet.getString("training_status"));
            return details;
        });
    }

public List<TrainingDetails> getCompletedTrainingDetails() {  //ar.attendance_id,
        String query = "SELECT ts.training_id,ts.schedule_id,c.course, ts.planned_start_date, ts.planned_end_date, ts.training_status " +
                       "FROM m_trainings c " +
                       " JOIN training_schedule ts ON c.training_id = ts.training_id" +
                      // " JOIN attendance_register ar ON ts.schedule_id = ar.schedule_id" +
                       " WHERE ts.training_status = 'Completed' or  ts.training_status = 'COMPLETED'";

        return jdbcTemplate.query(query, (resultSet, rowNum) -> {
            TrainingDetails details = new TrainingDetails();
            //newly added
            //details.setAttendanceId(resultSet.getLong("attendance_id"));
           
            details.setTrainingId(resultSet.getLong("training_id"));
             details.setScheduleId(resultSet.getLong("schedule_id"));
            details.setCourse(resultSet.getString("course"));
            details.setPlannedStartDate(resultSet.getDate("planned_start_date"));
            details.setPlannedEndDate(resultSet.getDate("planned_end_date"));
            details.setTrainingStatus(resultSet.getString("training_status"));
            return details;
        });
    }

}

