# 📊 数据设计文档

**版本**: v1.0.0  
**最后更新**: 2026-05-12

---

## 📋 目录

- [数据模型](#数据模型)
- [配置表](#配置表)
- [数据关系](#数据关系)
- [数据存储](#数据存储)

---

## 🗃️ 数据模型

### 1. 玩家数据 (PlayerData)

```typescript
interface PlayerData {
  // ========== 基础信息 ==========
  id: string              // 玩家ID
  name: string            // 玩家名称
  level: number           // 当前等级
  exp: number             // 当前经验
  
  // ========== 境界信息 ==========
  realm: string           // 境界名称
  realmLevel: number      // 境界等级
  
  // ========== 战斗属性 ==========
  hp: number              // 当前生命
  maxHp: number           // 最大生命
  attack: number          // 攻击力
  defense: number         // 防御力
  spirit: number          // 当前灵力
  maxSpirit: number       // 最大灵力
  
  // ========== 资源 ==========
  gold: number            // 灵石
  gems: number            // 仙玉
  
  // ========== 功法 ==========
  skills: string[]        // 已学会功法ID列表
  equippedSkills: string[] // 已装备功法ID列表
  
  // ========== 装备 ==========
  equipment: {
    weapon?: string       // 武器ID
    armor?: string        // 防具ID
    accessory?: string    // 饰品ID
  }
  
  // ========== 统计数据 ==========
  totalKillCount: number      // 总击杀数
  totalPlayTime: number       // 总游戏时长(毫秒)
  lastLoginTime: number       // 最后登录时间
  lastSaveTime: number        // 最后保存时间
}
```

**数据示例**:
```json
{
  "id": "player_1704067200000",
  "name": "修仙者",
  "level": 50,
  "exp": 12500,
  "realm": "合体期",
  "realmLevel": 50,
  "hp": 5000,
  "maxHp": 5000,
  "attack": 100,
  "defense": 50,
  "spirit": 500,
  "maxSpirit": 500,
  "gold": 100000,
  "gems": 500,
  "skills": ["skill_001", "skill_004", "skill_007"],
  "equippedSkills": ["skill_004", "skill_007"],
  "equipment": {
    "weapon": "weapon_005",
    "armor": "armor_004",
    "accessory": "accessory_003"
  },
  "totalKillCount": 10000,
  "totalPlayTime": 86400000,
  "lastLoginTime": 1704067200000,
  "lastSaveTime": 1704153600000
}
```

### 2. 怪物数据 (MonsterConfig)

```typescript
interface MonsterConfig {
  id: string              // 怪物ID
  name: string            // 怪物名称
  level: number           // 怪物等级
  hp: number              // 生命值
  attack: number          // 攻击力
  defense: number         // 防御力
  exp: number             // 击杀经验
  gold: number            // 掉落灵石
  dropItems: string[]     // 掉落装备ID列表
  description: string     // 描述
}
```

### 3. 功法数据 (SkillConfig)

```typescript
interface SkillConfig {
  id: string              // 功法ID
  name: string            // 功法名称
  type: SkillType         // 功法类型
  quality: SkillQuality   // 功法品质
  level: number           // 当前等级
  maxLevel: number        // 最高等级
  bonus: number           // 基础加成
  bonusPerLevel: number   // 每级加成
  cost: number            // 购买费用
  description: string     // 描述
  unlockLevel: number     // 解锁等级
}

enum SkillType {
  ATTACK = 'attack',
  DEFENSE = 'defense',
  AUXILIARY = 'auxiliary'
}

enum SkillQuality {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}
```

### 4. 装备数据 (EquipmentConfig)

```typescript
interface EquipmentConfig {
  id: string              // 装备ID
  name: string            // 装备名称
  type: EquipmentType     // 装备类型
  quality: EquipmentQuality // 装备品质
  level: number           // 装备等级
  stats: EquipmentStats   // 装备属性
  description: string     // 描述
  dropRate: number        // 掉落率
}

interface EquipmentStats {
  attack?: number         // 攻击加成
  defense?: number        // 防御加成
  hp?: number             // 生命加成
  spirit?: number         // 灵力加成
}

enum EquipmentType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  ACCESSORY = 'accessory'
}
```

### 5. 境界数据 (RealmConfig)

```typescript
interface RealmConfig {
  name: string            // 境界名称
  minLevel: number        // 最低等级
  maxLevel: number        // 最高等级
  bonusMultiplier: number // 属性倍率
  breakthroughCost: number // 突破费用
  description: string     // 描述
}
```

---

## 📋 配置表

### 境界配置表

| 境界 | 等级范围 | 属性倍率 | 突破费用 | 描述 |
|------|---------|---------|---------|------|
| 练气期 | 1-9 | 1.0x | 0 | 修炼基础阶段 |
| 筑基期 | 10-19 | 1.5x | 1,000 | 筑建道基 |
| 金丹期 | 20-29 | 2.5x | 5,000 | 凝聚金丹 |
| 元婴期 | 30-39 | 4.0x | 20,000 | 元婴出窍 |
| 化神期 | 40-49 | 6.0x | 100,000 | 化神返虚 |
| 合体期 | 50-59 | 10.0x | 500,000 | 天人合一 |
| 大乘期 | 60-69 | 15.0x | 2,000,000 | 功行圆满 |
| 渡劫期 | 70-79 | 25.0x | 10,000,000 | 渡过天劫 |
| 仙人 | 80-100 | 50.0x | 0 | 超脱凡尘 |

### 功法配置表

| ID | 名称 | 类型 | 品质 | 等级 | 加成 | 费用 | 解锁等级 |
|----|------|------|------|------|------|------|---------|
| skill_001 | 基础吐纳法 | 辅助 | 普通 | 10 | 1.1 | 100 | 1 |
| skill_002 | 铁布衫 | 防御 | 普通 | 10 | 1.1 | 200 | 3 |
| skill_003 | 烈焰掌 | 攻击 | 普通 | 10 | 1.15 | 300 | 5 |
| skill_004 | 太乙真经 | 辅助 | 稀有 | 20 | 1.3 | 1,000 | 10 |
| skill_005 | 金刚不坏体 | 防御 | 稀有 | 20 | 1.25 | 1,500 | 15 |
| skill_006 | 雷霆剑诀 | 攻击 | 稀有 | 20 | 1.35 | 2,000 | 20 |
| skill_007 | 太上忘情录 | 辅助 | 史诗 | 30 | 1.6 | 10,000 | 30 |
| skill_008 | 九转金身 | 防御 | 史诗 | 30 | 1.5 | 15,000 | 35 |
| skill_009 | 星辰剑诀 | 攻击 | 史诗 | 30 | 1.65 | 20,000 | 40 |
| skill_010 | 混沌功 | 辅助 | 传说 | 50 | 2.0 | 100,000 | 50 |
| skill_011 | 不灭金身 | 防御 | 传说 | 50 | 1.8 | 150,000 | 60 |
| skill_012 | 诛仙剑诀 | 攻击 | 传说 | 50 | 2.0 | 200,000 | 70 |

### 装备配置表

**武器**:

| ID | 名称 | 品质 | 等级 | 攻击 | 掉落率 |
|----|------|------|------|------|--------|
| weapon_001 | 木剑 | 普通 | 1 | 5 | 30% |
| weapon_002 | 铁剑 | 普通 | 10 | 20 | 25% |
| weapon_003 | 青云剑 | 稀有 | 20 | 50 | 15% |
| weapon_004 | 紫电剑 | 稀有 | 30 | 100 | 10% |
| weapon_005 | 星辰剑 | 史诗 | 40 | 200 | 5% |
| weapon_006 | 诛仙剑 | 传说 | 50 | 500 | 1% |

**防具**:

| ID | 名称 | 品质 | 等级 | 防御 | 生命 | 掉落率 |
|----|------|------|------|------|------|--------|
| armor_001 | 布衣 | 普通 | 1 | 3 | 20 | 30% |
| armor_002 | 铁甲 | 普通 | 10 | 15 | 50 | 25% |
| armor_003 | 青云袍 | 稀有 | 20 | 40 | 100 | 15% |
| armor_004 | 金丝软甲 | 史诗 | 40 | 150 | 300 | 5% |
| armor_005 | 龙鳞甲 | 传说 | 50 | 400 | 800 | 1% |

**饰品**:

| ID | 名称 | 品质 | 等级 | 灵力 | 其他属性 | 掉落率 |
|----|------|------|------|------|---------|--------|
| accessory_001 | 灵石 | 普通 | 1 | 10 | - | 30% |
| accessory_002 | 灵玉佩 | 稀有 | 20 | 50 | HP+30 | 15% |
| accessory_003 | 护心镜 | 史诗 | 40 | 100 | HP+100 DEF+20 | 5% |
| accessory_004 | 混沌珠 | 传说 | 50 | 300 | 全属性+50 | 1% |

### 怪物配置表

| ID | 名称 | 等级 | HP | 攻击 | 防御 | 经验 | 灵石 | 掉落 |
|----|------|------|-----|------|------|------|------|------|
| monster_001 | 野狼 | 1 | 50 | 8 | 2 | 10 | 5 | - |
| monster_002 | 野猪 | 3 | 80 | 12 | 5 | 20 | 10 | - |
| monster_003 | 山贼 | 5 | 100 | 15 | 8 | 30 | 20 | weapon_001, armor_001 |
| monster_004 | 妖狐 | 8 | 150 | 20 | 10 | 50 | 30 | accessory_001 |
| monster_005 | 黑熊精 | 10 | 200 | 25 | 15 | 80 | 50 | weapon_002, armor_002 |
| monster_006 | 石魔 | 15 | 400 | 40 | 30 | 150 | 100 | weapon_003 |
| monster_007 | 火鸦 | 20 | 600 | 60 | 40 | 300 | 200 | weapon_003, armor_003 |
| monster_008 | 蛟龙 | 25 | 1000 | 100 | 80 | 600 | 500 | weapon_004, accessory_002 |
| monster_009 | 血魔 | 30 | 2000 | 150 | 100 | 1200 | 1000 | weapon_004, armor_003 |
| monster_010 | 天龙 | 35 | 5000 | 300 | 200 | 3000 | 2500 | weapon_005, accessory_003 |
| monster_011 | 魔修 | 40 | 8000 | 500 | 300 | 6000 | 5000 | weapon_005, armor_004 |
| monster_012 | 上古凶兽 | 45 | 15000 | 800 | 500 | 12000 | 10000 | weapon_005, armor_004, accessory_003 |
| monster_013 | 魔尊 | 50 | 30000 | 1500 | 800 | 25000 | 20000 | weapon_006, armor_005, accessory_004 |

---

## 🔗 数据关系

### ER图

```
┌─────────────┐
│   Player    │
│             │
│ - id        │
│ - level     │
│ - realm     │
│ - gold      │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐     ┌─────────────┐
│   Skill     │     │  Equipment  │
│             │     │             │
│ - id        │     │ - id        │
│ - type      │     │ - type      │
│ - bonus     │     │ - stats     │
└─────────────┘     └─────────────┘

┌─────────────┐
│   Monster   │
│             │
│ - id        │
│ - level     │
│ - drops     │──────┐
└─────────────┘      │
                     │ N:M
                     │
              ┌──────▼──────┐
              │  Equipment  │
              │             │
              │ - id        │
              └─────────────┘
```

### 关系说明

1. **玩家 - 功法**: 一对多
   - 一个玩家可以拥有多个功法
   - 一个功法可以被多个玩家拥有

2. **玩家 - 装备**: 一对三
   - 一个玩家可以装备: 1武器 + 1防具 + 1饰品

3. **怪物 - 装备**: 一对多
   - 一个怪物可以掉落多个装备
   - 一个装备可以被多个怪物掉落

---

## 💾 数据存储

### 存储方案

**本地存储**:
- Node.js: 内存存储 / 文件存储
- 浏览器: localStorage
- 抖音小游戏: tt.setStorageSync

### 存储格式

**JSON格式**:
```json
{
  "player_1704067200000": {
    "id": "player_1704067200000",
    "name": "修仙者",
    "level": 50,
    ...
  }
}
```

### 存储键名

| 键名 | 说明 | 数据类型 |
|------|------|---------|
| `player_{id}` | 玩家数据 | JSON |
| `lastLoginTime` | 最后登录时间 | Timestamp |
| `gameSettings` | 游戏设置 | JSON |

### 数据备份

**自动备份**:
- 每30秒自动保存
- 游戏退出时保存
- 关键操作后保存

**手动备份**:
```typescript
// 导出存档
const saveData = JSON.stringify(playerData)
downloadFile(saveData, 'xiuxian_save.json')

// 导入存档
const loadData = JSON.parse(fileContent)
```

---

## 📊 数值计算

### 经验计算

```typescript
function getExpNeeded(level: number): number {
  return Math.floor(100 * Math.pow(1.15, level - 1))
}
```

### 属性计算

```typescript
function calculatePlayerStats(player: PlayerData): PlayerStats {
  // 基础属性
  let stats = {
    attack: player.attack,
    defense: player.defense,
    hp: player.maxHp
  }
  
  // 境界加成
  const realm = getRealmByLevel(player.level)
  stats.attack *= realm.bonusMultiplier
  stats.defense *= realm.bonusMultiplier
  stats.hp *= realm.bonusMultiplier
  
  // 功法加成
  for (const skillId of player.equippedSkills) {
    const skill = getSkillById(skillId)
    const bonus = calculateSkillBonus(skill)
    
    switch (skill.type) {
      case 'attack':
        stats.attack *= bonus
        break
      case 'defense':
        stats.defense *= bonus
        break
    }
  }
  
  return stats
}
```

### 掉落计算

```typescript
function calculateDrop(monster: MonsterConfig): Equipment[] {
  const drops: Equipment[] = []
  
  for (const itemId of monster.dropItems) {
    if (Math.random() < 0.3) { // 30%基础掉落率
      const equipment = getEquipmentById(itemId)
      drops.push(equipment)
    }
  }
  
  return drops
}
```

---

## 🔧 数据迁移

### 版本兼容

```typescript
function migrateData(data: any, version: number): PlayerData {
  switch (version) {
    case 1:
      // v1.0 -> v1.1 迁移
      data.newField = defaultValue
      break
  }
  return data
}
```

### 数据验证

```typescript
function validatePlayerData(data: any): boolean {
  // 必需字段检查
  if (!data.id || !data.name) return false
  
  // 类型检查
  if (typeof data.level !== 'number') return false
  
  // 范围检查
  if (data.level < 1 || data.level > 100) return false
  
  return true
}
```

---

**文档维护**: 随数据结构调整更新  
**负责人**: 数据团队
