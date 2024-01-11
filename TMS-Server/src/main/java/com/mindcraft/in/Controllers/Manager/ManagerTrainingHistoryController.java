package com.mindcraft.in.Controllers.Manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Employee.TrainingHistoryDTO;
import com.mindcraft.in.Services.Manager.ManagerTrainingHistoryServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/manager/training-history")
public class ManagerTrainingHistoryController {

    private final ManagerTrainingHistoryServiceImpl managerTrainingHistoryService;

    @Autowired
    public ManagerTrainingHistoryController(ManagerTrainingHistoryServiceImpl managerTrainingHistoryService) {
        this.managerTrainingHistoryService = managerTrainingHistoryService;
    }

    @GetMapping("/employee")
    public List<TrainingHistoryDTO> getTrainingHistoryByEmpIds(@RequestParam List<Long> empIds) {
        return managerTrainingHistoryService.getTrainingHistoryByEmpIds(empIds);
    }
}
