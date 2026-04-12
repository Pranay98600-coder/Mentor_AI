package com.mentorai.service;

import com.mentorai.dto.RoadmapRequest;
import com.mentorai.model.Roadmap;
import com.mentorai.model.RoadmapTopic;
import com.mentorai.model.User;
import com.mentorai.repository.RoadmapRepository;
import com.mentorai.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;
    private final YoutubeService youtubeService;
    private final AiService aiService;

    public RoadmapService(RoadmapRepository roadmapRepository,
                          UserRepository userRepository,
                          YoutubeService youtubeService,
                          AiService aiService) {

        this.roadmapRepository = roadmapRepository;
        this.userRepository = userRepository;
        this.youtubeService = youtubeService;
        this.aiService = aiService;
    }

    // 🔥 BUILD AI PROMPT
    private String buildPrompt(RoadmapRequest request) {

        return "You are an expert software mentor.\n\n" +

                "Create a personalized learning roadmap.\n\n" +

                "Topic: " + request.getTopic() + "\n" +
                "Level: " + request.getLevel() + "\n" +
                "Goal: " + request.getGoal() + "\n" +
                "Daily Time: " + request.getTime() + "\n" +
                "Timeline: " + request.getTimeline() + "\n" +
                "Learning Style: " + request.getLearningStyle() + "\n" +
                "Working Status: " + request.getWorkingStatus() + "\n\n" +
                "Special Instructions: " +
                (request.getCustomNote() != null ? request.getCustomNote() : "None") + "\n\n" +

                "Rules:\n" +
                "- Give a complete roadmap with 15 to 20 topics\n" +
                "- Each topic MUST include the main subject\n" +
                "- Example: 'C++ Control Flow', 'C++ OOP'\n" +
                "- Each topic should be short and clear\n" +
                "- Order from beginner to advanced\n" +
                "- Do NOT add explanation\n" +
                "- Only return plain list\n";
    }

    // 🔥 GENERATE ROADMAP
    public Roadmap generateRoadmap(RoadmapRequest request, String email) {

        // Get user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String mainTopic = request.getTopic();

        String prompt = buildPrompt(request);
        List<String> topics = aiService.generateRoadmap(prompt);

        Roadmap roadmap = new Roadmap();
        roadmap.setMainTopic(mainTopic);
        roadmap.setCreatedAt(LocalDateTime.now());
        roadmap.setUser(user); // 🔥 link user

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

    // 🔥 GET USER ROADMAPS
    public List<Roadmap> getUserRoadmaps(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return roadmapRepository.findByUser(user);
    }

    // 🔥 DELETE ROADMAP
    public void deleteRoadmap(Long roadmapId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new RuntimeException("Roadmap not found"));

        // 🔐 SECURITY CHECK
        if (!roadmap.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this roadmap");
        }

        roadmapRepository.delete(roadmap);
    }

    // 🔥 REGENERATE ROADMAP (CLEAN VERSION)
    public Roadmap regenerateRoadmap(Long roadmapId,
                                     RoadmapRequest request,
                                     String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Roadmap oldRoadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new RuntimeException("Roadmap not found"));

        // 🔐 SECURITY CHECK
        if (!oldRoadmap.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        // Delete old
        roadmapRepository.delete(oldRoadmap);

        // Generate new
        return generateRoadmap(request, email);
    }
}