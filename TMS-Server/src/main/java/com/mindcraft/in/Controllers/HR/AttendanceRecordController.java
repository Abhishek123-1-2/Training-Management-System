package com.mindcraft.in.Controllers.HR;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.Pojos.HR.AttendanceRecord;
import com.mindcraft.in.Services.HR.AttendanceRecordService;

@RestController
public class AttendanceRecordController 
{

    private final AttendanceRecordService attendanceRecordService;

    @Autowired
    public AttendanceRecordController(AttendanceRecordService attendanceRecordService)
    {
        this.attendanceRecordService = attendanceRecordService;
    }
    
    @GetMapping("/getAttendance")
    public List<Map<String, Object>> getAllAttendance()
    {
        return attendanceRecordService.getAllAttendance();
    }


}
