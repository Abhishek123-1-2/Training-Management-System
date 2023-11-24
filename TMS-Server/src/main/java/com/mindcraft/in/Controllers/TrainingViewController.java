package com.mindcraft.in.Controllers;

import com.mindcraft.in.Pojos.TrainingView;
import com.mindcraft.in.Services.TrainingViewService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Add other endpoints as needed...
}
