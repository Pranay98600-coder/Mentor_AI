package com.mentorai.dto;

public class RoadmapItem {

    private String topic;
    private String videoUrl;

    public RoadmapItem() {}

    public RoadmapItem(String topic, String videoUrl) {
        this.topic = topic;
        this.videoUrl = videoUrl;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}