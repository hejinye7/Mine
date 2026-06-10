const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const STEP_DIR = path.join(__dirname, '步骤');

app.use(express.json());
app.use(express.static('public'));

// 读取用户反馈
app.get('/api/feedback', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(STEP_DIR, 'user_feedback.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch { res.json({ messages: [] }); }
});

// 提交用户反馈
app.post('/api/feedback', (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ ok: false });
  const file = path.join(STEP_DIR, 'user_feedback.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.messages = data.messages || [];
  data.messages.push({ text: message, time: Date.now(), read: false });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ ok: true });
  console.log(`[用户反馈] ${message}`);
});

// 读取 AI 回答
app.get('/api/response', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(STEP_DIR, 'ai_response.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch { res.json([]); }
});

// 写入 AI 回答
function writeResponse(text) {
  const file = path.join(STEP_DIR, 'ai_response.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.push({ text, time: Date.now() });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// 检查新用户消息（由 Claude 调用）
app.get('/api/poll', (req, res) => {
  const file = path.join(STEP_DIR, 'user_feedback.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const unread = (data.messages || []).filter(m => !m.read);
  res.json({ count: unread.length, messages: unread });
});

// 标记已读
app.post('/api/markread', (req, res) => {
  const file = path.join(STEP_DIR, 'user_feedback.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  (data.messages || []).forEach(m => m.read = true);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ ok: true });
});

// 步骤日志
app.get('/api/steps', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(STEP_DIR, 'steps.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch { res.json([]); }
});

function logStep(msg) {
  const file = path.join(STEP_DIR, 'steps.json');
  let data = [];
  try { data = JSON.parse(fs.readFileSync(file, 'utf-8')); } catch {}
  data.push({ text: msg, time: Date.now() });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`[步骤 0] 服务器已启动于 http://localhost:${PORT}`);
  console.log(`[步骤 0] 游戏: http://localhost:${PORT}/game.html`);
  console.log(`[步骤 0] 交流: http://localhost:${PORT}/`);
  logStep('服务器已启动');
});

module.exports = { writeResponse, logStep };
