(async function() {
  const response = await fetch('kb.json');
  const kb = await response.json();
  const log = [];
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const list = document.getElementById('message-list');

  function addMessage(text, cls) {
    const li = document.createElement('li');
    li.textContent = text;
    if (cls) li.classList.add(cls);
    list.appendChild(li);
    list.scrollTop = list.scrollHeight;
  }

  function queryKB(query) {
  const q = query.toLowerCase();
  return kb.find(a =>
    a.title.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q) ||
    (a.aliases && a.aliases.some(alias => q.includes(alias.toLowerCase())))
  );
}

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userQ = input.value.trim();
    if (!userQ) return;
    addMessage('You: ' + userQ, 'user');
    const art = queryKB(userQ) || { content: "Sorry, I don't have that yet." };
    addMessage('Bot: ' + art.content, 'bot');
    log.push({ timestamp: Date.now(), query: userQ, articleId: art.id || null });
    input.value = '';
  });
})();
