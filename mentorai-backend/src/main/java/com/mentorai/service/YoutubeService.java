package com.mentorai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class YoutubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public String getVideoUrl(String topic) {

        try {
            String url = "https://www.googleapis.com/youtube/v3/search"
                    + "?part=snippet"
                    + "&type=video"
                    + "&maxResults=1"
                    + "&q=" + topic + " tutorial"
                    + "&key=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            String response = restTemplate.getForObject(url, String.class);

            return extractVideoUrl(response);

        } catch (Exception e) {

            System.out.println("YouTube API ERROR: " + e.getMessage());

            // 🔥 fallback video
            return "https://www.youtube.com/results?search_query=" + topic + "+full course tutorial";
        }
    }

    private String extractVideoUrl(String json) {

        try {
            // find videoId safely
            String videoIdKey = "\"videoId\": \"";
            int start = json.indexOf(videoIdKey);

            if (start == -1) {
                return null;
            }

            start += videoIdKey.length();
            int end = json.indexOf("\"", start);

            String videoId = json.substring(start, end);

            return "https://www.youtube.com/watch?v=" + videoId;

        } catch (Exception e) {
            return null;
        }
    }
}