package com.mindcraft.in.Controllers.Admin;

import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Employee.EnrollmentRequest;
import com.mindcraft.in.Services.Admin.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody Registration registration) {
        Long registrationId = registrationService.register(registration);

        if (registrationId != null) {
            return new ResponseEntity<>(registrationId, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/details/{registrationId}")
    public ResponseEntity<Registration> getRegistrationDetails(@PathVariable Long registrationId) {
        Registration registration = registrationService.getRegistrationDetails(registrationId);

        if (registration != null) {
            return new ResponseEntity<>(registration, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/enroll")
  public ResponseEntity<String> enrollTraining(@RequestBody EnrollmentRequest enrollmentRequest) {
    try {
      // Add logic to process enrollment
      // You can use enrollmentRequest.getTraining_id() and enrollmentRequest.getSchedule_id()

      // Dummy response for now
      return new ResponseEntity<>("Enrollment successful", HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>("Enrollment failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
    
    // Add other endpoints as needed...


}