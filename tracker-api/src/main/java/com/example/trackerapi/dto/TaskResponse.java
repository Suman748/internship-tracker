package com.example.trackerapi.dto;

import com.example.trackerapi.model.Task;

public record TaskResponse(Long id, String title, String description, String status) {
    public static TaskResponse from(Task t) {
        return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus());
    }
}
