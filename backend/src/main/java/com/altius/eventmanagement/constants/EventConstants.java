package com.altius.eventmanagement.constants;

import java.util.HashMap;
import java.util.Map;

public class EventConstants {
    
    private static final Map<String, String> EVENT_MAP = new HashMap<>();
    
    static {
        EVENT_MAP.put("EVNT001", "Tic-Tac-Toe");
        EVENT_MAP.put("EVNT012", "Chess");
        EVENT_MAP.put("EVNT004", "BDRF");
        EVENT_MAP.put("EVNT006", "Carrom");
    }
    
    public static Map<String, String> getAllEvents() {
        return new HashMap<>(EVENT_MAP);
    }
    
    public static String getEventName(String eventId) {
        return EVENT_MAP.get(eventId);
    }
    
    public static boolean isValidEventId(String eventId) {
        return EVENT_MAP.containsKey(eventId);
    }
}
