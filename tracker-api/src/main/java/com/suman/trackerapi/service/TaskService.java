package com.suman.trackerapi.service;

import com.suman.trackerapi.model.Task;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    public List<Task> getAllTasks() {
        return List.of(
            new Task(1, "Set up React project", "Done"),
            new Task(2, "Write REST contract", "Submitted"),
            new Task(3, "Build Spring controller", "In Progress")
        );
    }
}
