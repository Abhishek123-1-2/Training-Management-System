// package com.mindcraft.in.Controllers.Admin;


// import com.mindcraft.in.Pojos.Admin.CompletedCourseInfoDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeCourseDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.EmployeeTrainingDetailsDTO;
// import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
// import com.mindcraft.in.Pojos.Admin.TrainingView;
// import com.mindcraft.in.Pojos.Admin.TrainingViewDto;
// import com.mindcraft.in.Services.Admin.TrainingViewService;
// import com.mindcraft.in.Services.Employee.TrainingScheduleService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/training-views")
// public class TrainingViewController {

//     private final TrainingViewService trainingViewService;
//     private final TrainingScheduleService trainingScheduleService;

//     @Autowired
//     public TrainingViewController(TrainingViewService trainingViewService, TrainingScheduleService trainingScheduleService) {
//         this.trainingViewService = trainingViewService;
//         this.trainingScheduleService = trainingScheduleService;
//     }

//     // @GetMapping("/schedule")
//     // public List<TrainingViewDto> getTraining() {
//     //     return trainingScheduleService.getTrainings();
//     // }

//     // @PostMapping
//     // public void createTrainingView(@RequestBody TrainingView trainingView) {
//     //     trainingViewService.insertTrainingView(trainingView);
//     // }
// //     @PostMapping
// // public ResponseEntity<Long> createTrainingView(@RequestBody TrainingView trainingView) {
// //     // Check if a training with the same course name already exists
// //     Long existingTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

// //     if (existingTrainingId != null) {
// //         // Return the existing training ID and a success status
// //         return new ResponseEntity<>(existingTrainingId, HttpStatus.OK);
// //     }

// //     // No existing training found, proceed to insert a new training
// //     trainingViewService.insertTrainingView(trainingView);

// //     // Fetch the newly inserted training ID
// //     Long newTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

// //     if (newTrainingId != null) {
// //         // Return the new training ID and a success status
// //         return new ResponseEntity<>(newTrainingId, HttpStatus.CREATED);
// //     } else {
// //         // Handle the case where the new training ID cannot be retrieved
// //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
// //     }
// // }
// @PostMapping
// public ResponseEntity<Long> createTrainingView(@RequestBody TrainingView trainingView) {
//     // Check if a training with the same course name already exists
//     Long existingTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

//     if (existingTrainingId != null) {
//         // Training with the same course name already exists, update the existing training details
//         trainingViewService.updateTrainingView(existingTrainingId, trainingView);

//         // Return the existing training ID and a success status
//         return new ResponseEntity<>(existingTrainingId, HttpStatus.OK);
//     }

//     // No existing training found, proceed to insert a new training
//     trainingViewService.insertTrainingView(trainingView);

//     // Fetch the newly inserted training ID
//     Long newTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

//     if (newTrainingId != null) {
//         // Return the new training ID and a success status
//         return new ResponseEntity<>(newTrainingId, HttpStatus.CREATED);
//     } else {
//         // Handle the case where the new training ID cannot be retrieved
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }

// //     @PostMapping
// // public ResponseEntity<String> createTrainingView(@RequestBody TrainingView trainingView) {
// //     String course = trainingView.getCourse();

// //     // Check if a training with the given course name already exists
// //     Long existingTrainingId = trainingViewService.getTrainingIdByCourse(course);

// //     if (existingTrainingId != null) {
// //         // A training with the same course name already exists, return the existing training ID
// //         return new ResponseEntity<>("Training with the same course name already exists. Training ID: " + existingTrainingId, HttpStatus.OK);
// //     }

// //     // If the training doesn't exist, proceed to create a new one
// //     trainingViewService.insertTrainingView(trainingView);
// //     return new ResponseEntity<>("Training created successfully", HttpStatus.CREATED);
// // }


//     @GetMapping
//     public List<TrainingView> getAllTrainingViews() {
//         return trainingViewService.getAllTrainingViews();
//     }
    
//     // @GetMapping("/trainer-names")
//     // public List<String> getTrainerNames() {
//     // return trainingViewService.getTrainerNames();
//     // }
//     // Inside TrainingViewController.java

