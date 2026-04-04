package com.mentorai.service;

import com.mentorai.dto.RoadmapItem;
import com.mentorai.dto.RoadmapRequest;
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
    private final AiService aiService;

    public RoadmapService(RoadmapRepository roadmapRepository,
                          UserRepository userRepository,
                          YoutubeService youtubeService,AiService aiService) {

        this.roadmapRepository = roadmapRepository;
        this.userRepository = userRepository;
        this.youtubeService = youtubeService;
        this.aiService = aiService;
    }
    
    
    
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

                "Rules:\n" +
                "- Give a complete roadmap with 15 to 20 topics "+
                "-Each topic MUST include the main subject"+
                "-Exmaple:if topic is c++ then 'C++ Control Flow' , 'C++ OOP' " +
                "- Each topic should be short and clear\n" +
                "- Order them from beginner to advanced\n" +
                "- Do NOT add explanation\n" +
                "- Only return plain list\n";
    }

    
    
    
    public Roadmap generateRoadmap(RoadmapRequest request, String email) {

        // 🔥 get user from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String mainTopic = request.getTopic();

        String prompt = buildPrompt(request);
        List<String> topics = aiService.generateRoadmap(prompt);

        Roadmap roadmap = new Roadmap();
        roadmap.setMainTopic(mainTopic);
        roadmap.setCreatedAt(LocalDateTime.now());

        // 🔥 VERY IMPORTANT (link roadmap to user)
        roadmap.setUser(user);

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
    
    
    
    public void deleteRoadmap(Long roadmapId, String email) {

        // Get user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get roadmap
        Roadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new RuntimeException("Roadmap not found"));

        // 🔥 SECURITY CHECK (VERY IMPORTANT)
        if (!roadmap.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this roadmap");
        }

        // Delete
        roadmapRepository.delete(roadmap);
    }
    
    public Roadmap regenerateRoadmap(Long roadmapId,
            RoadmapRequest request,
            String email) {

// 🔥 Get user
    	User user = userRepository.findByEmail(email)
    			.orElseThrow(() -> new RuntimeException("User not found"));

// 🔥 Get existing roadmap
    	Roadmap oldRoadmap = roadmapRepository.findById(roadmapId)
    			.orElseThrow(() -> new RuntimeException("Roadmap not found"));

// 🔥 SECURITY CHECK
    	if (!oldRoadmap.getUser().getId().equals(user.getId())) {
    		throw new RuntimeException("Unauthorized");
    	}

// 🔥 DELETE OLD ROADMAP
    	roadmapRepository.delete(oldRoadmap);

// 🔥 GENERATE NEW (reuse existing logic)
    	return generateRoadmap(request, email);
    }
    
    
}