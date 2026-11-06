package com.example.trackerapi.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired MockMvc mvc;

    @Test
    void getTasksReturns200() throws Exception {
        mvc.perform(get("/api/tasks")).andExpect(status().isOk());
    }

    @Test
    void blankTitleReturns400WithCleanMessage() throws Exception {
        mvc.perform(post("/api/tasks")
                .contentType("application/json")
                .content("{\"title\":\"\",\"description\":\"x\",\"status\":\"TODO\"}"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.status").value(400))
            .andExpect(content().string(not(containsString("Exception"))))
            .andExpect(content().string(not(containsString("org."))))
            .andExpect(content().string(not(containsString("SQL"))));
    }

    @Test
    void invalidStatusReturns400() throws Exception {
        mvc.perform(post("/api/tasks")
                .contentType("application/json")
                .content("{\"title\":\"t\",\"description\":\"x\",\"status\":\"NOPE\"}"))
            .andExpect(status().isBadRequest());
    }
}