// @PostMapping("/schedule")
// public void scheduleTraining(@RequestBody TrainingSchedule request) {
//     // You can add validation and error handling as needed
    
//     // Assuming you have a method to get the training_id based on the trainer's name
//     Long trainingId = trainingViewService.getTrainingIdByTrainerName(request.getTrainerName());

//     // Now, insert the data into the training_schedule table
//     trainingViewService.scheduleTraining(trainingId, request);
// }
// @GetMapping("/trainer-id")
//     public ResponseEntity<Long> getTrainingIdByTrainerName(@RequestParam String name) {
//         Long trainingId = trainingViewService.getTrainingIdByTrainerName(name);

//         if (trainingId != null) {
//             return new ResponseEntity<>(trainingId, HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }
// //     @GetMapping("/training-id")
// // public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
// //     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

// //     if (trainingId != null) {
// //         return new ResponseEntity<>(trainingId, HttpStatus.OK);
// //     } else {
// //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
// //     }
// // }
// // @GetMapping("/training-id")
// // public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
// //     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

// //     if (trainingId != null) {
// //         return new ResponseEntity<>(trainingId, HttpStatus.OK);
// //     } else {
// //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
// //     }
// // }
//     @GetMapping("/courses")
//     public List<String> getTrainingCourses() {
//         return trainingViewService.getTrainingCourses();
//     }
//     // @GetMapping("/schedule")
//     // public ResponseEntity<List<TrainingViewDto>> getTrainingSchedule() {
//     //     try {
//     //         List<TrainingViewDto> trainingViews = trainingViewService.getTrainingSchedule();
//     //         return new ResponseEntity<>(trainingViews, HttpStatus.OK);
//     //     } catch (Exception e) {
//     //         e.printStackTrace();
//     //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     //     }
//     // }
// //     @GetMapping("/schedule-list")
// // public ResponseEntity<List<TrainingViewDto>> getTrainingScheduleList() {
// //     try {
// //         List<TrainingViewDto> scheduleList = trainingViewService.getTrainingSchedule();
// //         return new ResponseEntity<>(scheduleList, HttpStatus.OK);
// //     } catch (Exception e) {
// //         e.printStackTrace();
// //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
// //     }
// // }
// @GetMapping("/schedule-list")
// public ResponseEntity<List<TrainingViewDto>> getTrainingScheduleList() {
//     try {
//         List<TrainingViewDto> scheduleList = trainingViewService.getTrainingSchedule();

//         if (scheduleList != null) {
//             return new ResponseEntity<>(scheduleList, HttpStatus.OK);
//         } else {
//             // Handle the case where scheduleList is null
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }

//     } catch (Exception e) {
//         e.printStackTrace();
//         // Log the exception or handle it according to your application's needs
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }


//     // @GetMapping("/scheduled-trainings")
//     // public List<TrainingView> getAllScheduledTrainings() {
//     //     return trainingViewService.getAllScheduledTrainings();
//     // }

//     @GetMapping("/training-id")
// public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
//     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

//     if (trainingId != null) {
//         return new ResponseEntity<>(trainingId, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
// // Inside TrainingViewController.java

// @GetMapping("/courses-with-dates")
// public List<String> getTrainingCoursesWithDates() {
//     return trainingViewService.getTrainingCourses();
// }
// // @GetMapping("/scheduled-trainings")
// //     public ResponseEntity<List<TrainingView>> getAllScheduledTrainings() {
// //         try {
// //             List<TrainingView> scheduledTrainings = trainingViewService.getAllScheduledTrainings();
// //             return new ResponseEntity<>(scheduledTrainings, HttpStatus.OK);
// //         } catch (Exception e) {
// //             e.printStackTrace();
// //             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
// //         }
// //     }
// // @GetMapping("/scheduled-trainings")
// //     public List<TrainingView> getAllScheduledTrainings() {
// //         return trainingViewService.getAllScheduledTrainings();
// //     }
//     @GetMapping("/training-details/{course}")
// public ResponseEntity<TrainingView> getTrainingDetailsByCourse(@PathVariable String course) {
//     TrainingView trainingDetails = trainingViewService.getTrainingDetailsByCourse(course);

