package com.mentorai.repository;

import com.mentorai.model.Roadmap;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.mentorai.model.User;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
	List<Roadmap> findByUser(User user);
	void deleteById(Long id);
	
}