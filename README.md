# ⚔ 3D扫雷 · 战场行动 (Minefield Operation)

第一人称 3D FPS 风格扫雷游戏，基于 Three.js 构建。

## 🎮 快速开始

```bash
# 安装依赖
npm install

# 启动服务器
npm start

# 浏览器打开
http://localhost:3000
```

或者直接用 Python 启动一个静态服务器：

```bash
python -m http.server 8080
# http://localhost:8080/game.html
```

## 🕹 操作

| 操作 | 电脑 | 手机 |
|------|------|------|
| 移动 | WASD | 虚拟摇杆 |
| 环顾 | 鼠标 | 滑动屏幕 |
| 排雷 | 左键 | 💣 按钮 |
| 插旗 / 取消 | 右键 | 🚩 按钮 |
| 行走踩雷 | 走到格子上等待进度条 | 同上 |

## 📱 手机支持

触屏设备自动启用虚拟摇杆和操作按钮，支持多指同时操作（摇杆 + 环视）。

## 🗂 文件说明

| 文件 | 说明 |
|------|------|
| `game.html` | 主游戏（Three.js 单页） |
| `mine-viewer.html` | 地雷模型 3D 查看器 |
| `server.js` | Node.js Express 服务器 |
| `public/` | 工程控制台页面 |

## 🎯 难度

- 🟢 初级 8×8 · 10雷
- 🟡 中级 16×16 · 40雷  
- 🔴 高级 30×16 · 99雷
