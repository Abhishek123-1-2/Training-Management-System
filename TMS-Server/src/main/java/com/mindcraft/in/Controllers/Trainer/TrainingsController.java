package com.mindcraft.in.Controllers.Trainer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;
import com.mindcraft.in.Services.Trainer.TrainingsService;

@RestController
@RequestMapping("/api/training-history")
public class TrainingsController {

    private final TrainingsService trainingsService;

    @Autowired
    public TrainingsController(TrainingsService trainingsService) {
        this.trainingsService = trainingsService;
    }

    @GetMapping("/trainer/{empName}")
    public List<TrainingsDTO> getTrainingsByTrainerName(@PathVariable String empName) {
        return trainingsService.getTrainingsByTrainerName(empName);
    }
}
