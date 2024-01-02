package com.mindcraft.in.Pojos.Admin;

public class EmployeeDetailsDTO {
    private String empCode;
    private String empName;
    private String designationName;
    private String functionName;
    private String email;

    public EmployeeDetailsDTO(){

    }

    public EmployeeDetailsDTO(String empCode, String empName, String designationName, String functionName,
            String email) {
        this.empCode = empCode;
        this.empName = empName;
        this.designationName = designationName;
        this.functionName = functionName;
        this.email = email;
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

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    // Constructors, getters, and setters
    
}

