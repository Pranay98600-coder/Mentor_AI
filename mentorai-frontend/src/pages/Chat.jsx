import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { sendMessage } from "../services/chatService";
import "../styles/chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to UI immediately
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");

    try {
      setLoading(true);

      // Call API
      const response = await sendMessage(input);

      console.log("AI RESPONSE:", response);

      // Handle different response formats
      let aiText = "";
      if (typeof response === "string") {
        aiText = response;
      } else if (response.message) {
        aiText = response.message;
      } else if (response.reply) {
        aiText = response.reply;
      } else if (response.text) {
        aiText = response.text;
      } else {
        aiText = "No response received";
      }

      // Add AI response using prev state (IMPORTANT: prevents state overwrite)
      const aiMessage = {
        sender: "ai",
        text: aiText,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("AI unavailable");
      // Add error message to chat
      const errorMessage = {
        sender: "ai",
        text: "Sorry, I'm currently unavailable. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <motion.main
        className="dashboard-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="dashboard-welcome"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Mentor Chat
        </motion.h2>

        <motion.div
          className="chat-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Chat Messages Area */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <motion.div
                className="chat-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Welcome to AI Mentor</h3>
                <p>Ask me anything about your learning journey</p>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user-message" : "ai-message"
                  }`}
                  initial={{
                    opacity: 0,
                    x: msg.sender === "user" ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="chat-bubble"
                    style={{ whiteSpace: "pre-wrap" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {msg.text}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                className="chat-message ai-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="chat-bubble typing">
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.form
            className="chat-input-area"
            onSubmit={handleSend}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {error && (
              <motion.div
                className="chat-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            <div className="chat-input-wrapper">
              <motion.input
                type="text"
                className="chat-input"
                placeholder="Ask your AI Mentor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.button
                type="submit"
                className="chat-send-btn"
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Send
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Chat;
