# 🏗️ 系统架构文档

**版本**: v1.0.0  
**最后更新**: 2026-05-12

---

## 📋 目录

- [架构概述](#架构概述)
- [技术栈](#技术栈)
- [模块设计](#模块设计)
- [数据流](#数据流)
- [扩展性设计](#扩展性设计)

---

## 🎯 架构概述

### 设计原则

1. **模块化**: 各系统独立，低耦合
2. **可扩展**: 易于添加新功能
3. **可维护**: 代码结构清晰
4. **高性能**: 支持大量计算

### 整体架构

```
┌─────────────────────────────────────────┐
│           游戏主控制器                     │
│         GameController                   │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
   │ 战斗系统 │ │ 升级系统 │ │ 存储系统 │
   │ Battle  │ │  Level  │ │ Storage │
   └─────────┘ └─────────┘ └─────────┘
        │           │           │
        └───────────┼───────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
   │ 玩家数据 │ │ 怪物数据 │ │ 装备数据 │
   │ Player  │ │ Monster │ │Equipmen │
   └─────────┘ └─────────┘ └─────────┘
```

---

## 💻 技术栈

### 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **TypeScript** | 5.0+ | 主要开发语言 |
| **Node.js** | 14+ | 运行环境 |
| **npm** | 6+ | 包管理器 |

### 平台支持

| 平台 | 支持方式 | 状态 |
|------|---------|------|
| **Node.js** | 直接运行 | ✅ 已支持 |
| **浏览器** | 需打包 | ⏳ 待开发 |
| **抖音小游戏** | API适配 | ✅ 已适配 |

---

## 🧩 模块设计

### 1. 核心层 (Core)

**GameController** - 游戏主控制器
```typescript
class GameController {
  - player: PlayerData           // 玩家数据
  - battleSystem: BattleSystem   // 战斗系统
  - levelSystem: LevelSystem     // 升级系统
  - storageSystem: StorageSystem // 存储系统
  
  + init(playerName: string)     // 初始化游戏
  + start()                      // 开始游戏
  + stop()                       // 停止游戏
  + saveGame()                   // 保存游戏
  + loadGame()                   // 加载游戏
}
```

**职责**:
- 协调各系统运作
- 管理游戏循环
- 处理事件分发

### 2. 系统层 (Systems)

#### BattleSystem - 战斗系统

```typescript
class BattleSystem {
  + calculatePlayerStats(player: PlayerData)
  + autoBattle(player: PlayerData, monster: MonsterConfig)
  + idleBattle(player: PlayerData, duration: number)
  + calculateOfflineReward(player: PlayerData, offlineTime: number)
}
```

**职责**:
- 战斗计算
- 伤害计算
- 挂机收益计算

#### LevelSystem - 升级系统

```typescript
class LevelSystem {
  + getExpNeeded(level: number)
  + addExp(player: PlayerData, exp: number)
  + checkBreakthrough(player: PlayerData)
  + breakthrough(player: PlayerData)
}
```

**职责**:
- 经验计算
- 等级提升
- 境界突破

#### StorageSystem - 存储系统

```typescript
class StorageSystem {
  + savePlayerData(player: PlayerData)
  + loadPlayerData(playerId: string)
  + getOfflineTime()
  + saveSettings(settings: any)
}
```

**职责**:
- 数据持久化
- 离线时间计算
- 设置管理

### 3. 数据层 (Data)

#### PlayerData - 玩家数据

```typescript
interface PlayerData {
  // 基础信息
  id: string
  name: string
  level: number
  exp: number
  
  // 境界
  realm: string
  realmLevel: number
  
  // 属性
  hp: number
  maxHp: number
  attack: number
  defense: number
  
  // 资源
  gold: number
  gems: number
  
  // 装备和功法
  skills: string[]
  equipment: {...}
}
```

#### MonsterConfig - 怪物配置

```typescript
interface MonsterConfig {
  id: string
  name: string
  level: number
  hp: number
  attack: number
  defense: number
  exp: number
  gold: number
  dropItems: string[]
}
```

#### SkillConfig - 功法配置

```typescript
interface SkillConfig {
  id: string
  name: string
  type: SkillType
  quality: SkillQuality
  level: number
  bonus: number
}
```

#### EquipmentConfig - 装备配置

```typescript
interface EquipmentConfig {
  id: string
  name: string
  type: EquipmentType
  quality: EquipmentQuality
  stats: EquipmentStats
}
```

---

## 🔄 数据流

### 1. 初始化流程

```
用户启动游戏
    ↓
GameController.init()
    ↓
加载存档 → 创建新角色
    ↓
计算离线收益
    ↓
GameController.start()
    ↓
启动游戏循环
```

### 2. 战斗流程

```
游戏循环 (每秒)
    ↓
获取当前怪物
    ↓
BattleSystem.autoBattle()
    ↓
计算战斗结果
    ↓
更新玩家数据
    ↓
检查升级
    ↓
保存游戏
```

### 3. 升级流程

```
获得经验
    ↓
LevelSystem.addExp()
    ↓
检查经验是否足够
    ↓
提升等级
    ↓
检查境界突破
    ↓
更新属性
    ↓
触发升级事件
```

### 4. 存储流程

```
定时触发 (30秒)
    ↓
GameController.saveGame()
    ↓
序列化玩家数据
    ↓
StorageSystem.savePlayerData()
    ↓
写入存储
```

---

## 🔧 扩展性设计

### 1. 事件系统

**设计目标**: 解耦模块间通信

```typescript
interface GameEvent {
  type: 'levelUp' | 'battleWin' | 'drop'
  data: any
}

class GameController {
  private eventListeners: ((event: GameEvent) => void)[]
  
  addEventListener(listener: (event: GameEvent) => void)
  private emitEvent(event: GameEvent)
}
```

**使用示例**:
```typescript
game.addEventListener((event) => {
  if (event.type === 'levelUp') {
    console.log('升级了！')
  }
})
```

### 2. 配置系统

**设计目标**: 数据与代码分离

**配置文件**:
- `RealmConfig.ts` - 境界配置
- `SkillConfig.ts` - 功法配置
- `EquipmentConfig.ts` - 装备配置
- `MonsterConfig.ts` - 怪物配置

**扩展方式**:
```typescript
// 添加新功法
SKILLS.push({
  id: 'skill_new',
  name: '新功法',
  // ...配置
})
```

### 3. 平台适配

**设计目标**: 支持多平台

```typescript
class StorageSystem {
  constructor() {
    if (typeof tt !== 'undefined') {
      // 抖音小游戏
      this.storage = tt
    } else if (typeof localStorage !== 'undefined') {
      // 浏览器
      this.storage = localStorage
    } else {
      // Node.js
      this.storage = memoryStorage
    }
  }
}
```

### 4. 模块扩展

**添加新系统**:

1. 创建系统文件: `src/systems/NewSystem.ts`
2. 定义系统类
3. 在 GameController 中集成
4. 添加事件监听

**示例**:
```typescript
// src/systems/QuestSystem.ts
export class QuestSystem {
  checkDailyQuest(player: PlayerData): QuestReward {
    // 任务检查逻辑
  }
}

// src/core/GameController.ts
import { QuestSystem } from '../systems/QuestSystem'

class GameController {
  private questSystem: QuestSystem
  
  constructor() {
    this.questSystem = new QuestSystem()
  }
}
```

---

## 📊 性能优化

### 1. 计算优化

**缓存玩家属性**:
```typescript
// 战斗系统缓存计算结果
private playerStatsCache: Map<string, PlayerStats>

calculatePlayerStats(player: PlayerData) {
  const cacheKey = `${player.level}-${player.realm}`
  if (this.playerStatsCache.has(cacheKey)) {
    return this.playerStatsCache.get(cacheKey)
  }
  // 计算并缓存
}
```

### 2. 存储优化

**增量保存**:
- 只保存变化的数据
- 压缩存储格式
- 批量写入

### 3. 内存管理

**对象池**:
```typescript
class BattleResultPool {
  private pool: BattleResult[] = []
  
  get(): BattleResult {
    return this.pool.pop() || {}
  }
  
  release(result: BattleResult) {
    this.pool.push(result)
  }
}
```

---

## 🔐 安全设计

### 1. 数据验证

```typescript
function validatePlayerData(data: any): PlayerData {
  // 类型检查
  if (typeof data.level !== 'number') {
    throw new Error('Invalid level')
  }
  // 范围检查
  if (data.level < 1 || data.level > 100) {
    throw new Error('Level out of range')
  }
  return data
}
```

### 2. 防作弊

- 服务器验证关键操作
- 数据加密存储
- 异常检测

---

## 📈 未来扩展

### 计划添加的模块

1. **UI系统** - 可视化界面
2. **音效系统** - 背景音乐和音效
3. **网络系统** - 多人在线
4. **AI系统** - 智能怪物
5. **资源系统** - 资源管理

---

## 📝 架构决策记录

### ADR-001: 使用TypeScript

**背景**: 需要选择开发语言  
**决策**: 使用TypeScript  
**原因**:
- 类型安全
- 开发效率高
- 社区活跃

### ADR-002: 模块化设计

**背景**: 如何组织代码结构  
**决策**: 分层架构（Core/Systems/Data）  
**原因**:
- 职责清晰
- 易于测试
- 便于扩展

---

**文档维护**: 随架构演进更新  
**负责人**: 架构团队
