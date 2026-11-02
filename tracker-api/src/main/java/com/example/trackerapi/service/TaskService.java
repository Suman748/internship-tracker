package com.example.trackerapi.service;

import com.example.trackerapi.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>(List.of(
            new Task(1L, "Set up project", "Spring Boot setup", "DONE"),
            new Task(2L, "Build GET endpoint", "Day 6", "DONE")
    ));
    private final AtomicLong counter = new AtomicLong(100);

    public List<Task> getAll() {
        return tasks;
    }

    public Task create(Task t) {
        t.setId(counter.incrementAndGet());
        tasks.add(t);
        return t;
    }

    public Optional<Task> update(Long id, Task updated) {
        return tasks.stream().filter(t -> t.getId().equals(id)).findFirst().map(t -> {
            t.setTitle(updated.getTitle());
            t.setDescription(updated.getDescription());
            t.setStatus(updated.getStatus());
            return t;
        });
    }

    public boolean delete(Long id) {
        return tasks.removeIf(t -> t.getId().equals(id));
    }
}
