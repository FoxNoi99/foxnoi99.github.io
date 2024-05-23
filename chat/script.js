document.addEventListener('DOMContentLoaded', () => {
    const boardForm = document.getElementById('board-form');
    const boardLog = document.getElementById('board-log');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');

    // ページ読み込み時にlocalStorageからコメントを読み込む
    loadComments();

    boardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();

        if (username && message) {
            const timestamp = new Date().toLocaleTimeString();
            const comment = { username, message, timestamp };

            // コメントを表示
            addCommentToLog(comment);

            // コメントをlocalStorageに保存
            saveComment(comment);

            messageInput.value = '';
        }
    });

    function addCommentToLog({ username, message, timestamp }) {
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

        boardLog.appendChild(messageElement);
        boardLog.scrollTop = boardLog.scrollHeight;
    }

    function saveComment(comment) {
        const comments = getComments();
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function getComments() {
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : [];
    }

    function loadComments() {
        const comments = getComments();
        comments.forEach(comment => addCommentToLog(comment));
    }
});
