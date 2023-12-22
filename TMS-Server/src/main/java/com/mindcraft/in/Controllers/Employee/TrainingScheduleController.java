package com.mindcraft.in.Controllers.Employee;

import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;
import com.mindcraft.in.Services.Employee.TrainingScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/training-views/schedule-list")
public class TrainingScheduleController {
    
    private final TrainingScheduleService trainingScheduleService;

    @Autowired
    public TrainingScheduleController(TrainingScheduleService trainingScheduleService) {
        this.trainingScheduleService = trainingScheduleService;
    }

    @GetMapping("/PRE-DEFINED")
    public List<TrainingSchedule> getPreDefinedTrainingSchedules() {
        return trainingScheduleService.getPreDefinedTrainingSchedules();
    }

    @GetMapping("/ON-REQUEST")
    public List<TrainingSchedule> getOnRequestTrainingSchedules() {
        return trainingScheduleService.getOnRequestTrainingSchedules();
    }

    @GetMapping("/schedule")
    public List<TrainingScheduleDTO> getTrainings() {
        return trainingScheduleService.getTrainings();
    }
}
