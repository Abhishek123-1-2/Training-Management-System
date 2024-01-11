// package com.mindcraft.in.Pojos.Admin;

// import java.util.Date;

// public class AdditionalRegistrationDetailsDTO {
//     private String empCode;
//     private String courseName;
//     private String trainerName;
//     private Date startDate;
//     private Date endDate;
//     private String fromTime;
//     private String toTime;
//     private String status;
//     private Long empId;
//     private String trainingStatus;

//     // Constructors, getters, and setters

//     // Constructors
//     public AdditionalRegistrationDetailsDTO() {
//     }

//     public AdditionalRegistrationDetailsDTO(String courseName, String trainerName, Date startDate, Date endDate, String fromTime, String toTime, String status,String empCode,Long empId,String trainingStatus) {
//         this.courseName = courseName;
//         this.trainerName = trainerName;
//         this.startDate = startDate;
//         this.endDate = endDate;
//         this.fromTime = fromTime;
//         this.toTime = toTime;
//         this.status = status;
//         this.empCode=empCode;
//         this.empId = empId;
//         this.trainingStatus = trainingStatus;
//     }

//     // Getters and Setters
//     public String getCourseName() {
//         return courseName;
//     }

//     public void setCourseName(String courseName) {
//         this.courseName = courseName;
//     }

//     public String getTrainerName() {
//         return trainerName;
//     }

//     public void setTrainerName(String trainerName) {
//         this.trainerName = trainerName;
//     }

//     public Date getStartDate() {
//         return startDate;
//     }

//     public void setStartDate(Date startDate) {
//         this.startDate = startDate;
//     }

//     public Date getEndDate() {
//         return endDate;
//     }

//     public void setEndDate(Date endDate) {
//         this.endDate = endDate;
//     }

//     public String getFromTime() {
//         return fromTime;
//     }

//     public void setFromTime(String fromTime) {
//         this.fromTime = fromTime;
//     }

//     public String getToTime() {
//         return toTime;
//     }

//     public void setToTime(String toTime) {
//         this.toTime = toTime;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

//     public String getEmpCode() {
//         return empCode;
//     }

//     public void setEmpCode(String empCode) {
//         this.empCode = empCode;
//     }

//     public Long getEmpId() {
//         return empId;
//     }

//     public void setEmpId(Long empId) {
//         this.empId = empId;
//     }

//     public String getTrainingStatus() {
//         return trainingStatus;
//     }

//     public void setTrainingStatus(String trainingStatus) {
//         this.trainingStatus = trainingStatus;
//     }
// }


// package com.mindcraft.in.Pojos.Admin;

// import java.util.Date;

// public class AdditionalRegistrationDetailsDTO {
//     private Long registrationId; // This field was missing
//     private String empCode;
//     private String empName; // Changed from empName to match the alias in SQL
//     private Date registrationDate; // Changed from startDate to match the alias in SQL
//     private String courseName;
//     private String registrationComments; // This field was missing
//     private String status;
//     private String registrationResponse; // This field was missing
//     private Date plannedStartDate;
//     private Date plannedEndDate;
//     private String trainingSchedule;

//     // Constructors, getters, and setters

//     // Constructors
//     public AdditionalRegistrationDetailsDTO() {
//     }

//     public AdditionalRegistrationDetailsDTO(Long registrationId, String empCode, String empName, Date registrationDate,
//                                             String courseName, String registrationComments, String status,
//                                             String registrationResponse, Date plannedStartDate, Date plannedEndDate,String trainingSchedule) {
//         this.registrationId = registrationId;
//         this.empCode = empCode;
//         this.empName = empName;
//         this.registrationDate = registrationDate;
//         this.courseName = courseName;
//         this.registrationComments = registrationComments;
//         this.status = status;
//         this.registrationResponse = registrationResponse;
//         this.plannedStartDate = plannedStartDate;
//         this.plannedEndDate = plannedEndDate;
//         this.trainingSchedule=trainingSchedule;
//     }

//     public Long getRegistrationId() {
//         return registrationId;
//     }

//     public void setRegistrationId(Long registrationId) {
//         this.registrationId = registrationId;
//     }

//     public String getEmpCode() {
//         return empCode;
//     }

