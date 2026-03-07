package com.mentorai.controller;

import com.mentorai.dto.RoadmapRequest;
import com.mentorai.model.Roadmap;
import com.mentorai.service.RoadmapService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @PostMapping("/generate")
    public Roadmap generateRoadmap(@RequestBody RoadmapRequest request,
                                   Authentication authentication) {

        String email = authentication.getName();

        return roadmapService.generateRoadmap(request.getTopic(), email);
    }
}