package com.mentorai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class YoutubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public String getVideoUrl(String topic) {

        String url = "https://www.googleapis.com/youtube/v3/search"
                + "?part=snippet"
                + "&type=video"
                + "&maxResults=1"
                + "&q=" + topic + " tutorial"
                + "&key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.getForObject(url, String.class);

        return extractVideoUrl(response);
    }

    private String extractVideoUrl(String json) {

        try {
            int index = json.indexOf("videoId");

            if (index == -1) {
                return "No video found";
            }

            String sub = json.substring(index + 10);
            String videoId = sub.substring(0, sub.indexOf("\""));

            return "https://www.youtube.com/watch?v=" + videoId;

        } catch (Exception e) {
            return "Video unavailable";
        }
    }
}