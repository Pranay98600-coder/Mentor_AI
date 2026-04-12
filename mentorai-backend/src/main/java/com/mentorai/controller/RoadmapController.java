package com.mentorai.controller;

import com.mentorai.dto.RoadmapRequest;
import com.mentorai.dto.RoadmapResponse;
import com.mentorai.dto.UserResponse;
import com.mentorai.model.Roadmap;
import com.mentorai.service.RoadmapService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    // 🔥 GENERATE
    @PostMapping("/generate")
    public RoadmapResponse generateRoadmap(@RequestBody RoadmapRequest request,
                                           Authentication authentication){

        String email = authentication.getName();

        Roadmap roadmap = roadmapService.generateRoadmap(request, email);

        return mapToResponse(roadmap);
    }

    // 🔥 GET ALL USER ROADMAPS
    @GetMapping("/my-roadmaps")
    public List<RoadmapResponse> getMyRoadmaps(Authentication authentication){

        String email = authentication.getName();

        return roadmapService.getUserRoadmaps(email)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 🔥 DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteRoadmap(@PathVariable Long id,
                               Authentication authentication) {

        String email = authentication.getName();

        roadmapService.deleteRoadmap(id, email);

        return "Roadmap deleted successfully";
    }

    // 🔥 REGENERATE
    @PutMapping("/regenerate/{id}")
    public RoadmapResponse regenerateRoadmap(@PathVariable Long id,
                                             @RequestBody RoadmapRequest request,
                                             Authentication authentication) {

        String email = authentication.getName();

        Roadmap roadmap = roadmapService.regenerateRoadmap(id, request, email);

        return mapToResponse(roadmap);
    }

    // 🔥 COMMON MAPPER METHOD (VERY IMPORTANT)
    private RoadmapResponse mapToResponse(Roadmap roadmap){

        UserResponse userResponse = UserResponse.builder()
                .id(roadmap.getUser().getId())
                .name(roadmap.getUser().getName())
                .email(roadmap.getUser().getEmail())
                .build();

        return RoadmapResponse.builder()
                .id(roadmap.getId())
                .mainTopic(roadmap.getMainTopic())
                .topics(roadmap.getTopics())
                .user(userResponse)
                .build();
    }
}