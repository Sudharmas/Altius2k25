package com.altius.eventmanagement.service;

import com.altius.eventmanagement.dto.EventDetailResponse;
import com.altius.eventmanagement.model.Event;
import com.altius.eventmanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public EventDetailResponse getEventById(String eventId) {
        Optional<Event> eventOpt = eventRepository.findByEventId(eventId);
        
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            return new EventDetailResponse(
                event.getEventId(),
                event.getEventName(),
                event.getDepartmentId(),
                event.getPosterPath(),
                event.getRulebookPath(),
                event.getCoordinators()
            );
        }
        
        return null;
    }
    
    public List<EventDetailResponse> getEventsByDepartment(String departmentId) {
        List<Event> events = eventRepository.findByDepartmentId(departmentId);
        
        return events.stream()
            .map(event -> new EventDetailResponse(
                event.getEventId(),
                event.getEventName(),
                event.getDepartmentId(),
                event.getPosterPath(),
                event.getRulebookPath(),
                event.getCoordinators()
            ))
            .collect(Collectors.toList());
    }
}
