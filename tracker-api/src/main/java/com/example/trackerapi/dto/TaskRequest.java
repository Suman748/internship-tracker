package com.example.trackerapi.dto;

import com.example.trackerapi.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TaskRequest(
        @NotBlank(message = "title is required")
        @Size(max = 100, message = "title must be at most 100 characters")
        String title,

        @Size(max = 500, message = "description must be at most 500 characters")
        String description,

        @NotBlank(message = "status is required")
        @Pattern(regexp = "TODO|IN_PROGRESS|DONE", message = "status must be TODO, IN_PROGRESS or DONE")
        String status
) {
    public Task toEntity() {
        return new Task(null, title, description, status);
    }
}
