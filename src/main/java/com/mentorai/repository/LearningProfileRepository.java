package com.mentorai.repository;

import com.mentorai.model.LearningProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningProfileRepository extends JpaRepository<LearningProfile, Long> {
}