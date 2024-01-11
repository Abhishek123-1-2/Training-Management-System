package com.mindcraft.in.Services.Trainer;

import java.util.List;

import com.mindcraft.in.Pojos.Trainer.TrainingsDTO;

public interface TrainingsService {

    List<TrainingsDTO> getTrainingsByTrainerName(String empName);
}
