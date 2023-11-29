package com.mindcraft.in.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.Participant;
import com.mindcraft.in.Services.ParticipantService;

@RestController
public class ParticipantController 
{

    private final ParticipantService participantService;

    @Autowired
    public ParticipantController(ParticipantService participantService)
    {
        this.participantService = participantService;
    }

    @PostMapping("/addParticipants")
    public String addParticipants(@RequestBody Participant participant)
    {
        participantService.addParticipants(participant);
        return "Participants Added Successfully";
        

    } 

    @GetMapping("/getParticipants")
    public List<Map<String, Object>> addAllParticipants()
    {
        return participantService.getAllParticipants();
    }
    
}
