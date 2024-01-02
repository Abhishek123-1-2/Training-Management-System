package com.mindcraft.in.Controllers.Admin;

import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Admin.RegistrationDetailsDTO;
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

    // Add other endpoints as needed...
    @PutMapping("/{registrationId}")
    public ResponseEntity<Void> updateRegistration(@PathVariable Long registrationId, @RequestBody Registration registration) {
        // Ensure the provided registration ID matches the path variable
        if (!registrationId.equals(registration.getRegistration_id())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Check if the registration with the given ID exists
        Registration existingRegistration = registrationService.getRegistrationDetails(registrationId);
        if (existingRegistration == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Update the registration
        registrationService.updateRegistration(registration);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}