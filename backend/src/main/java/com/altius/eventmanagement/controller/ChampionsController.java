package com.altius.eventmanagement.controller;

import com.altius.eventmanagement.service.ChampionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/champions")
@CrossOrigin(origins = "*")
public class ChampionsController {
    
    @Autowired
    private ChampionsService championsService;
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<Map<String, Object>>> getLeaderboard() {
        return ResponseEntity.ok(championsService.getLeaderboard());
    }
    
    @GetMapping("/departments")
    public ResponseEntity<Map<String, String>> getDepartments() {
        return ResponseEntity.ok(championsService.getDepartments());
    }
    
    @GetMapping("/events")
    public ResponseEntity<Map<String, String>> getEvents() {
        return ResponseEntity.ok(championsService.getEvents());
    }
}
