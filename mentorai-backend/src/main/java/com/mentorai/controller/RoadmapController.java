package com.mentorai.controller;

import com.mentorai.dto.RoadmapItem;
import com.mentorai.dto.RoadmapRequest;
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
    public Roadmap generateRoadmap(@RequestBody RoadmapRequest request,
                                   Authentication authentication){

        //String topic = request.get("topic");
        String email = authentication.getName(); // 🔥 logged-in user

        return roadmapService.generateRoadmap(request, email);
    }
    
    @GetMapping("/my-roadmaps")
    public List<Roadmap> getMyRoadmaps(Authentication authentication){
    	System.out.println("Authentication object:"+authentication);
        String email = authentication.getName();

        return roadmapService.getUserRoadmaps(email);
    }
}