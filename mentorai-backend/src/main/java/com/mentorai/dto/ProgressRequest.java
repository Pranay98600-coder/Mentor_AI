package com.mentorai.dto;

public class ProgressRequest {

    private String topic;
    private int knowledgeBefore;
    private int knowledgeAfter;

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getKnowledgeBefore() {
        return knowledgeBefore;
    }

    public void setKnowledgeBefore(int knowledgeBefore) {
        this.knowledgeBefore = knowledgeBefore;
    }

    public int getKnowledgeAfter() {
        return knowledgeAfter;
    }

    public void setKnowledgeAfter(int knowledgeAfter) {
        this.knowledgeAfter = knowledgeAfter;
    }
}