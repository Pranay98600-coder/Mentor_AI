package com.mentorai.model;

import jakarta.persistence.*;

@Entity
public class TopicProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    private int knowledgeBefore;

    private int knowledgeAfter;

    @ManyToOne
    private User user;

    public TopicProgress() {}

    public Long getId() {
        return id;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}