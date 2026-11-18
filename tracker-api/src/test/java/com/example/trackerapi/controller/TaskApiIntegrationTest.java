package com.example.trackerapi.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TaskApiIntegrationTest {

    @Value("${local.server.port}")
    private int port;

    private HttpResponse<String> get(String path) throws Exception {
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + path)).GET().build();
        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Test
    void listReturnsJsonArray() throws Exception {
        HttpResponse<String> r = get("/api/tasks");
        assertEquals(200, r.statusCode());
        assertTrue(r.body().trim().startsWith("["));
    }

    @Test
    void statsReturnsTotalAndByStatus() throws Exception {
        HttpResponse<String> r = get("/api/tasks/stats");
        assertEquals(200, r.statusCode());
        assertTrue(r.body().contains("total"));
        assertTrue(r.body().contains("byStatus"));
    }

    @Test
    void missingTaskReturns404() throws Exception {
        assertEquals(404, get("/api/tasks/999999").statusCode());
    }
}
