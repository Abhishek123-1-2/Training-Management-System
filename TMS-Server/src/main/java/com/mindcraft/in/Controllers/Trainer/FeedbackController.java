package com.mindcraft.in.Controllers.Trainer;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Trainer.FeedbackDTO;
import com.mindcraft.in.Services.Trainer.FeedbackService;

@RestController
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }



    @PostMapping("/api/feedback")
    public ResponseEntity<String> saveFeedback(@RequestBody FeedbackDTO feedbackDTO

    ) {
        try {
          
            
            feedbackDTO.setCreated_by("Trainer"); // Set creation timestamp
            feedbackDTO.setUpdated_by("Trainer");
            feedbackDTO.setFeedback_type("Trainer_Feedback");
            feedbackDTO.setCreated_on(new Timestamp(System.currentTimeMillis())); // Set creation timestamp
            feedbackDTO.setUpdated_on(new Timestamp(System.currentTimeMillis())); // Set updated timestamp
            feedbackDTO.setActive_yn('Y'); // Set active status

            feedbackService.saveFeedback(feedbackDTO);
            return new ResponseEntity<>("Feedback saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save feedback: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/feedback/retrieve")
    public ResponseEntity<List<FeedbackDTO>> retrieveFeedbackData() {
        try {
            List<FeedbackDTO> feedbackData = feedbackService.retrieveFeedbackData();
            return new ResponseEntity<>(feedbackData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
//     @GetMapping("/api/feedback/retrieve/{empId}/{courseName}")
// public ResponseEntity<List<FeedbackDTO>> retrieveFeedbackDataForEmployeeAndCourse(
//         @PathVariable int empId,
//         @PathVariable String courseName
// ) {
//     try {
//         List<FeedbackDTO> feedbackData = feedbackService.retrieveFeedbackDataForEmployeeAndCourse(empId, courseName);
//         return new ResponseEntity<>(feedbackData, HttpStatus.OK);
//     } catch (Exception e) {
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }
// @GetMapping("/retrieve/{empCode}/{courseName}")
//     public ResponseEntity<List<FeedbackDTO>> retrieveFeedbackDataForEmployeeAndCourse(
//             @PathVariable String empCode,
//             @PathVariable String courseName
//     ) {
//         try {
//             List<FeedbackDTO> feedbackData = feedbackService.retrieveFeedbackDataForEmployeeAndCourse(empCode, courseName);
//             return new ResponseEntity<>(feedbackData, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

@GetMapping("/api/feedback/retrieve/{empCode}/{courseName}")
public ResponseEntity<List<FeedbackDTO>> retrieveFeedbackDataForEmployeeAndCourse(
        @PathVariable String empCode,
        @PathVariable String courseName
) {
    try {
        List<FeedbackDTO> feedbackData = feedbackService.retrieveFeedbackDataForEmployeeAndCourse(empCode, courseName);
        return new ResponseEntity<>(feedbackData, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}


