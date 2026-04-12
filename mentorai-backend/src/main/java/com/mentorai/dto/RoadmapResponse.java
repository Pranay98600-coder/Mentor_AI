package com.mentorai.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

import com.mentorai.model.RoadmapTopic;

@Data
@Builder
public class RoadmapResponse {
    private Long id;
    private String mainTopic;
    private List<RoadmapTopic> topics;
    private UserResponse user;
}