package com.mindcraft.in.Controllers.Admin;

import com.mindcraft.in.Pojos.Admin.AdditionalRegistrationDetailsDTO;
import com.mindcraft.in.Pojos.Admin.EmployeeDetailsDTO;
import com.mindcraft.in.Pojos.Admin.Registration;
import com.mindcraft.in.Pojos.Admin.RegistrationDetailsDTO;
import com.mindcraft.in.Pojos.Employee.EnrollmentRequest;
import com.mindcraft.in.Services.Admin.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
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
    @PostMapping("/enroll")
    public ResponseEntity<Long> enrollTraining(@RequestBody Registration registration) {
    Long registrationId = registrationService.enrollTraining(registration);

    if (registrationId != null) {
        return new ResponseEntity<>(registrationId, HttpStatus.CREATED);
    } else {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// @GetMapping("/attendees")
// public ResponseEntity<List<EmployeeDetailsDTO>> getAttendees(@RequestParam String course, @RequestParam String trainingStatus) {
//     List<EmployeeDetailsDTO> attendees = registrationService.getAttendees(course, trainingStatus);
//     return ResponseEntity.ok(attendees);
// }
// @GetMapping("/attendees")
// public ResponseEntity<List<EmployeeDetailsDTO>> getAttendees(@RequestParam String course, @RequestParam String trainingStatus) {
//     List<EmployeeDetailsDTO> attendees = registrationService.getAttendees(course, trainingStatus);
//     return ResponseEntity.ok(attendees);
// }
@GetMapping("/attendees")
public ResponseEntity<List<EmployeeDetailsDTO>> getAttendees(
        @RequestParam String course,
        @RequestParam String trainingStatus,
        @RequestParam(required = false) String trainerName) {

    List<EmployeeDetailsDTO> attendees = registrationService.getAttendees(course, trainingStatus, trainerName);
    return ResponseEntity.ok(attendees);
}


    // Add other endpoints as needed...

    @GetMapping("/details")
    public List<RegistrationDetailsDTO> getRegistrationDetails() {
        return registrationService.getRegistrationDetails();
    }

    // @GetMapping("/details-with-additional")
    // public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithAdditionalDetails() {
    //     return registrationService.getRegistrationDetailsWithAdditionalDetails();
    // }
    @GetMapping("/details-with-additional/{empId}")
public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithAdditionalDetails(@PathVariable String empId) {
    return registrationService.getRegistrationDetailsWithAdditionalDetails(empId);
}

@GetMapping("/registered-details/{empId}")
public List<AdditionalRegistrationDetailsDTO> getDetails(@PathVariable String empId) {
    return registrationService.getRegisteredDetails(empId);
}


@GetMapping("/details-for-course/{courseName}")
    public ResponseEntity<List<AdditionalRegistrationDetailsDTO>> getDetailsForCourse(@PathVariable String courseName) {
        List<AdditionalRegistrationDetailsDTO> detailsForCourse = registrationService.getDetailsForCourse(courseName);

        if (detailsForCourse != null && !detailsForCourse.isEmpty()) {
            return new ResponseEntity<>(detailsForCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/details-with-planned-dates")
public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithPlannedDates() {
    return registrationService.getRegistrationDetailsWithPlannedDates();
}

   @GetMapping("/details-with-planned-dates-on-request")
public List<AdditionalRegistrationDetailsDTO> getRegistrationDetailsWithPlannedDatesOnRequest() {
    return registrationService.getRegistrationDetailsWithPlannedDatesOnRequest();
}

//  @PutMapping("/{registrationId}/status")
//     public ResponseEntity<Void> updateStatus(@PathVariable Long registrationId, @RequestBody Map<String, String> statusRequest) {
//         String newStatus = statusRequest.get("registration_status");

//         // Check if the provided status is valid (you may add additional validation logic if needed)
//         if (!Arrays.asList("confirmed", "rejected", "joined").contains(newStatus)) {
//             return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//         }

//         // Check if the registration with the given ID exists
//         Registration existingRegistration = registrationService.getRegistrationDetails(registrationId);
//         if (existingRegistration == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }

//         // Update the status
//         existingRegistration.setRegistration_status(newStatus);
//         registrationService.updateRegistration(existingRegistration);

//         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//     }

@PutMapping("/{registrationId}/status")
public ResponseEntity<Void> updateStatus(@PathVariable Long registrationId, @RequestBody Map<String, String> statusRequest) {
    String newStatus = statusRequest.get("registration_status");
    String registrationResponse = statusRequest.get("registrationResponse");

    // Check if the provided status is valid (you may add additional validation logic if needed)
    if (!Arrays.asList("confirmed", "rejected", "joined").contains(newStatus)) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // Check if the registration with the given ID exists
    Registration existingRegistration = registrationService.getRegistrationDetails(registrationId);
    if (existingRegistration == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update the status and registrationResponse
    existingRegistration.setRegistration_status(newStatus);
    existingRegistration.setRegistration_response(registrationResponse);
    registrationService.updateRegistration(existingRegistration);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}

}