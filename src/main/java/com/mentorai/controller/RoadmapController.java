package com.mentorai.controller;

import com.mentorai.dto.RoadmapItem;
import com.mentorai.model.Roadmap;
import com.mentorai.service.RoadmapService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @PostMapping("/generate")
    public Roadmap generateRoadmap(@RequestBody Map<String,String> request){

        String topic = request.get("topic");

        return roadmapService.generateRoadmap(topic);
    }
    
    @GetMapping("/my-roadmaps")
    public List<Roadmap> getMyRoadmaps(Authentication authentication){

        String email = authentication.getName();

        return roadmapService.getUserRoadmaps(email);
    }
}