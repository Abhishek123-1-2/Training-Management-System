package com.mindcraft.in.Controllers.Employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Employee.CompletedCoursesDTO;
import com.mindcraft.in.Services.Employee.CompletedCoursesService;

@RestController
@RequestMapping("/api/completed-courses")
public class CompletedCoursesController {
    
     @Autowired
    private CompletedCoursesService feedbackService;

    @GetMapping("/{empId}")
    public List<CompletedCoursesDTO> getFeedback(@PathVariable String empId) {
        return feedbackService.getFeedbackByEmployeeId(empId);
    }
}
