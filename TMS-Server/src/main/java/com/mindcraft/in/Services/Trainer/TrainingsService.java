package com.mindcraft.in.Services.Trainer;

import java.util.List;

import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;

public interface TrainingsService {

    List<TrainingsDTO> getTrainingsByTrainerAndEmpName(String trainerName, String empName);
}
