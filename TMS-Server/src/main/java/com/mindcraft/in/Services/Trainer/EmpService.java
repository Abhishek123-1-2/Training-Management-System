package com.mindcraft.in.Services.Trainer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.mindcraft.in.Pojos.Trainer.EmpDetails;

@Service
public class EmpService {

    private  JdbcTemplate jdbcTemplate;

    @Autowired
    public EmpService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public List<EmpDetails> getEmployeesByCourse(String course) {
String sql = " SELECT e.emp_id,r.schedule_id,e.emp_code, e.emp_name, t.planned_start_date, t.planned_end_date, t.training_status " +
                "FROM registration r " +
                "JOIN m_employee e ON e.emp_id = r.emp_id " +
                "JOIN training_schedule t ON r.schedule_id = t.schedule_id " +
                "JOIN m_trainings c ON c.training_id = t.training_id " +
                "WHERE (t.training_status = 'Completed' or t.training_status = 'COMPLETED' ) AND c.course = ?";


        return jdbcTemplate.query(sql,preparedStatement -> preparedStatement.setString(1, course) ,new EmployeeDetailsMapper());
    }

    private static class EmployeeDetailsMapper implements RowMapper<EmpDetails> {
        @Override
        public EmpDetails mapRow(ResultSet resultSet, int i) throws SQLException {
            EmpDetails employee = new EmpDetails();
            employee.setEmpId(resultSet.getLong("emp_id"));
            employee.setScheduleId(resultSet.getLong("schedule_id"));
            employee.setEmpCode(resultSet.getString("emp_code"));
            employee.setEmpName(resultSet.getString("emp_name"));
            employee.setPlannedStartDate(resultSet.getDate("planned_start_date"));
            employee.setPlannedEndDate(resultSet.getDate("planned_end_date"));
            employee.setStatus(resultSet.getString("training_status"));
            return employee;
        }
    }

}


//     public List<EmployeeDetails> getEmployeesByCourse(String course) {
//     // public List<EmployeeDetails> getCompletedTrainingEmployees() {
//         // String sql = "SELECT  e.emp_code, e.emp_name, t.planned_start_date, t.planned_end_date, t.training_status " +
//         //         "FROM registration r " +
//         //         "JOIN m_employee e ON e.emp_id = r.emp_id " +
//         //         "JOIN training_schedule t ON r.schedule_id = t.schedule_id " +
//         //         "WHERE t.training_status = 'Completed' or r.registration_status='confirmed' or r.registration_status='Confirmed' ";
//         String sql="SELECT e.emp_id, e.emp_code, e.emp_name, t.planned_start_date, t.planned_end_date, t.training_status "+ 
//         " FROM registration r "+
//         " JOIN m_employee e ON e.emp_id = r.emp_id "+
//         " JOIN training_schedule t ON r.schedule_id = t.schedule_id "+
//         " JOIN m_trainings c ON c.training_id = t.training_id " +
//         " WHERE (t.training_status = 'COMPLETED' or t.training_status = 'Completed') and c.course= ?";
//         // return jdbcTemplate.query(sql, new Object[]{course}, new EmployeeDetailsMapper());
//         return jdbcTemplate.query(new PreparedStatementCreator() {
//         @Override
//         public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
//             PreparedStatement preparedStatement = connection.prepareStatement(sql);
//             preparedStatement.setString(1, course);
//             return preparedStatement;
//         }
//     },
// new ResultSetExtractor<List<EmployeeDetails>>() {
//             @Override
//     public List<EmployeeDetails> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
//             List<EmployeeDetails> employees = new ArrayList<>();
//             while(resultSet.next()){
//             EmployeeDetails employee = new EmployeeDetails();
//             employee.setEmpCode(resultSet.getString("emp_code"));
//             employee.setEmpName(resultSet.getString("emp_name"));
//             employee.setPlannedStartDate(resultSet.getDate("planned_start_date"));
//             employee.setPlannedEndDate(resultSet.getDate("planned_end_date"));
//             employee.setStatus(resultSet.getString("training_status"));
//             employees.add(employee);
//             }
//             return employees;
//             }
//     });
     
//     // return jdbcTemplate.query(sql, (resultSet, i) -> {
//     // return jdbcTemplate.query(sql, new MapSqlParameterSource("course", course), (resultSet, i) -> {
//     //         EmployeeDetails employee = new EmployeeDetails();
//     //         // employee.setEmpId(resultSet.getLong("emp_id"));
//     //         employee.setEmpCode(resultSet.getString("emp_code"));
//     //         employee.setEmpName(resultSet.getString("emp_name"));
//     //         employee.setPlannedStartDate(resultSet.getDate("planned_start_date"));
//     //         employee.setPlannedEndDate(resultSet.getDate("planned_end_date"));
//     //         employee.setStatus(resultSet.getString("training_status"));
//     //         return employee;
//     //     });
//     // }
// }

// }







