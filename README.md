# 🎮 修仙挂机游戏

一个基于 TypeScript 开发的 2D 挂机放置类修仙游戏，支持抖音小游戏平台。

## 📖 项目介绍

这是一个挂机放置类修仙游戏，玩家可以通过挂机自动战斗获得经验和资源，不断提升境界和实力。

### 🌟 核心特性

- ✅ **自动战斗系统** - 每秒自动战斗，获得经验和灵石
- ✅ **境界突破** - 从练气期到仙人，九大境界等你突破
- ✅ **功法修炼** - 12种功法，提升攻击、防御、修炼速度
- ✅ **装备系统** - 武器、防具、饰品，装备强化属性
- ✅ **离线收益** - 离线挂机也能获得奖励
- ✅ **数据存储** - 自动保存游戏进度

## 💻 环境要求

### 必需软件

#### 1. Node.js (必需)
- **版本要求**: Node.js 14.0.0 或更高版本（推荐 16.x 或 18.x）
- **下载地址**: https://nodejs.org/
- **验证安装**:
  ```bash
  node --version  # 应显示 v14.0.0 或更高
  npm --version   # 应显示 npm 版本号
  ```

#### 2. npm 或 yarn (必需)
- **npm**: 随 Node.js 自动安装
- **yarn** (可选):
  ```bash
  npm install -g yarn
  yarn --version
  ```

#### 3. Git (推荐)
- **用途**: 克隆仓库、版本控制
- **下载地址**: https://git-scm.com/
- **验证安装**:
  ```bash
  git --version
  ```

#### 4. TypeScript (自动安装)
- 项目会自动安装 TypeScript 依赖
- **手动安装** (可选):
  ```bash
  npm install -g typescript
  tsc --version
  ```

### 推荐工具

#### 代码编辑器
- **Visual Studio Code** (推荐): https://code.visualstudio.com/
  - 推荐扩展:
    - TypeScript Hero
    - ESLint
    - Prettier - Code formatter
    - GitLens

- **WebStorm** (付费): https://www.jetbrains.com/webstorm/

#### 抖音小游戏开发 (可选)
如果要在抖音小游戏平台发布：

1. **字节跳动开发者工具**
   - 下载地址: https://developer.tiktok.com/docs/minigame/development-tool
   - 用于调试和发布抖音小游戏

2. **Cocos Creator** (可选，用于可视化开发)
   - 版本: v3.8 或更高
   - 下载地址: https://www.cocos.com/creator-download
   - 用于创建游戏UI和动画

### 操作系统支持

| 操作系统 | 支持状态 | 说明 |
|---------|---------|------|
| Windows 10+ | ✅ 完全支持 | 推荐使用 PowerShell 或 Git Bash |
| macOS 10.14+ | ✅ 完全支持 | 推荐使用 Terminal |
| Linux | ✅ 完全支持 | 支持 Ubuntu、Debian、CentOS 等 |

---

## 🚀 快速开始

### 方法一：从GitHub克隆（推荐）

```bash
# 1. 克隆仓库
git clone https://github.com/yf-git6080/xiuxian-game.git

# 2. 进入项目目录
cd xiuxian-game

# 3. 安装依赖
npm install

# 4. 编译项目
npm run build

# 5. 运行游戏
npm start
```

### 方法二：下载源码

1. 访问 https://github.com/yf-git6080/xiuxian-game
2. 点击 "Code" → "Download ZIP"
3. 解压文件
4. 在项目目录打开终端
5. 执行以下命令:

```bash
npm install
npm run build
npm start
```

### 方法三：直接运行（本地已有项目）

```bash
# 进入项目目录
cd /home/gem/.openclaw/workspace/xiuxian-game

# 安装依赖
npm install

# 编译项目
npm run build

# 运行游戏
npm start
```

### 编译项目

```bash
npm run build
```

### 运行游戏

```bash
npm start
```

## 🎯 游戏玩法

### 境界系统

游戏包含九大境界：

