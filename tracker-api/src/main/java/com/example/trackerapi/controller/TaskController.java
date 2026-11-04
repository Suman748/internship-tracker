package com.example.trackerapi.controller;

import com.example.trackerapi.dto.TaskRequest;
import com.example.trackerapi.dto.TaskResponse;
import com.example.trackerapi.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> getAll() {
        return taskService.getAll().stream().map(TaskResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getById(@PathVariable Long id) {
        return taskService.getById(id)
                .map(t -> ResponseEntity.ok(TaskResponse.from(t)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody TaskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(TaskResponse.from(taskService.create(request.toEntity())));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        return taskService.update(id, request.toEntity())
                .map(t -> ResponseEntity.ok(TaskResponse.from(t)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return taskService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
