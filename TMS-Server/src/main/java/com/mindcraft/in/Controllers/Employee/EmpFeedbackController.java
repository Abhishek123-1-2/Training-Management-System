// package com.mindcraft.in.Controllers.Employee;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.mindcraft.in.Pojos.Employee.EmpFeedbackDTO;
// import com.mindcraft.in.Services.Employee.EmpFeedbackService;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;



// @RestController
// @RequestMapping("/api/completed-courses")
// public class EmpFeedbackController {
    
//     private final EmpFeedbackService empFeedbackService;

//     @Autowired
//     public EmpFeedbackController(EmpFeedbackService empFeedbackService) {
//         this.empFeedbackService = empFeedbackService;
//     }

//     @PostMapping("/feedback")
//     public ResponseEntity<String> submitFeedback(@RequestBody EmpFeedbackDTO empFeedbackDTO) {
//         int rowsAffected = empFeedbackService.saveEmpFeedback(empFeedbackDTO);
        
//         if (rowsAffected > 0) {
//             return new ResponseEntity<>("Feedback submitted successfully", HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>("Failed to submit feedback", HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
    
// }
