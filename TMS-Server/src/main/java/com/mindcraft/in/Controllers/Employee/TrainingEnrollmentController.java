package com.mindcraft.in.Controllers.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mindcraft.in.Pojos.Employee.TrainingEnrollmentDTO;
import com.mindcraft.in.Pojos.Employee.TrainingScheduleDTO;
import com.mindcraft.in.Services.Employee.TrainingEnrollmentService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations/training")  // Update the base path
public class TrainingEnrollmentController {

    private final TrainingEnrollmentService enrollmentService;

    @Autowired
    public TrainingEnrollmentController(TrainingEnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/enroll")  // Update the path
    public ResponseEntity<String> enrollTraining(@RequestBody TrainingScheduleDTO request) {
        try {
            enrollmentService.enrollTraining(request);
            return ResponseEntity.ok("Enrollment successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error enrolling training");
        }
    }

    // @GetMapping("/{empId}")  // Update the path
    // public ResponseEntity<List<Map<String, Object>>> getEnrollmentData(@PathVariable Long empId) {
    //     try {
    //         List<Map<String, Object>> enrollmentData = enrollmentService.getEnrollmentData(empId);
    //         return ResponseEntity.ok(enrollmentData);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
    //     }
    // }
    //  @GetMapping("/{empId}")
    // public ResponseEntity<List<TrainingEnrollmentDTO>> getEnrollmentData(@PathVariable Long empId) {
    //     try {
    //         List<TrainingEnrollmentDTO> enrollmentData = enrollmentService.getEnrollmentData(empId);
    //         return ResponseEntity.ok(enrollmentData);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
    //     }
    // }
    @GetMapping("/{empId}")
public ResponseEntity<List<TrainingEnrollmentDTO>> getEnrollmentData(@PathVariable Long empId) {
    try {
        List<TrainingEnrollmentDTO> enrollmentData = enrollmentService.getEnrollmentData(empId);
        return ResponseEntity.ok(enrollmentData);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
    }
    
}

}