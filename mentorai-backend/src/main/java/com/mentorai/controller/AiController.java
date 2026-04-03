package com.mentorai.controller;

import com.mentorai.service.AiService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate-roadmap")
    public List<String> generateRoadmap(@RequestParam String topic) throws Exception {

        return aiService.generateRoadmap(topic);
    }
}