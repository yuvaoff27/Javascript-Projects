const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chat-toggle");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Show chatbot on toggle click
chatToggle.addEventListener("click", () => {
  chatbot.style.display = "flex";
});

// Close chatbot
chatClose.addEventListener("click", () => {
  chatbot.style.display = "none";
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Display user message
  const message = document.createElement("div");
  message.classList.add("chat", "outgoing");
  message.innerHTML = `
    <div class="msg">
      <p>${text}</p>
    </div>
  `;
  chatBody.appendChild(message);
  userInput.value = "";

  scrollToBottom();

  // Simulated bot response with a variety of responses
  setTimeout(() => {
    const reply = document.createElement("div");
    reply.classList.add("chat", "incoming");
    reply.innerHTML = `
      <span class="material-icons">🤖</span>
      <div class="msg">
        <p>${getBotResponse(text)}</p>
      </div>
    `;
    chatBody.appendChild(reply);
    scrollToBottom();
  }, 800);
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Randomized bot responses based on the user input
function getBotResponse(userMessage) {
  const responses = [
    "I’m here to help! How can I assist you further?",
    "Sure, let me know your question!",
    "I can provide you with answers! What do you need help with?",
    "Got it! What’s next?",
    "I'm ready to assist. What's on your mind?"
  ];

  // If the user asks specific questions, give a more targeted answer
  if (userMessage.toLowerCase().includes("how are you")) {
    return "I’m just a bot, but I’m doing great! 😊";
  }
  if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
    return "Hello there! 👋 How can I assist you today?";
  }
  if (userMessage.toLowerCase().includes("help")) {
    return "How can I help you? 😊";
  }
  if (userMessage.toLowerCase().includes("name")) {
    return "I’m your friendly AI chatbot! 🤖";
  }

  // Randomize normal responses
  return responses[Math.floor(Math.random() * responses.length)];
}

// Draggable chatbot
let isDragging = false;
let offsetX, offsetY;

chatbot.addEventListener("mousedown", (e) => {
  if (!e.target.closest(".chat-header")) return;
  isDragging = true;
  offsetX = e.clientX - chatbot.getBoundingClientRect().left;
  offsetY = e.clientY - chatbot.getBoundingClientRect().top;
  chatbot.classList.add("dragging");
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  chatbot.style.left = `${e.clientX - offsetX}px`;
  chatbot.style.top = `${e.clientY - offsetY}px`;
  chatbot.style.bottom = "auto";
  chatbot.style.right = "auto";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  chatbot.classList.remove("dragging");
});