//     public void setEmpCode(String empCode) {
//         this.empCode = empCode;
//     }

//     public String getEmpName() {
//         return empName;
//     }

//     public void setEmpName(String empName) {
//         this.empName = empName;
//     }

//     public Date getRegistrationDate() {
//         return registrationDate;
//     }

//     public void setRegistrationDate(Date registrationDate) {
//         this.registrationDate = registrationDate;
//     }

//     public String getCourseName() {
//         return courseName;
//     }

//     public void setCourseName(String courseName) {
//         this.courseName = courseName;
//     }

//     public String getRegistrationComments() {
//         return registrationComments;
//     }

//     public void setRegistrationComments(String registrationComments) {
//         this.registrationComments = registrationComments;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

//     public String getRegistrationResponse() {
//         return registrationResponse;
//     }

//     public void setRegistrationResponse(String registrationResponse) {
//         this.registrationResponse = registrationResponse;
//     }

//     public Date getPlannedStartDate() {
//         return plannedStartDate;
//     }

//     public void setPlannedStartDate(Date plannedStartDate) {
//         this.plannedStartDate = plannedStartDate;
//     }

//     public Date getPlannedEndDate() {
//         return plannedEndDate;
//     }

//     public void setPlannedEndDate(Date plannedEndDate) {
//         this.plannedEndDate = plannedEndDate;
//     }

//     public String getTrainingSchedule() {
//         return trainingSchedule;
//     }

//     public void setTrainingSchedule(String trainingSchedule) {
//         this.trainingSchedule = trainingSchedule;
//     }

//     // Getters and Setters

//     // Add getters and setters as needed
// }
package com.mindcraft.in.Pojos.Admin;

import java.util.Date;

public class AdditionalRegistrationDetailsDTO {
    private Long registrationId;
    private String empCode;
    private String empName;
    private Date registrationDate;
    private String courseName;
    private String registrationComments;
    private String status;
    private String registrationResponse;
    private Date plannedStartDate;
    private Date plannedEndDate;
    private String trainingSchedule;
    private String trainerName;
    private Date startDate;
    private Date endDate;
    private String fromTime;
    private String toTime;
    private Long empId;
    private String trainingStatus;

    // Constructors, getters, and setters

    // Constructors
    public AdditionalRegistrationDetailsDTO() {
    }

    public AdditionalRegistrationDetailsDTO(Long registrationId, String empCode, String empName, Date registrationDate,
                                            String courseName, String registrationComments, String status,
                                            String registrationResponse, Date plannedStartDate, Date plannedEndDate, String trainingSchedule,
                                            String trainerName, Date startDate, Date endDate, String fromTime, String toTime, Long empId, String trainingStatus) {
        this.registrationId = registrationId;
        this.empCode = empCode;
        this.empName = empName;
        this.registrationDate = registrationDate;
        this.courseName = courseName;
        this.registrationComments = registrationComments;
        this.status = status;
        this.registrationResponse = registrationResponse;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.trainingSchedule = trainingSchedule;
        this.trainerName = trainerName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.empId = empId;
        this.trainingStatus = trainingStatus;
    }

    public Long getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(Long registrationId) {
        this.registrationId = registrationId;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getRegistrationComments() {
        return registrationComments;
    }

    public void setRegistrationComments(String registrationComments) {
        this.registrationComments = registrationComments;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRegistrationResponse() {
        return registrationResponse;
    }

    public void setRegistrationResponse(String registrationResponse) {
        this.registrationResponse = registrationResponse;
    }

    public Date getPlannedStartDate() {
        return plannedStartDate;
    }

    public void setPlannedStartDate(Date plannedStartDate) {
        this.plannedStartDate = plannedStartDate;
    }

    public Date getPlannedEndDate() {
        return plannedEndDate;
    }

    public void setPlannedEndDate(Date plannedEndDate) {
        this.plannedEndDate = plannedEndDate;
    }

    public String getTrainingSchedule() {
        return trainingSchedule;
    }

    public void setTrainingSchedule(String trainingSchedule) {
        this.trainingSchedule = trainingSchedule;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(String trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    // Getters and Setters

    // Add getters and setters as needed
}

