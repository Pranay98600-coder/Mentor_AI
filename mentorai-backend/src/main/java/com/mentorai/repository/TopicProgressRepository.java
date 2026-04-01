package com.mentorai.repository;

import com.mentorai.model.TopicProgress;
import com.mentorai.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
	List<TopicProgress> findByUser(User user);

	Optional<TopicProgress> findByUserAndTopic(User user, String topic);
}