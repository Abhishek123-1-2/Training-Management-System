package com.mindcraft.in.Controllers.Employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Employee.TrainingHistoryDTO;
import com.mindcraft.in.Services.Employee.TrainingHistoryService;

@RestController
@RequestMapping("/api/training-history")
public class TrainingHistoryController {
    
    private final TrainingHistoryService trainingHistoryService;

    @Autowired
    public TrainingHistoryController(TrainingHistoryService trainingHistoryService) {
        this.trainingHistoryService = trainingHistoryService;
    }

    @GetMapping("/employee/{empId}")
    public List<TrainingHistoryDTO> getTrainingHistoryByEmpId(@PathVariable String empId) {
        return trainingHistoryService.getTrainingHistoryByEmpId(empId);
    }
}