//     if (trainingDetails != null) {
//         return new ResponseEntity<>(trainingDetails, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
// // @PutMapping("/update-schedule")
// // public ResponseEntity<String> updateTrainingSchedule(@RequestBody TrainingSchedule updatedSchedule) {
// //     try {
// //         // Assuming you have a method to update the training schedule
// //         trainingViewService.updateTrainingSchedule(updatedSchedule);
// //         return new ResponseEntity<>("Training schedule updated successfully", HttpStatus.OK);
// //     } catch (Exception e) {
// //         e.printStackTrace();
// //         // Print the exception details to console
// //         System.err.println("Error updating training schedule: " + e.getMessage());
// //         return new ResponseEntity<>("Error updating training schedule", HttpStatus.INTERNAL_SERVER_ERROR);
// //     }
// // }
// @PutMapping("/update-schedule")
// public ResponseEntity<String> updateTrainingSchedule(@RequestBody TrainingSchedule updatedSchedule) {
//     try {
//         // Check if scheduleId is not null
//         if (updatedSchedule.getScheduleId() == null) {
//             return new ResponseEntity<>("Invalid schedule ID", HttpStatus.BAD_REQUEST);
//         }

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

// // @GetMapping("/training-id-by-course")
// // public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
// //     try {
// //         // Get the training ID based on the course
// //         Long trainingId = trainingViewService.getTrainingIdByCourse(course);

// //         if (trainingId != null) {
// //             return new ResponseEntity<>(trainingId, HttpStatus.OK);
// //         } else {
// //             // Handle the case where no training ID is found
// //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
// //         }

// //     } catch (Exception e) {
// //         e.printStackTrace();
// //         // Log the exception or handle it according to your application's needs
// //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
// //     }
// // }


// // @PostMapping("/schedule-by-course")
// //     public ResponseEntity<Void> scheduleTrainingByCourse(@RequestBody TrainingSchedule request) {
// //         // You can add validation and error handling as needed

// //         // Assuming you have a method to get the training_id based on the course
// //         Long trainingId = trainingViewService.getTrainingIdByCourse(request.getCourse());

// //         // Now, insert the data into the training_schedule table
// //         trainingViewService.scheduleTraining(trainingId, request);

// //         return new ResponseEntity<>(HttpStatus.CREATED);
// //     }
//   // Add other endpoints as needed...
//   @GetMapping("/training-id-by-course")
// public ResponseEntity<Long> getTrainingIdByCourseName(@RequestParam String courseName) {
//     Long trainingId = trainingViewService.getTrainingIdByCourseName(courseName);

//     if (trainingId != null) {
//         return new ResponseEntity<>(trainingId, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
// @GetMapping("/schedule-id-by-trainer")
//     public ResponseEntity<Long> getScheduleIdByTrainerName(@RequestParam String trainerName) {
//         Long scheduleId = trainingViewService.getScheduleIdByTrainerName(trainerName);

//         if (scheduleId != null) {
//             return new ResponseEntity<>(scheduleId, HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }
//     @GetMapping("/status-counts")
//     public Map<String, Long> getTrainingStatusCounts() {
//         return trainingViewService.getTrainingStatusCounts();
//     }
//     @GetMapping("/status-counts-by-month")
// public Map<String, Map<String, Long>> getTrainingStatusCountsByMonth() {
//     return trainingViewService.getTrainingStatusCountsByMonth();
// }
// @GetMapping("/completed-courses/{empCode}")
//     public List<CompletedCourseInfoDTO> getCompletedCourses(@PathVariable String empCode) {
//         return trainingViewService.getCompletedCoursesInfo(empCode);
//     }
//     @PutMapping("/update-training-status/{empCode}/{scheduleId}")
//     public ResponseEntity<CompletedCourseInfoDTO> updateTrainingStatusAndMoveToCompleted(
//             @PathVariable String empCode,
//             @PathVariable Long scheduleId) {
//         CompletedCourseInfoDTO completedCourseInfoDTO = trainingViewService
//                 .updateTrainingStatusAndMoveToCompleted(empCode, scheduleId);

