package com.mentorai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class AiService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public List<String> generateRoadmap(String prompt) {

        try {
            String url = "https://openrouter.ai/api/v1/chat/completions";

            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("model", "openrouter/auto");

            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);

            messages.add(userMessage);

            body.put("messages", messages);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            // Extract AI response
            Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
            Map message = (Map) choice.get("message");

            String content = message.get("content").toString();

            return parseTopics(content);
            

        } catch (Exception e) {
            System.out.println("AI ERROR: " + e.getMessage());
            return getFallbackTopics();
        }
    }

    
    
    private List<String> parseTopics(String content) {

        List<String> topics = new ArrayList<>();

        String[] lines = content.split("\n");

        for (String line : lines) {

            line = line.replaceAll("[0-9.\\-•]", "").trim();

            if (!line.isEmpty() && line.length() < 80) {
                topics.add(line);
            }
        }

        return topics;
    }
    

    private List<String> getFallbackTopics() {
        return List.of(
                "Java Basics",
                "OOP Concepts",
                "Spring Core",
                "Spring Boot",
                "Spring Security"
        );
    }
    
    
    
}