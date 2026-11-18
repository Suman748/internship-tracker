package com.example.trackerapi.controller;

import com.example.trackerapi.model.Task;
import com.example.trackerapi.repository.TaskRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskStatsController {

    private final TaskRepository repository;

    public TaskStatsController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        List<Task> all = repository.findAll();
        Map<String, Long> byStatus = all.stream().collect(
                Collectors.groupingBy(t -> String.valueOf(t.getStatus()), TreeMap::new, Collectors.counting()));
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("total", all.size());
        result.put("byStatus", byStatus);
        return result;
    }
}
