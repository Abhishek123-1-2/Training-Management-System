package com.mindcraft.in.Controllers.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.mindcraft.in.Pojos.Admin.TrainingSchedule;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;
// import com.mindcraft.in.Pojos.Employee.EnrollmentRequest;
import com.mindcraft.in.Services.Employee.TrainingEnrollmentService;

public class TrainingEnrollmentController {
    
    private final TrainingEnrollmentService enrollmentService;

    @Autowired
    public TrainingEnrollmentController(TrainingEnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("api/registrations/enroll")
    public ResponseEntity<String> enrollTraining(@RequestBody TrainingScheduleDTO request) {
        try {
            enrollmentService.enrollTraining(request);
            return ResponseEntity.ok("Enrollment successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error enrolling training");
        }
    }

    // @PostMapping("/api/registration/is-enrolled")
    // public ResponseEntity<Boolean> isEnrolled(
    //     @RequestParam String empId,
    //     @RequestParam String scheduleId,
    //     @RequestParam String trainingId
    // ) {
    //     try {
    //         boolean isEnrolled = enrollmentService.isEnrolled(empId, scheduleId, trainingId);
    //         return ResponseEntity.ok(isEnrolled);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    //     }
    // }
}