//         // Optionally, you can return a response or handle as needed
//         return ResponseEntity.ok(completedCourseInfoDTO);
//     }
//     @GetMapping("/completed-course-details/{course}")
// public List<EmployeeTrainingDetailsDTO> getCompletedCourseDetails(@PathVariable String course) {
//     return trainingViewService.getEmployeesCompletedCourseInfo(course);
// }
// @GetMapping("/completed-courses")
//     public List<CompletedCourseInfoDTO> getCompletedCourses() {
//         return trainingViewService.getCompletedCourses();
//     }
//    // In TrainingViewController.java

// @GetMapping("/trainer-names")
// public List<String> getAllTrainerNames() {
//     return trainingViewService.getAllTrainerNames();
// }
// @GetMapping("/completedDetails/{course}")
//     public List<EmployeeCourseDetailsDTO> getEmployeesCompletedCourseDetails(@PathVariable String course) {
//         return trainingViewService.getEmployeesCompletedCourseDetails(course);
//     }
// }
package com.mindcraft.in.Controllers.Admin;


import com.mindcraft.in.Pojos.Admin.CompletedCourseInfoDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeCourseDetailsDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeTrainingDetailsDTO;
import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Admin.TrainingView;
import com.mindcraft.in.Pojos.Admin.TrainingViewDto;
import com.mindcraft.in.Services.Admin.TrainingViewService;
import com.mindcraft.in.Services.Employee.TrainingScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/training-views")
public class TrainingViewController {

    private final TrainingViewService trainingViewService;
    private final TrainingScheduleService trainingScheduleService;

    @Autowired
    public TrainingViewController(TrainingViewService trainingViewService, TrainingScheduleService trainingScheduleService) {
        this.trainingViewService = trainingViewService;
        this.trainingScheduleService = trainingScheduleService;
    }

    // @GetMapping("/schedule")
    // public List<TrainingViewDto> getTraining() {
    //     return trainingScheduleService.getTrainings();
    // }

