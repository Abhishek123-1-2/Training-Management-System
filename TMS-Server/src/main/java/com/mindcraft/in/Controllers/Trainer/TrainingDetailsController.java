package com.mindcraft.in.Controllers.Trainer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Trainer.TrainingDetails;
import com.mindcraft.in.Services.Trainer.TrainingDetailsRepository;

@RestController
@RequestMapping("/api/training-details")
public class TrainingDetailsController {
    
    @Autowired
    private TrainingDetailsRepository trainingDetailsRepository;

    // @GetMapping("/combined")
    // public ResponseEntity<List<TrainingDetails>> getTrainingDetails() {
    //     List<TrainingDetails> trainingDetails = trainingDetailsRepository.getCombinedTrainingDetails();
    //     return new ResponseEntity<>(trainingDetails, HttpStatus.OK);
    // }

    @GetMapping("/combined")
    public List<TrainingDetails> getCombinedTrainingDetails() {
        return trainingDetailsRepository.getCombinedTrainingDetails();
    }

    @GetMapping("/completed")
    public List<TrainingDetails> getCompletedTrainingDetails() {
        return trainingDetailsRepository.getCompletedTrainingDetails();
    }
    
}

