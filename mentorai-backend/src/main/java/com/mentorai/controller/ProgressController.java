package com.mentorai.controller;

import com.mentorai.dto.ProgressRequest;
import com.mentorai.model.TopicProgress;
import com.mentorai.service.ProgressService;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping("/update")
    public TopicProgress updateProgress(@RequestBody ProgressRequest request,
                                        Authentication authentication) {

        String email = authentication.getName();

        return progressService.saveProgress(
                request.getTopic(),
                request.getKnowledgeBefore(),
                request.getKnowledgeAfter(),
                email
        );
    }
    
    @GetMapping("/my")
    public List<TopicProgress> getMyProgress(Authentication authentication) {

        String email = authentication.getName();
        return progressService.getUserProgress(email);
    }
}