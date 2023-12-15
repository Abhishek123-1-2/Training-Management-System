package com.mindcraft.in.Controllers;

import com.mindcraft.in.Pojos.Registration;
import com.mindcraft.in.Services.RegistrationService;

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

}