1. **练气期** (Lv.1-9) - 修炼基础阶段
2. **筑基期** (Lv.10-19) - 筑建道基
3. **金丹期** (Lv.20-29) - 凝聚金丹
4. **元婴期** (Lv.30-39) - 元婴出窍
5. **化神期** (Lv.40-49) - 化神返虚
6. **合体期** (Lv.50-59) - 天人合一
7. **大乘期** (Lv.60-69) - 功行圆满
8. **渡劫期** (Lv.70-79) - 渡过天劫
9. **仙人** (Lv.80-100) - 超脱凡尘

### 功法系统

- **攻击型功法** - 提升攻击力
- **防御型功法** - 提升防御力
- **辅助型功法** - 提升修炼速度

### 装备系统

- **武器** - 提升攻击力
- **防具** - 提升防御和生命
- **饰品** - 提升灵力和全属性

### 战斗系统

- 自动战斗，每秒一次
- 根据等级自动匹配怪物
- 胜利获得经验、灵石和装备
- 失败自动恢复生命

### 离线收益

- 离线最多计算12小时收益
- 离线收益效率为在线的50%
- 自动发放经验和灵石

### 验证安装

运行以下命令验证所有依赖是否正确安装:

```bash
# 检查 Node.js
node --version
# 预期输出: v14.x.x 或更高

# 检查 npm
npm --version
# 预期输出: 6.x.x 或更高

# 检查 TypeScript
npx tsc --version
# 预期输出: Version 5.x.x

# 检查项目依赖
cd xiuxian-game
npm list
# 应该显示 typescript 和 @types/node

# 测试编译
npm run build
# 应该成功编译，无错误信息

# 测试运行
npm start
# 应该看到游戏启动信息
```

如果所有检查都通过，恭喜你，环境配置成功！🎮

---

```
xiuxian-game/
├── src/
│   ├── core/              # 核心模块
│   │   └── GameController.ts
│   ├── data/              # 数据配置
│   │   ├── PlayerData.ts
│   │   ├── RealmConfig.ts
│   │   ├── SkillConfig.ts
│   │   ├── EquipmentConfig.ts
│   │   └── MonsterConfig.ts
│   ├── systems/           # 游戏系统
│   │   ├── BattleSystem.ts
│   │   ├── LevelSystem.ts
│   │   └── StorageSystem.ts
│   ├── ui/                # UI界面（待开发）
│   ├── utils/             # 工具函数
│   ├── platform/          # 平台适配（抖音小游戏）
│   └── main.ts            # 主入口
├── dist/                  # 编译输出
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 开发指南

### 编译项目

```bash
# 编译一次
npm run build

# 监听模式
npm run dev
```

### 添加新功法

在 `src/data/SkillConfig.ts` 中添加：

```typescript
{
  id: 'skill_xxx',
  name: '功法名称',
  type: SkillType.ATTACK,
  quality: SkillQuality.RARE,
  level: 1,
  maxLevel: 20,
  bonus: 1.3,
  bonusPerLevel: 0.1,
  cost: 1000,
  description: '功法描述',
  unlockLevel: 20
}
```

### 添加新装备

在 `src/data/EquipmentConfig.ts` 中添加：

```typescript
{
  id: 'equipment_xxx',
  name: '装备名称',
  type: EquipmentType.WEAPON,
  quality: EquipmentQuality.EPIC,
  level: 40,
  stats: { attack: 200 },
  description: '装备描述',
  dropRate: 0.05
}
```

### 添加新怪物

在 `src/data/MonsterConfig.ts` 中添加：

```typescript
{
  id: 'monster_xxx',
  name: '怪物名称',
  level: 50,
  hp: 30000,
  attack: 1500,
  defense: 800,
  exp: 25000,
  gold: 20000,
  dropItems: ['weapon_006'],
  description: '怪物描述'
}
```

## 🎨 抖音小游戏适配

### 环境检测

游戏已适配抖音小游戏环境，自动检测运行环境：

```typescript
if (typeof tt !== 'undefined' && tt.getStorageSync) {
  // 抖音小游戏环境
} else if (typeof localStorage !== 'undefined') {
  // 浏览器环境
} else {
  // Node.js环境
}
```

### 导出小游戏

1. 安装 Cocos Creator
2. 创建新项目
3. 将 `src` 文件导入
4. 配置抖音小游戏发布设置
5. 构建并发布

## 💰 变现设计

### 激励视频广告

- 观看广告获得双倍收益（2小时）
- 观看广告获得仙玉
- 观看广告立即突破境界

### 内购设计

- **月卡** - 每天获得仙玉 + 特权
- **成长基金** - 等级达到要求返还仙玉
- **首充礼包** - 强力装备/功法

## 📊 游戏数据

### 平衡性设计

- **经验增长** - 指数公式：`100 * 1.15^(level-1)`
- **境界加成** - 从1.0倍到50.0倍
- **掉落概率** - 普通装备30%，传说装备1%
- **离线效率** - 50%在线效率

---

## ❓ 常见问题

### 1. Node.js 版本不兼容怎么办？

**问题**: 提示 Node.js 版本过低

**解决方案**:
```bash
# 使用 nvm (Node Version Manager) 切换版本
nvm install 16
nvm use 16

