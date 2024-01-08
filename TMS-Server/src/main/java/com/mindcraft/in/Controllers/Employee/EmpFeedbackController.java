package com.mindcraft.in.Controllers.Employee;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Employee.EmpFeedbackDTO;
import com.mindcraft.in.Services.Employee.EmpFeedbackService;

@RestController
@RequestMapping("/api/")
public class EmpFeedbackController {
    
    private final EmpFeedbackService empFeedbackService;

    public EmpFeedbackController(EmpFeedbackService empFeedbackService) {
        this.empFeedbackService = empFeedbackService;
    }

    @PostMapping("emp-feedback")
    public ResponseEntity<String> saveFeedback(@RequestBody EmpFeedbackDTO empFeedbackDTO) {
        try {
            empFeedbackDTO.setFeedback_type("Employee Feedback");
            empFeedbackService.saveFeedback(empFeedbackDTO);
            return new ResponseEntity<>("Feedback saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save feedback: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
