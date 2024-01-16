package com.mindcraft.in.Controllers.Trainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Trainer.EmpDetails;
import com.mindcraft.in.Services.Trainer.EmpService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmpController {

    private final EmpService employeeService;

    @Autowired
    public EmpController(EmpService employeeService) {
        this.employeeService = employeeService;
    }
    

    // @GetMapping("/employees")
    // public List<EmpDetails> getEmployeesByCourse(@RequestParam String course) {
    //     return employeeService.getEmployeesByCourse(course);
    // }
    @GetMapping("/employees")
public List<EmpDetails> getEmployeesByCourseAndTrainer(
    @RequestParam String course,
    @RequestParam(required = false) String trainerName
) {
    if (trainerName == null) {
        // If trainerName is not provided, use an empty string to include all trainers
        trainerName = "";
    }
    return employeeService.getEmployeesByCourseAndTrainer(course, trainerName);
}

}
