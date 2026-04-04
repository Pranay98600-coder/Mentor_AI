package com.mentorai.service;

import com.mentorai.model.Roadmap;
import com.mentorai.model.TopicProgress;
import com.mentorai.model.User;
import com.mentorai.repository.RoadmapRepository;
import com.mentorai.repository.TopicProgressRepository;
import com.mentorai.repository.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    private final TopicProgressRepository progressRepository;
    private final UserRepository userRepository;
   

    public ProgressService(TopicProgressRepository progressRepository,
                           UserRepository userRepository ) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        
    }

    public TopicProgress saveProgress(String topic,
            int before,
            int after,
            String email) {

User user = userRepository.findByEmail(email)
.orElseThrow(() -> new RuntimeException("User not found"));

TopicProgress progress = progressRepository
.findByUserAndTopic(user, topic)
.orElse(new TopicProgress());

progress.setTopic(topic);
progress.setKnowledgeBefore(before);
progress.setKnowledgeAfter(after);
progress.setUser(user);

return progressRepository.save(progress);
}
    
    public List<TopicProgress> getUserProgress(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return progressRepository.findByUser(user);
    }
    
    
}