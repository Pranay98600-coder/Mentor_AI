import React, { useEffect, useRef, useState } from "react";
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
      <main className="dashboard-main">
        <h2 className="dashboard-welcome">AI Mentor Chat</h2>

        <div className="chat-container">
          {/* Chat Messages Area */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <h3>Welcome to AI Mentor</h3>
                <p>Ask me anything about your learning journey</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                <div className="chat-bubble" style={{ whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message ai-message">
                <div className="chat-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="chat-input-area" onSubmit={handleSend}>
            {error && <div className="chat-error">{error}</div>}
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask your AI Mentor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;
