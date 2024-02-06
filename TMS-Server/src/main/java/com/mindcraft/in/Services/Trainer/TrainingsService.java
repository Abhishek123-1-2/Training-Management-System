package com.mindcraft.in.Services.Trainer;

import java.util.List;

import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;

public interface TrainingsService {

    List<TrainingsDTO> getTrainingsByTrainerAndEmpName(String trainerName, String empName);
    List<TrainingsDTO> getTrainingsByTrainerAndEmpNameOngoing(String trainerName, String empName);
}
