package com.mentorai.repository;

import com.mentorai.model.RoadmapTopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadmapTopicRepository extends JpaRepository<RoadmapTopic, Long> {
}