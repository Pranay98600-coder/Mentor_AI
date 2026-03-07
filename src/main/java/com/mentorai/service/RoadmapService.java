package com.mentorai.service;

import com.mentorai.model.Roadmap;
import com.mentorai.model.User;
import com.mentorai.repository.RoadmapRepository;
import com.mentorai.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;

    public RoadmapService(RoadmapRepository roadmapRepository,
                          UserRepository userRepository) {
        this.roadmapRepository = roadmapRepository;
        this.userRepository = userRepository;
    }

    public Roadmap generateRoadmap(String topic, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String roadmapText = """
        Week 1: Introduction to %s
        Week 2: Core concepts
        Week 3: Intermediate projects
        Week 4: Advanced topics
        Week 5: Build full project
        """.formatted(topic);

        Roadmap roadmap = new Roadmap();
        roadmap.setRoadmapJson(roadmapText);
        roadmap.setUser(user);

        return roadmapRepository.save(roadmap);
    }
}