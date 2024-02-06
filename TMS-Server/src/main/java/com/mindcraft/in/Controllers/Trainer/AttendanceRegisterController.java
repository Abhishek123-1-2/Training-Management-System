

package com.mindcraft.in.Controllers.Trainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mindcraft.in.Pojos.Trainer.AttendanceRegister;
import com.mindcraft.in.Services.Trainer.AttendanceRegisterService;

import java.util.List;

@RestController
@RequestMapping("/api/attendance-register")
public class AttendanceRegisterController {

    private final AttendanceRegisterService attendanceRegisterService;

    @Autowired
    public AttendanceRegisterController(AttendanceRegisterService attendanceRegisterService) {
        this.attendanceRegisterService = attendanceRegisterService;
    }

    @PostMapping("/save")
    public void saveAttendance(@RequestBody AttendanceRegister attendanceRegister) {
        attendanceRegisterService.saveAttendance(attendanceRegister);
    }

    @GetMapping("/get/{scheduleId}/{empId}")
    public List<AttendanceRegister> getAttendanceByScheduleIdAndEmpId(@PathVariable Long scheduleId, @PathVariable Long empId) {
        return attendanceRegisterService.getAttendanceByScheduleIdAndEmpId(scheduleId, empId);
    }

    // Other methods...
}