    // @PostMapping
    // public void createTrainingView(@RequestBody TrainingView trainingView) {
    //     trainingViewService.insertTrainingView(trainingView);
    // }
//     @PostMapping
// public ResponseEntity<Long> createTrainingView(@RequestBody TrainingView trainingView) {
//     // Check if a training with the same course name already exists
//     Long existingTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

//     if (existingTrainingId != null) {
//         // Return the existing training ID and a success status
//         return new ResponseEntity<>(existingTrainingId, HttpStatus.OK);
//     }

//     // No existing training found, proceed to insert a new training
//     trainingViewService.insertTrainingView(trainingView);

//     // Fetch the newly inserted training ID
//     Long newTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

//     if (newTrainingId != null) {
//         // Return the new training ID and a success status
//         return new ResponseEntity<>(newTrainingId, HttpStatus.CREATED);
//     } else {
//         // Handle the case where the new training ID cannot be retrieved
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }
@PostMapping
public ResponseEntity<Long> createTrainingView(@RequestBody TrainingView trainingView) {
    // Check if a training with the same course name already exists
    Long existingTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

    if (existingTrainingId != null) {
        // Training with the same course name already exists, update the existing training details
        trainingViewService.updateTrainingView(existingTrainingId, trainingView);

        // Return the existing training ID and a success status
        return new ResponseEntity<>(existingTrainingId, HttpStatus.OK);
    }

    // No existing training found, proceed to insert a new training
    trainingViewService.insertTrainingView(trainingView);

    // Fetch the newly inserted training ID
    Long newTrainingId = trainingViewService.getTrainingIdByCourse(trainingView.getCourse());

    if (newTrainingId != null) {
        // Return the new training ID and a success status
        return new ResponseEntity<>(newTrainingId, HttpStatus.CREATED);
    } else {
        // Handle the case where the new training ID cannot be retrieved
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

//     @PostMapping
// public ResponseEntity<String> createTrainingView(@RequestBody TrainingView trainingView) {
//     String course = trainingView.getCourse();

//     // Check if a training with the given course name already exists
//     Long existingTrainingId = trainingViewService.getTrainingIdByCourse(course);

//     if (existingTrainingId != null) {
//         // A training with the same course name already exists, return the existing training ID
//         return new ResponseEntity<>("Training with the same course name already exists. Training ID: " + existingTrainingId, HttpStatus.OK);
//     }

//     // If the training doesn't exist, proceed to create a new one
//     trainingViewService.insertTrainingView(trainingView);
//     return new ResponseEntity<>("Training created successfully", HttpStatus.CREATED);
// }


    @GetMapping
    public List<TrainingView> getAllTrainingViews() {
        return trainingViewService.getAllTrainingViews();
    }
    
    // @GetMapping("/trainer-names")
    // public List<String> getTrainerNames() {
    // return trainingViewService.getTrainerNames();
    // }
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
// @GetMapping("/training-id")
// public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
//     Long trainingId = trainingViewService.getTrainingIdByCourse(course);

//     if (trainingId != null) {
//         return new ResponseEntity<>(trainingId, HttpStatus.OK);
//     } else {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }
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

    @GetMapping("/training-id")
public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
    Long trainingId = trainingViewService.getTrainingIdByCourse(course);

    if (trainingId != null) {
        return new ResponseEntity<>(trainingId, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
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

// @GetMapping("/training-id-by-course")
// public ResponseEntity<Long> getTrainingIdByCourse(@RequestParam String course) {
//     try {
//         // Get the training ID based on the course
//         Long trainingId = trainingViewService.getTrainingIdByCourse(course);

//         if (trainingId != null) {
//             return new ResponseEntity<>(trainingId, HttpStatus.OK);
//         } else {
//             // Handle the case where no training ID is found
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }

//     } catch (Exception e) {
//         e.printStackTrace();
//         // Log the exception or handle it according to your application's needs
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }


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
  @GetMapping("/training-id-by-course")
public ResponseEntity<Long> getTrainingIdByCourseName(@RequestParam String courseName) {
    Long trainingId = trainingViewService.getTrainingIdByCourseName(courseName);

    if (trainingId != null) {
        return new ResponseEntity<>(trainingId, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
@GetMapping("/schedule-id-by-trainer")
    public ResponseEntity<Long> getScheduleIdByTrainerName(@RequestParam String trainerName) {
        Long scheduleId = trainingViewService.getScheduleIdByTrainerName(trainerName);

        if (scheduleId != null) {
            return new ResponseEntity<>(scheduleId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/status-counts")
    public Map<String, Long> getTrainingStatusCounts() {
        return trainingViewService.getTrainingStatusCounts();
    }
    @GetMapping("/status-counts-by-month")
public Map<String, Map<String, Long>> getTrainingStatusCountsByMonth() {
    return trainingViewService.getTrainingStatusCountsByMonth();
}
@GetMapping("/completed-courses/{empCode}")
    public List<CompletedCourseInfoDTO> getCompletedCourses(@PathVariable String empCode) {
        return trainingViewService.getCompletedCoursesInfo(empCode);
    }
    @PutMapping("/update-training-status/{empCode}/{scheduleId}")
    public ResponseEntity<CompletedCourseInfoDTO> updateTrainingStatusAndMoveToCompleted(
            @PathVariable String empCode,
            @PathVariable Long scheduleId) {
        CompletedCourseInfoDTO completedCourseInfoDTO = trainingViewService
                .updateTrainingStatusAndMoveToCompleted(empCode, scheduleId);

        // Optionally, you can return a response or handle as needed
        return ResponseEntity.ok(completedCourseInfoDTO);
    }
    @GetMapping("/completed-course-details/{course}")
public List<EmployeeTrainingDetailsDTO> getCompletedCourseDetails(@PathVariable String course) {
    return trainingViewService.getEmployeesCompletedCourseInfo(course);
}
@GetMapping("/completed-courses")
    public List<CompletedCourseInfoDTO> getCompletedCourses() {
        return trainingViewService.getCompletedCourses();
    }
   // In TrainingViewController.java

@GetMapping("/trainer-names")
public List<String> getAllTrainerNames() {
    return trainingViewService.getAllTrainerNames();
}
@GetMapping("/completedDetails/{course}")
    public List<EmployeeCourseDetailsDTO> getEmployeesCompletedCourseDetails(@PathVariable String course) {
        return trainingViewService.getEmployeesCompletedCourseDetails(course);
    }

}

