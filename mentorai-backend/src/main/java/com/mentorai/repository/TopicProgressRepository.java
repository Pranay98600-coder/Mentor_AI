package com.mentorai.repository;

import com.mentorai.model.TopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
}