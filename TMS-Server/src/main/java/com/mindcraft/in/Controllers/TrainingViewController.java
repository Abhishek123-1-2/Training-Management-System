package com.mindcraft.in.Controllers;


import com.mindcraft.in.Pojos.TrainingSchedule;
import com.mindcraft.in.Pojos.TrainingView;
import com.mindcraft.in.Pojos.TrainingViewDto;
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
//     @GetMapping("/training-id")
// public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
//     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

//     if (trainingId != null) {
//         return new ResponseEntity<>(trainingId, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
@GetMapping("/training-id")
public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
    Long trainingId = trainingViewService.getTrainingIdByCourse(course);

    if (trainingId != null) {
        return new ResponseEntity<>(trainingId, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
    @GetMapping("/courses")
    public List<String> getTrainingCourses() {
        return trainingViewService.getTrainingCourses();
    }
    // @GetMapping("/schedule")
    // public ResponseEntity<List<TrainingViewDto>> getTrainingSchedule() {
    //     try {
    //         List<TrainingViewDto> trainingViews = trainingViewService.getTrainingSchedule();
    //         return new ResponseEntity<>(trainingViews, HttpStatus.OK);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
//     @GetMapping("/schedule-list")
// public ResponseEntity<List<TrainingViewDto>> getTrainingScheduleList() {
//     try {
//         List<TrainingViewDto> scheduleList = trainingViewService.getTrainingSchedule();
//         return new ResponseEntity<>(scheduleList, HttpStatus.OK);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }
@GetMapping("/schedule-list")
public ResponseEntity<List<TrainingViewDto>> getTrainingScheduleList() {
    try {
        List<TrainingViewDto> scheduleList = trainingViewService.getTrainingSchedule();

        if (scheduleList != null) {
            return new ResponseEntity<>(scheduleList, HttpStatus.OK);
        } else {
            // Handle the case where scheduleList is null
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    } catch (Exception e) {
        e.printStackTrace();
        // Log the exception or handle it according to your application's needs
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    // @GetMapping("/scheduled-trainings")
    // public List<TrainingView> getAllScheduledTrainings() {
    //     return trainingViewService.getAllScheduledTrainings();
    // }

//     @GetMapping("/training-id")
// public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
//     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

//     if (trainingId != null) {
//         return new ResponseEntity<>(trainingId, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
// Inside TrainingViewController.java

@GetMapping("/courses-with-dates")
public List<String> getTrainingCoursesWithDates() {
    return trainingViewService.getTrainingCourses();
}
// @GetMapping("/scheduled-trainings")
//     public ResponseEntity<List<TrainingView>> getAllScheduledTrainings() {
//         try {
//             List<TrainingView> scheduledTrainings = trainingViewService.getAllScheduledTrainings();
//             return new ResponseEntity<>(scheduledTrainings, HttpStatus.OK);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// @GetMapping("/scheduled-trainings")
//     public List<TrainingView> getAllScheduledTrainings() {
//         return trainingViewService.getAllScheduledTrainings();
//     }
    @GetMapping("/training-details/{course}")
public ResponseEntity<TrainingView> getTrainingDetailsByCourse(@PathVariable String course) {
    TrainingView trainingDetails = trainingViewService.getTrainingDetailsByCourse(course);

    if (trainingDetails != null) {
        return new ResponseEntity<>(trainingDetails, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
// @PutMapping("/update-schedule")
// public ResponseEntity<String> updateTrainingSchedule(@RequestBody TrainingSchedule updatedSchedule) {
//     try {
//         // Assuming you have a method to update the training schedule
//         trainingViewService.updateTrainingSchedule(updatedSchedule);
//         return new ResponseEntity<>("Training schedule updated successfully", HttpStatus.OK);
//     } catch (Exception e) {
//         e.printStackTrace();
//         // Print the exception details to console
//         System.err.println("Error updating training schedule: " + e.getMessage());
//         return new ResponseEntity<>("Error updating training schedule", HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }
@PutMapping("/update-schedule")
public ResponseEntity<String> updateTrainingSchedule(@RequestBody TrainingSchedule updatedSchedule) {
    try {
        // Check if scheduleId is not null
        if (updatedSchedule.getScheduleId() == null) {
            return new ResponseEntity<>("Invalid schedule ID", HttpStatus.BAD_REQUEST);
        }

        // Assuming you have a method to update the training schedule
        trainingViewService.updateTrainingSchedule(updatedSchedule);
        return new ResponseEntity<>("Training schedule updated successfully", HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        // Print the exception details to console
        System.err.println("Error updating training schedule: " + e.getMessage());
        return new ResponseEntity<>("Error updating training schedule", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}



// @PostMapping("/schedule-by-course")
//     public ResponseEntity<Void> scheduleTrainingByCourse(@RequestBody TrainingSchedule request) {
//         // You can add validation and error handling as needed

//         // Assuming you have a method to get the training_id based on the course
//         Long trainingId = trainingViewService.getTrainingIdByCourse(request.getCourse());

//         // Now, insert the data into the training_schedule table
//         trainingViewService.scheduleTraining(trainingId, request);

//         return new ResponseEntity<>(HttpStatus.CREATED);
//     }
  // Add other endpoints as needed...
  
}
