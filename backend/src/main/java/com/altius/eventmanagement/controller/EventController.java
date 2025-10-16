package com.altius.eventmanagement.controller;

import com.altius.eventmanagement.dto.EventDetailResponse;
import com.altius.eventmanagement.model.Event;
import com.altius.eventmanagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
    
    @GetMapping("/{eventId}")
    public ResponseEntity<EventDetailResponse> getEventById(@PathVariable String eventId) {
        EventDetailResponse response = eventService.getEventById(eventId);
        
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<EventDetailResponse>> getEventsByDepartment(@PathVariable String departmentId) {
        List<EventDetailResponse> events = eventService.getEventsByDepartment(departmentId);
        return ResponseEntity.ok(events);
    }
}
