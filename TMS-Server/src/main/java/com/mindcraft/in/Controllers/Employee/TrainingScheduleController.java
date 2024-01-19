    package com.mindcraft.in.Controllers.Employee;

import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;
import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;
import com.mindcraft.in.Services.Employee.TrainingScheduleService;
import com.mindcraft.in.Services.Trainer.TrainingsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/training-views/schedule-list")
public class TrainingScheduleController {
    
    private final TrainingScheduleService trainingScheduleService;
    private final TrainingsService trainingsService;

    @Autowired
    public TrainingScheduleController(TrainingScheduleService trainingScheduleService, TrainingsService trainingsService) {
        this.trainingScheduleService = trainingScheduleService;
        this.trainingsService = trainingsService;
    }

    @GetMapping("/PRE-DEFINED/{empId}")
    public List<TrainingScheduleDTO> getPreDefinedTrainingSchedules(@PathVariable String empId) {
        return trainingScheduleService.getPreDefinedTrainingSchedules(empId);
    }

    @GetMapping("/ON-REQUEST/{empId}")
    public List<TrainingScheduleDTO> getOnRequestTrainingSchedules(@PathVariable String empId) {
        return trainingScheduleService.getOnRequestTrainingSchedules(empId);
    }

    @GetMapping("/EXTERNAL/{empId}")
    public List<TrainingScheduleDTO> getExternalCourseTrainings(@PathVariable String empId) {
        return trainingScheduleService.getExternalCourseTrainings(empId);
    }

    @GetMapping("/schedule")
    public List<TrainingScheduleDTO> getTrainings() {
        return trainingScheduleService.getTrainings();
    }

    // @GetMapping("/{empName}")
    // public List<TrainingsDTO> getTrainingsByTrainerName(@PathVariable String empName) {
    //     return trainingsService.getTrainingsByTrainerName(empName);
    // }
    // TrainingsController.java

@GetMapping("/{trainerName}/{empName}")
public ResponseEntity<List<TrainingsDTO>> getTrainingsByTrainerAndEmpName(@PathVariable String trainerName, @PathVariable String empName) {
    List<TrainingsDTO> trainings = trainingsService.getTrainingsByTrainerAndEmpName(trainerName, empName);
    return ResponseEntity.ok(trainings);
}

}
