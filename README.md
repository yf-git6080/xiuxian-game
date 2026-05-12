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

## 🚀 快速开始

### 安装依赖

```bash
cd /home/gem/.openclaw/workspace/xiuxian-game
npm install
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

## 📁 项目结构

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
