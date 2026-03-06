package com.mentorai.service;

import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AiService {

    private final String API_KEY = "AIzaSyDTVtaKaRM_7ykGF2T_GA215ZMv28gWeI8";

    public String generateRoadmap(String topic) {
        try {
            OkHttpClient client = new OkHttpClient();

            String prompt = "Create a beginner to advanced learning roadmap for " + topic +
                    ". Divide it into weekly topics.";

            String jsonBody = """
            {
              "contents": [{
                "parts":[{"text": "%s"}]
              }]
            }
            """.formatted(prompt);

            RequestBody body = RequestBody.create(
                    jsonBody,
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url("https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + API_KEY)
                    .post(body)
                    .build();

            Response response = client.newCall(request).execute();

            if (response.isSuccessful()) {
                return response.body().string();
            }

        } catch (Exception e) {
            System.out.println("Gemini API failed, using fallback roadmap.");
        }

        // Fallback roadmap
        return """
        Week 1: Basics of %s
        Week 2: Core Concepts
        Week 3: Intermediate Projects
        Week 4: Advanced Topics
        Week 5: Build a Complete Project
        """.formatted(topic);
    }
}