package com.mindcraft.in.Controllers;


import com.mindcraft.in.Pojos.TrainingSchedule;
import com.mindcraft.in.Pojos.TrainingView;
import com.mindcraft.in.Services.TrainingViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-views")
public class TrainingViewController {

    private final TrainingViewService trainingViewService;

    @Autowired
    public TrainingViewController(TrainingViewService trainingViewService) {
        this.trainingViewService = trainingViewService;
    }

    @PostMapping
    public void createTrainingView(@RequestBody TrainingView trainingView) {
        trainingViewService.insertTrainingView(trainingView);
    }

    @GetMapping
    public List<TrainingView> getAllTrainingViews() {
        return trainingViewService.getAllTrainingViews();
    }
    @GetMapping("/trainer-names")
    public List<String> getTrainerNames() {
    return trainingViewService.getTrainerNames();
    }
    // Inside TrainingViewController.java

@PostMapping("/schedule")
public void scheduleTraining(@RequestBody TrainingSchedule request) {
    // You can add validation and error handling as needed
    
    // Assuming you have a method to get the training_id based on the trainer's name
    Long trainingId = trainingViewService.getTrainingIdByTrainerName(request.getTrainerName());

    // Now, insert the data into the training_schedule table
    trainingViewService.scheduleTraining(trainingId, request);
}
@GetMapping("/trainer-id")
    public ResponseEntity<Long> getTrainingIdByTrainerName(@RequestParam String name) {
        Long trainingId = trainingViewService.getTrainingIdByTrainerName(name);

        if (trainingId != null) {
            return new ResponseEntity<>(trainingId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add other endpoints as needed...
}
