# 快速安装指南

## 📋 安装清单

在开始之前，请确保你已经安装了以下软件：

### ✅ 必需软件

| 软件 | 版本要求 | 检查命令 | 下载地址 |
|------|---------|---------|---------|
| **Node.js** | 14.0.0+ | `node --version` | https://nodejs.org/ |
| **npm** | 6.0.0+ | `npm --version` | 随 Node.js 安装 |
| **Git** | 任意版本 | `git --version` | https://git-scm.com/ |

### 🔧 推荐软件

| 软件 | 用途 | 下载地址 |
|------|------|---------|
| **Visual Studio Code** | 代码编辑器 | https://code.visualstudio.com/ |
| **TypeScript** | 自动安装 | - |

---

## 🚀 三步快速开始

### 第一步：下载项目

**选项A：使用Git克隆（推荐）**
```bash
git clone https://github.com/yf-git6080/xiuxian-game.git
cd xiuxian-game
```

**选项B：下载ZIP**
1. 访问 https://github.com/yf-git6080/xiuxian-game
2. 点击 "Code" → "Download ZIP"
3. 解压并进入目录

### 第二步：安装依赖

```bash
npm install
```

等待安装完成（通常需要10-30秒）。

### 第三步：运行游戏

```bash
npm run build  # 编译项目
npm start      # 启动游戏
```

---

## 🎮 验证安装

### 检查环境

```bash
# 1. 检查 Node.js
node --version
# 应该显示: v14.x.x 或更高

# 2. 检查 npm
npm --version
# 应该显示: 6.x.x 或更高

# 3. 检查依赖
npm list typescript
# 应该显示: typescript@5.x.x
```

### 测试运行

```bash
# 编译项目
npm run build

# 应该看到编译成功的提示

# 运行游戏
npm start

# 应该看到以下输出:
# ====================================
#     🎮 修仙挂机游戏 v1.0
# ====================================
```

---

## ❓ 遇到问题？

### 问题1：npm install 失败

```bash
# 尝试清除缓存
npm cache clean --force

# 删除并重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题2：编译失败

```bash
# 重新安装 TypeScript
npm install typescript@latest --save-dev

# 清除并重新编译
rm -rf dist
npm run build
```

### 问题3：运行失败

```bash
# 确认已编译
ls dist/

# 应该看到 main.js 文件

# 手动运行
node dist/main.js
```

---

## 📚 详细文档

完整的安装说明和开发指南，请查看：

- **README.md** - 项目文档
- **开发指南** - 在 README.md 的"开发指南"部分

---

## 💡 提示

- 首次运行可能需要几秒钟初始化
- 按 `Ctrl + C` 可以退出游戏
- 游戏会自动保存进度
- 每10秒会显示一次状态

---

## 🎯 下一步

安装成功后，你可以：

1. **玩游戏** - 直接运行并体验
2. **改代码** - 修改游戏参数和逻辑
3. **加功能** - 添加新的游戏系统
4. **做UI** - 使用 Cocos Creator 创建界面

---

**祝你玩得开心！🎮**

如有问题，欢迎在 GitHub 提 Issue: https://github.com/yf-git6080/xiuxian-game/issues
