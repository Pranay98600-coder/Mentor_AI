package com.mentorai.service;

import com.mentorai.dto.RoadmapItem;
import com.mentorai.model.Roadmap;
import com.mentorai.model.RoadmapTopic;
import com.mentorai.model.User;
import com.mentorai.repository.RoadmapRepository;
import com.mentorai.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;
    private final YoutubeService youtubeService;

    public RoadmapService(RoadmapRepository roadmapRepository,
                          UserRepository userRepository,
                          YoutubeService youtubeService) {

        this.roadmapRepository = roadmapRepository;
        this.userRepository = userRepository;
        this.youtubeService = youtubeService;
    }

    public Roadmap generateRoadmap(String mainTopic) {

        List<String> topics = List.of(
                "Java Basics",
                "OOP Concepts",
                "Spring Core",
                "Spring Boot",
                "Spring Security"
        );

        Roadmap roadmap = new Roadmap();
        roadmap.setMainTopic(mainTopic);
        roadmap.setCreatedAt(LocalDateTime.now());

        List<RoadmapTopic> roadmapTopics = new ArrayList<>();

        for (String topic : topics) {

            String videoUrl = youtubeService.getVideoUrl(topic);

            RoadmapTopic roadmapTopic = new RoadmapTopic();
            roadmapTopic.setTopic(topic);
            roadmapTopic.setVideoUrl(videoUrl);
            roadmapTopic.setRoadmap(roadmap);

            roadmapTopics.add(roadmapTopic);
        }

        roadmap.setTopics(roadmapTopics);

        return roadmapRepository.save(roadmap);
    }
    
    public List<Roadmap> getUserRoadmaps(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return roadmapRepository.findByUser(user);
    }
}