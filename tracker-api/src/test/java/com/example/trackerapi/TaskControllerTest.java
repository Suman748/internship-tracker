package com.example.trackerapi;

import com.example.trackerapi.controller.TaskController;
import com.example.trackerapi.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

    @Mock TaskService taskService;
    @InjectMocks TaskController controller;

    MockMvc mvc;

    private static final String VALID =
            "{\"title\":\"Test\",\"description\":\"d\",\"status\":\"TODO\"}";

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void post_blankTitle_returns400() throws Exception {
        mvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"\",\"status\":\"TODO\"}"))
           .andExpect(status().isBadRequest());
    }

    @Test
    void post_invalidStatus_returns400() throws Exception {
        mvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Test\",\"status\":\"WRONG\"}"))
           .andExpect(status().isBadRequest());
    }

    @Test
    void put_missingTask_returns404() throws Exception {
        when(taskService.update(eq(99L), any())).thenReturn(Optional.empty());
        mvc.perform(put("/api/tasks/99")
                .contentType(MediaType.APPLICATION_JSON)
                .content(VALID))
           .andExpect(status().isNotFound());
    }

    @Test
    void delete_missingTask_returns404() throws Exception {
        when(taskService.delete(99L)).thenReturn(false);
        mvc.perform(delete("/api/tasks/99"))
           .andExpect(status().isNotFound());
    }

    @Test
    void delete_existingTask_returns204() throws Exception {
        when(taskService.delete(1L)).thenReturn(true);
        mvc.perform(delete("/api/tasks/1"))
           .andExpect(status().isNoContent());
    }
}
