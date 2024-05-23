document.addEventListener('DOMContentLoaded', (event) => {
    const chatForm = document.getElementById('chat-form');
    const chatLog = document.getElementById('chat-log');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (username && message) {
            const timestamp = new Date().toLocaleTimeString();
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            
            const timestampElement = document.createElement('span');
            timestampElement.classList.add('timestamp');
            timestampElement.textContent = `[${timestamp}] `;
            
            const usernameElement = document.createElement('strong');
            usernameElement.textContent = `${username}: `;
            
            const textElement = document.createElement('span');
            textElement.textContent = message;
            
            messageElement.appendChild(timestampElement);
            messageElement.appendChild(usernameElement);
            messageElement.appendChild(textElement);
            
            chatLog.appendChild(messageElement);
            chatLog.scrollTop = chatLog.scrollHeight;

            // Log出力
            console.log(`${timestamp} - ${username}: ${message}`);

            messageInput.value = '';
        }
    });
});
