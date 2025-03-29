document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let message = inputField.value.trim();
    let chatBox = document.getElementById("chat-box");
    let loading = document.getElementById("loading");

    if (!message) return;
    
    chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
    inputField.value = "";
    loading.style.display = "block";

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = "none";
        let botResponse = formatBotResponse(data.response);
        chatBox.innerHTML += `<div><b>Bot:</b><br>${botResponse}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(() => {
        loading.style.display = "none";
        chatBox.innerHTML += `<div><b>Bot:</b> Error connecting to server.</div>`;
    });
}

function formatBotResponse(response) {
    let points = response.split("\n").map(line => `<li>${line.trim()}</li>`).join("");
    return `<ul>${points}</ul>`;
}
