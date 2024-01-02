package com.mindcraft.in.Controllers.Trainer;

import java.sql.Timestamp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}


