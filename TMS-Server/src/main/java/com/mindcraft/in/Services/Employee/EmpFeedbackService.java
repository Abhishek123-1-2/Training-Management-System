// // package com.mindcraft.in.Services.Employee;

// // import java.util.List;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.jdbc.core.BeanPropertyRowMapper;
// // import org.springframework.jdbc.core.JdbcTemplate;

// // import com.mindcraft.in.Pojos.Employee.EmpFeedbackDTO;

// // public class EmpFeedbackService {

// //     private final JdbcTemplate jdbcTemplate;

// //     public EmpFeedbackService(JdbcTemplate jdbcTemplate) {
// //         this.jdbcTemplate = jdbcTemplate;
// //     }

// //     public void saveEmpFeedback(EmpFeedbackDTO empFeedback) {
        
// //         String sql = "INSERT INTO feedback ( emp_id, schedule_id, attendance_id," +
// //         "feedback_parameters_11, feedback_paramters_12, feedback_parameters_13, feedback_parameters_14, feedback_paramters_15," +
// //         "feedback_comments_employee, feedback_type) " +
// //         "VALUES (?,?,?,?,?,?,?,?,?,?)";

// //          jdbcTemplate.update(sql,
// //                 empFeedback.getAttendanceId(),
// //                 empFeedback.getEmpId(),
// //                 empFeedback.getScheduleId(),
// //                 empFeedback.getAttendanceId(),
// //                 empFeedback.getEffectiveness(),
// //                 empFeedback.getContent(),
// //                 empFeedback.getMethodology(),
// //                 empFeedback.getOrganization(),
// //                 empFeedback.getTrainer_rating(),
// //                 empFeedback.getCommentsFromEmployee(),
// //                 empFeedback.getFeedback_type()
// //                 );
// //     }

// // }


// package com.mindcraft.in.Services.Employee;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// import com.mindcraft.in.Pojos.Employee.EmpFeedbackDTO;

// @Service
// public class EmpFeedbackService {

//     private final JdbcTemplate jdbcTemplate;

//     @Autowired
//     public EmpFeedbackService(JdbcTemplate jdbcTemplate) {
//         this.jdbcTemplate = jdbcTemplate;
//     }

//     public int saveEmpFeedback(EmpFeedbackDTO empFeedback) {

//         String sql = "INSERT INTO feedback (emp_id, schedule_id, attendance_id, " +
//                      "feedback_parameters_11, feedback_parameters_12, feedback_parameters_13, " +
//                      "feedback_parameters_14, feedback_parameters_15, feedback_comments_employee, " +
//                      "feedback_type) " +
//                      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//         return jdbcTemplate.update(sql, empFeedback.getEmpId(), empFeedback.getScheduleId(),
//                                    empFeedback.getAttendanceId(), empFeedback.getEffectiveness(),
//                                    empFeedback.getContent(), empFeedback.getMethodology(),
//                                    empFeedback.getOrganization(), empFeedback.getTrainer_rating(),
//                                    empFeedback.getCommentsFromEmployee(), empFeedback.getFeedback_type());
//     }
// }

