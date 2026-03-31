import api from "../api/axios";

export const generateRoadmap = async (formData) => {
  const res = await api.post("/roadmap/generate", formData);
  return res.data;
};

export const getMyRoadmaps = async () => {
  const res = await api.get("/roadmap/my-roadmaps");
  return res.data;
};

export const updateProgress = async (topic, knowledgeBefore, knowledgeAfter) => {
  const res = await api.post("/progress/update", {
    topic,
    knowledgeBefore,
    knowledgeAfter,
  });
  return res.data;
};