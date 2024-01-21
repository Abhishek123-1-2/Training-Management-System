package com.mindcraft.in.Controllers.Trainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Trainer.EmpDetails;
import com.mindcraft.in.Services.Trainer.EmpService;

import java.util.Date;
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




//     @GetMapping("/employees")
// public List<EmpDetails> getEmployeesByCourseAndTrainer(
//     @RequestParam String course,
//     @RequestParam(required = false) String trainerName
// ) {
//     if (trainerName == null) {
//         // If trainerName is not provided, use an empty string to include all trainers
//         trainerName = "";
//     }
//     return employeeService.getEmployeesByCourseAndTrainer(course, trainerName);
// }

@GetMapping("/employees")
public List<EmpDetails> getEmployeesByCourseAndTrainer(
    @RequestParam String course,
    @RequestParam(required = false) String trainerName,
    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") java.util.Date plannedStartDate,
    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") java.util.Date plannedEndDate
) {
    if (trainerName == null) {
        // If trainerName is not provided, use an empty string to include all trainers
        trainerName = "";
    }
    return employeeService.getEmployeesByCourseAndTrainer(course, trainerName, plannedStartDate, plannedEndDate);
}
// @GetMapping("/employees")
// public List<EmpDetails> getEmployeesByCourseAndTrainer(
//     @RequestParam String course,
//     @RequestParam(required = false) String trainerName,
//     @RequestParam(required = false) Date plannedStartDate,
//     @RequestParam(required = false) Date plannedEndDate
// ) {
//     if (trainerName == null) {
//         trainerName = "";
//     }
//     return employeeService.getEmployeesByCourseAndTrainer(course, trainerName, plannedStartDate, plannedEndDate);
// }
// @GetMapping("/employees")
// public List<EmpDetails> getEmployeesByCourseAndTrainer(
//     @RequestParam String course,
//     @RequestParam(required = false) String trainerName,
//     @RequestParam(required = false) 
//     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date plannedStartDate,
//     @RequestParam(required = false) 
//     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date plannedEndDate
// ) {
//     if (trainerName == null) {
//         trainerName = "";
//     }

//     return employeeService.getEmployeesByCourseAndTrainer(course, trainerName, plannedStartDate, plannedEndDate);
// }
}
