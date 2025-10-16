package com.altius.eventmanagement.service;

import com.altius.eventmanagement.constants.DepartmentConstants;
import com.altius.eventmanagement.model.ChampionsCount;
import com.altius.eventmanagement.repository.ChampionsCountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChampionsService {
    
    @Autowired
    private ChampionsCountRepository championsCountRepository;
    
    @Transactional
    public void championsCounter(String winnerDeptId, String runnerDeptId) {
        if (winnerDeptId != null && !winnerDeptId.isEmpty()) {
            updateDepartmentCount(winnerDeptId);
        }
        
        if (runnerDeptId != null && !runnerDeptId.isEmpty()) {
            updateDepartmentCount(runnerDeptId);
        }
    }
    
    private void updateDepartmentCount(String deptId) {
        Optional<ChampionsCount> existingCount = championsCountRepository.findByDeptId(deptId);
        
        if (existingCount.isPresent()) {
            ChampionsCount count = existingCount.get();
            count.setCount(count.getCount() + 1);
            championsCountRepository.save(count);
        } else {
            ChampionsCount newCount = new ChampionsCount();
            newCount.setDeptId(deptId);
            newCount.setCount(1);
            championsCountRepository.save(newCount);
        }
    }
    
    public List<Map<String, Object>> getLeaderboard() {
        List<ChampionsCount> allCounts = championsCountRepository.findAll();
        
        return allCounts.stream()
            .sorted((a, b) -> b.getCount().compareTo(a.getCount()))
            .limit(5)
            .map(champCount -> {
                Map<String, Object> entry = new HashMap<>();
                entry.put("deptId", champCount.getDeptId());
                entry.put("deptName", DepartmentConstants.getDepartmentName(champCount.getDeptId()));
                entry.put("count", champCount.getCount());
                return entry;
            })
            .collect(Collectors.toList());
    }
    
    public Map<String, String> getDepartments() {
        return DepartmentConstants.getAllDepartments();
    }
    
    public Map<String, String> getEvents() {
        return com.altius.eventmanagement.constants.EventConstants.getAllEvents();
    }
}