# 或者直接从官网下载最新版本
# https://nodejs.org/
```

### 2. npm install 失败怎么办？

**问题**: 安装依赖时报错

**解决方案**:
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install

# 如果还是失败，尝试使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

### 3. 编译报错怎么办？

**问题**: `npm run build` 失败

**解决方案**:
```bash
# 检查 TypeScript 版本
npm list typescript

# 重新安装 TypeScript
npm install typescript@latest --save-dev

# 清除编译缓存
rm -rf dist
npm run build
```

### 4. 游戏运行没有反应？

**问题**: `npm start` 后没有输出

**解决方案**:
```bash
# 确认已编译
npm run build

# 检查 dist 目录是否存在
ls dist/

# 手动运行
node dist/main.js
```

### 5. 如何停止游戏？

**解决方案**:
- 在终端按 `Ctrl + C` 停止游戏
- 游戏会自动保存进度

### 6. 如何修改玩家名称？

**解决方案**:
修改 `src/main.ts` 文件最后一行:
```typescript
app.start('你的角色名称');
```

然后重新编译运行:
```bash
npm run build
npm start
```

### 7. 如何修改游戏参数？

**调整战斗速度**: 修改 `src/main.ts`
```typescript
this.game = new GameController({
  autoSaveInterval: 30000,  // 自动保存间隔(毫秒)
  battleInterval: 1000     // 战斗间隔(毫秒)，改为500表示每0.5秒战斗一次
});
```

**调整经验倍率**: 修改 `src/systems/LevelSystem.ts`
```typescript
getExpNeeded(level: number): number {
  return Math.floor(100 * Math.pow(1.15, level - 1));  // 修改1.15调整经验增长速度
}
```

---

## 🔧 故障排除

### 检查环境

运行诊断脚本:

```bash
# 检查 Node.js
node --version

# 检查 npm
npm --version

# 检查 TypeScript
tsc --version

# 检查项目结构
ls -la
```

### 重新安装

如果遇到任何问题，尝试完全重新安装:

```bash
# 删除所有依赖
rm -rf node_modules package-lock.json dist

# 重新安装
npm install

# 重新编译
npm run build

# 运行
npm start
```

---

## 🐛 已知问题

- [ ] UI界面待开发
- [ ] 音效系统待添加
- [ ] 多人对战待开发
- [ ] 宗门系统待开发

## 📝 更新日志

### v1.0.0 (2026-05-12)

- ✅ 完成核心游戏系统
- ✅ 实现自动战斗和升级
- ✅ 实现境界和功法系统
- ✅ 实现装备和掉落系统
- ✅ 实现离线收益
- ✅ 完成数据存储

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**开发者**: OpenClaw  
**版本**: 1.0.0  
**最后更新**: 2026-05-12
