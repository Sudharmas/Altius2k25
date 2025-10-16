package com.altius.eventmanagement.constants;

import java.util.HashMap;
import java.util.Map;

public class DepartmentConstants {
    
    private static final Map<String, String> DEPARTMENT_MAP = new HashMap<>();
    
    static {
        DEPARTMENT_MAP.put("DEPT001", "Computer Science and Engineering");
        DEPARTMENT_MAP.put("DEPT002", "Electronics and Communication Engineering");
        DEPARTMENT_MAP.put("DEPT003", "Mechanical Engineering");
        DEPARTMENT_MAP.put("DEPT004", "Civil Engineering");
        DEPARTMENT_MAP.put("DEPT005", "Electrical Engineering");
        DEPARTMENT_MAP.put("DEPT006", "Aerospace Engineering");
        DEPARTMENT_MAP.put("DEPT007", "Information Technology");
        DEPARTMENT_MAP.put("DEPT008", "Biotechnology");
        DEPARTMENT_MAP.put("DEPT009", "Chemical Engineering");
        DEPARTMENT_MAP.put("DEPT010", "Master of Business Administration");
        DEPARTMENT_MAP.put("DEPT011", "Artificial Intelligence and Machine Learning");
        DEPARTMENT_MAP.put("DEPT012", "Data Science");
    }
    
    public static Map<String, String> getAllDepartments() {
        return new HashMap<>(DEPARTMENT_MAP);
    }
    
    public static String getDepartmentName(String deptId) {
        return DEPARTMENT_MAP.get(deptId);
    }
    
    public static boolean isValidDepartmentId(String deptId) {
        return DEPARTMENT_MAP.containsKey(deptId);
    }
}
