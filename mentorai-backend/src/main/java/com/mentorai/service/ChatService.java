package com.mentorai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class ChatService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String chat(String userMessage) {

        OkHttpClient client = new OkHttpClient();

        try {

            // 🔥 Create request body safely using Map
            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", "openrouter/auto");

            List<Map<String, String>> messages = new ArrayList<>();

            messages.add(Map.of(
                    "role", "system",
                    "content", "You are a helpful AI mentor for programming students. Give clear and concise answers."
            ));

            messages.add(Map.of(
                    "role", "user",
                    "content", userMessage
            ));

            requestBody.put("messages", messages);

            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(requestBody);

            // 🔥 Build request
            Request request = new Request.Builder()
                    .url("https://openrouter.ai/api/v1/chat/completions")
                    .post(RequestBody.create(body, MediaType.parse("application/json")))
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .build();

            // 🔥 Execute request
            try (Response response = client.newCall(request).execute()) {

                String responseBody = response.body().string();

                // DEBUG (optional)
                System.out.println("STATUS: " + response.code());
                System.out.println("AI RESPONSE: " + responseBody);

                if (response.code() != 200) {
                    return "AI is not available right now.";
                }

                return extractAnswer(responseBody);
            }

        } catch (Exception e) {
            return "Error connecting to AI service.";
        }
    }

    // 🔥 Proper JSON parsing using ObjectMapper
    private String extractAnswer(String json) {

        try {
            ObjectMapper mapper = new ObjectMapper();

            Map<?, ?> map = mapper.readValue(json, Map.class);

            List<?> choices = (List<?>) map.get("choices");

            Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);

            Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            return "Error parsing AI response";
        }
    }
}