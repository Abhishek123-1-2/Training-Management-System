package com.mindcraft.in.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Registration;
import com.mindcraft.in.Services.RegistrationService;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/add")
    public void addRegistration(@RequestBody List<Registration> registrations) {
        for (Registration registration : registrations) {
            registrationService.addRegistration(registration);
        }
    }
}
