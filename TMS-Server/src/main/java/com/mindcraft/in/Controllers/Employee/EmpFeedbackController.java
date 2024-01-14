package com.mindcraft.in.Controllers.Employee;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
            empFeedbackDTO.setFeedbackType("Employee Feedback");
            empFeedbackService.saveFeedback(empFeedbackDTO);
            return new ResponseEntity<>("Feedback saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save feedback: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("all-feedback")
public ResponseEntity<List<EmpFeedbackDTO>> getAllFeedback() {
    try {
        List<EmpFeedbackDTO> feedbackList = empFeedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbackList);
    } catch (Exception e) {
        // Log the exception details for debugging purposes
        e.printStackTrace();

        // Return internal server error response with details
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}

    
}
