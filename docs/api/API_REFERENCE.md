# 📡 API参考文档

**版本**: v1.0.0  
**最后更新**: 2026-05-12

---

## 📋 目录

- [核心API](#核心api)
- [系统API](#系统api)
- [数据API](#数据api)
- [事件API](#事件api)

---

## 🎮 核心API

### GameController

游戏主控制器，负责协调所有游戏系统。

#### 构造函数

```typescript
constructor(config?: Partial<GameConfig>)
```

**参数**:
- `config.autoSaveInterval` - 自动保存间隔(毫秒)，默认30000
- `config.battleInterval` - 战斗间隔(毫秒)，默认1000

**示例**:
```typescript
const game = new GameController({
  autoSaveInterval: 60000,  // 1分钟保存一次
  battleInterval: 500      // 0.5秒战斗一次
})
```

#### init()

初始化游戏。

```typescript
init(playerName: string): void
```

**参数**:
- `playerName` - 玩家名称

**示例**:
```typescript
game.init('修仙者')
```

#### start()

启动游戏。

```typescript
start(): void
```

**示例**:
```typescript
game.start()
```

#### stop()

停止游戏。

```typescript
stop(): void
```

**示例**:
```typescript
game.stop()
```

#### saveGame()

手动保存游戏。

```typescript
saveGame(): void
```

**示例**:
```typescript
game.saveGame()
```

#### getPlayer()

获取玩家数据。

```typescript
getPlayer(): PlayerData
```

**返回值**:
- `PlayerData` - 玩家数据对象

**示例**:
```typescript
const player = game.getPlayer()
console.log(`等级: ${player.level}`)
```

#### getStats()

获取游戏统计。

```typescript
getStats(): {
  battleCount: number
  playTime: number
  levelProgress: number
}
```

**返回值**:
- `battleCount` - 战斗次数
- `playTime` - 游戏时长(毫秒)
- `levelProgress` - 等级进度(百分比)

**示例**:
```typescript
const stats = game.getStats()
console.log(`已战斗 ${stats.battleCount} 次`)
```

---

## ⚔️ 系统API

### BattleSystem

战斗系统，处理所有战斗相关逻辑。

#### calculatePlayerStats()

计算玩家总属性。

```typescript
calculatePlayerStats(player: PlayerData): {
  totalAttack: number
  totalDefense: number
  totalHp: number
}
```

**参数**:
- `player` - 玩家数据

**返回值**:
- `totalAttack` - 总攻击力(含加成)
- `totalDefense` - 总防御力(含加成)
- `totalHp` - 总生命值(含加成)

**示例**:
```typescript
const stats = battleSystem.calculatePlayerStats(player)
console.log(`总攻击力: ${stats.totalAttack}`)
```

#### autoBattle()

自动战斗。

```typescript
autoBattle(
  player: PlayerData, 
  monster: MonsterConfig
): BattleResult
```

**参数**:
- `player` - 玩家数据
- `monster` - 怪物配置

**返回值**:
```typescript
interface BattleResult {
  win: boolean          // 是否胜利
  expGain: number       // 获得经验
  goldGain: number      // 获得灵石
  hpLoss: number        // 损失生命
  killCount: number     // 击杀数
  drops: string[]       // 掉落装备ID列表
}
```

**示例**:
```typescript
const monster = getMonsterByLevel(50)
const result = battleSystem.autoBattle(player, monster)

if (result.win) {
  console.log(`胜利！获得 ${result.expGain} 经验`)
}
```

#### calculateOfflineReward()

计算离线收益。

```typescript
calculateOfflineReward(
  player: PlayerData,
  offlineTime: number
): {
  exp: number
  gold: number
  kills: number
  drops: string[]
}
```

**参数**:
- `player` - 玩家数据
- `offlineTime` - 离线时间(毫秒)

**返回值**:
- `exp` - 离线经验
- `gold` - 离线灵石
- `kills` - 离线击杀数
- `drops` - 离线掉落

**示例**:
```typescript
const reward = battleSystem.calculateOfflineReward(player, 3600000) // 1小时
console.log(`离线收益: ${reward.exp} 经验, ${reward.gold} 灵石`)
```

---

### LevelSystem

升级系统，处理等级和境界相关逻辑。

#### getExpNeeded()

获取升级所需经验。

```typescript
getExpNeeded(level: number): number
```

**参数**:
- `level` - 目标等级

**返回值**:
- 所需经验值

**示例**:
```typescript
const expNeeded = levelSystem.getExpNeeded(50)
console.log(`升到50级需要 ${expNeeded} 经验`)
```

#### addExp()

增加经验值。

```typescript
addExp(
  player: PlayerData, 
  exp: number
): {
  leveledUp: boolean
  newLevel: number
  realmUp: boolean
  newRealm: string | null
}
```

**参数**:
- `player` - 玩家数据
- `exp` - 增加的经验值

**返回值**:
- `leveledUp` - 是否升级
- `newLevel` - 新等级
- `realmUp` - 是否突破境界
- `newRealm` - 新境界名称

**示例**:
```typescript
const result = levelSystem.addExp(player, 1000)
if (result.leveledUp) {
  console.log(`升级到 ${result.newLevel} 级！`)
}
```

#### checkBreakthrough()

检查是否可以突破境界。

```typescript
checkBreakthrough(player: PlayerData): {
  canBreakthrough: boolean
  cost: number
  nextRealm: string | null
}
```

**参数**:
- `player` - 玩家数据

**返回值**:
- `canBreakthrough` - 是否可以突破
- `cost` - 突破费用
- `nextRealm` - 下一境界名称

**示例**:
```typescript
const check = levelSystem.checkBreakthrough(player)
if (check.canBreakthrough) {
  console.log(`可以突破到 ${check.nextRealm}，需要 ${check.cost} 灵石`)
}
```

#### breakthrough()

执行境界突破。

```typescript
breakthrough(player: PlayerData): {
  success: boolean
  message: string
}
```

**参数**:
- `player` - 玩家数据

**返回值**:
- `success` - 是否成功
- `message` - 结果消息

**示例**:
```typescript
const result = levelSystem.breakthrough(player)
if (result.success) {
  console.log(result.message)
}
```

#### getLevelProgress()

获取等级进度。

```typescript
getLevelProgress(player: PlayerData): number
```

**参数**:
- `player` - 玩家数据

**返回值**:
- 进度百分比(0-100)

**示例**:
```typescript
const progress = levelSystem.getLevelProgress(player)
console.log(`当前进度: ${progress}%`)
```

---

### StorageSystem

存储系统，处理数据持久化。

#### savePlayerData()

保存玩家数据。

```typescript
savePlayerData(player: PlayerData): void
```

**参数**:
- `player` - 玩家数据

**示例**:
```typescript
storageSystem.savePlayerData(player)
```

#### loadPlayerData()

加载玩家数据。

```typescript
loadPlayerData(playerId: string): PlayerData | null
```

**参数**:
- `playerId` - 玩家ID

**返回值**:
- 玩家数据，如果不存在返回null

**示例**:
```typescript
const player = storageSystem.loadPlayerData('player_123')
if (player) {
  console.log(`加载成功: ${player.name}`)
}
```

#### getOfflineTime()

获取离线时间。

```typescript
getOfflineTime(): number
```

**返回值**:
- 离线时间(毫秒)

**示例**:
```typescript
const offlineTime = storageSystem.getOfflineTime()
console.log(`离线了 ${offlineTime / 1000} 秒`)
```

#### saveSettings()

保存游戏设置。

```typescript
saveSettings(settings: any): void
```

**参数**:
- `settings` - 设置对象

**示例**:
```typescript
storageSystem.saveSettings({
  soundEnabled: true,
  musicEnabled: false
})
```

#### loadSettings()

加载游戏设置。

```typescript
loadSettings(): any
```

**返回值**:
- 设置对象

**示例**:
```typescript
const settings = storageSystem.loadSettings()
console.log(`音效: ${settings.soundEnabled ? '开启' : '关闭'}`)
```

---

## 📊 数据API

### 境界数据

#### getRealmByLevel()

根据等级获取境界。

```typescript
getRealmByLevel(level: number): RealmConfig
```

**参数**:
- `level` - 玩家等级

**返回值**:
- 境界配置

**示例**:
```typescript
const realm = getRealmByLevel(25)
console.log(realm.name) // "金丹期"
```

#### canBreakthrough()

检查是否可以突破。

```typescript
canBreakthrough(level: number, realm: string): boolean
```

**参数**:
- `level` - 玩家等级
- `realm` - 当前境界名称

**返回值**:
- 是否可以突破

#### getNextRealm()

获取下一个境界。

```typescript
getNextRealm(currentRealm: string): RealmConfig | null
```

**参数**:
- `currentRealm` - 当前境界名称

**返回值**:
- 下一境界配置，如果是最高境界返回null

---

### 功法数据

#### getSkillById()

根据ID获取功法。

```typescript
getSkillById(id: string): SkillConfig | undefined
```

**参数**:
- `id` - 功法ID

**返回值**:
- 功法配置，如果不存在返回undefined

**示例**:
```typescript
const skill = getSkillById('skill_001')
console.log(skill.name) // "基础吐纳法"
```

#### getAvailableSkills()

获取可学习的功法。

```typescript
getAvailableSkills(playerLevel: number): SkillConfig[]
```

**参数**:
- `playerLevel` - 玩家等级

**返回值**:
- 可学习功法列表

#### calculateSkillBonus()

计算功法加成。

```typescript
calculateSkillBonus(skill: SkillConfig): number
```

**参数**:
- `skill` - 功法配置

**返回值**:
- 总加成值

**示例**:
```typescript
const skill = getSkillById('skill_001')
const bonus = calculateSkillBonus(skill)
console.log(`加成: ${bonus * 100}%`) // "加成: 110%"
```

---

### 装备数据

#### getEquipmentById()

根据ID获取装备。

```typescript
getEquipmentById(id: string): EquipmentConfig | undefined
```

**参数**:
- `id` - 装备ID

**返回值**:
- 装备配置

#### getEquipmentsByTypeAndLevel()

获取指定类型和等级范围的装备。

```typescript
getEquipmentsByTypeAndLevel(
  type: EquipmentType,
  minLevel: number,
  maxLevel: number
): EquipmentConfig[]
```

**参数**:
- `type` - 装备类型
- `minLevel` - 最低等级
- `maxLevel` - 最高等级

**返回值**:
- 装备列表

#### randomDropEquipment()

随机掉落装备。

```typescript
randomDropEquipment(playerLevel: number): EquipmentConfig | null
```

**参数**:
- `playerLevel` - 玩家等级

**返回值**:
- 掉落的装备，如果没有掉落返回null

---

### 怪物数据

#### getMonsterById()

根据ID获取怪物。

```typescript
getMonsterById(id: string): MonsterConfig | undefined
```

**参数**:
- `id` - 怪物ID

**返回值**:
- 怪物配置

#### getMonsterByLevel()

根据等级获取怪物。

```typescript
getMonsterByLevel(level: number): MonsterConfig
```

**参数**:
- `level` - 等级

**返回值**:
- 最接近等级的怪物

#### getRandomMonster()

获取随机怪物。

```typescript
getRandomMonster(playerLevel: number): MonsterConfig
```

**参数**:
- `playerLevel` - 玩家等级

**返回值**:
- 随机怪物(±5级范围内)

---

## 🎉 事件API

### GameEvent

游戏事件接口。

```typescript
interface GameEvent {
  type: 'levelUp' | 'realmUp' | 'battleWin' | 'battleLose' | 'drop'
  data: any
}
```

### addEventListener()

添加事件监听器。

```typescript
addEventListener(listener: (event: GameEvent) => void): void
```

**参数**:
- `listener` - 事件处理函数

**示例**:
```typescript
game.addEventListener((event) => {
  switch (event.type) {
    case 'levelUp':
      console.log(`升级到 ${event.data.newLevel} 级！`)
      break
    case 'realmUp':
      console.log(`突破到 ${event.data.newRealm}！`)
      break
    case 'battleWin':
      console.log(`战斗胜利！`)
      break
    case 'drop':
      console.log(`获得装备: ${event.data.drops.join(', ')}`)
      break
  }
})
```

---

## 💡 使用示例

### 完整游戏流程

```typescript
import { GameController } from './core/GameController'

// 1. 创建游戏实例
const game = new GameController({
  autoSaveInterval: 30000,
  battleInterval: 1000
})

// 2. 注册事件监听器
game.addEventListener((event) => {
  if (event.type === 'levelUp') {
    console.log('🎉 升级了！')
  }
})

// 3. 初始化游戏
game.init('修仙者')

// 4. 启动游戏
game.start()

// 5. 查看玩家状态
const player = game.getPlayer()
console.log(`当前等级: ${player.level}`)

// 6. 运行一段时间后停止
setTimeout(() => {
  game.stop()
}, 60000) // 1分钟后停止
```

---

**文档维护**: 随API更新  
**负责人**: 开发团队
