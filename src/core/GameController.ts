import { PlayerData, createDefaultPlayer } from '../data/PlayerData';
import { BattleSystem } from '../systems/BattleSystem';
import { LevelSystem } from '../systems/LevelSystem';
import { StorageSystem } from '../systems/StorageSystem';
import { getMonsterByLevel } from '../data/MonsterConfig';

/**
 * 游戏配置
 */
export interface GameConfig {
  autoSaveInterval: number;  // 自动保存间隔（毫秒）
  battleInterval: number;    // 战斗间隔（毫秒）
}

/**
 * 游戏事件
 */
export interface GameEvent {
  type: 'levelUp' | 'realmUp' | 'battleWin' | 'battleLose' | 'drop';
  data: any;
}

/**
 * 游戏主控制器
 */
export class GameController {
  private player: PlayerData;
  private battleSystem: BattleSystem;
  private levelSystem: LevelSystem;
  private storageSystem: StorageSystem;
  
  private config: GameConfig;
  private eventListeners: ((event: GameEvent) => void)[] = [];
  private gameLoop: NodeJS.Timeout | null = null;
  private autoSaveLoop: NodeJS.Timeout | null = null;
  
  private currentMonster = getMonsterByLevel(1);
  private battleCount = 0;
  private startTime = 0;
  
  constructor(config?: Partial<GameConfig>) {
    this.config = {
      autoSaveInterval: 30000,  // 30秒自动保存
      battleInterval: 1000,     // 1秒战斗一次
      ...config
    };
    
    this.battleSystem = new BattleSystem();
    this.levelSystem = new LevelSystem();
    this.storageSystem = new StorageSystem();
    this.player = createDefaultPlayer('玩家');
  }
  
  /**
   * 初始化游戏
   */
  init(playerName: string): void {
    console.log('🎮 初始化游戏...');
    
    // 尝试加载存档
    const savedPlayer = this.loadGame();
    
    if (savedPlayer) {
      this.player = savedPlayer;
      console.log(`✅ 加载存档成功: ${this.player.name} (Lv.${this.player.level})`);
      
      // 计算离线收益
      const offlineTime = this.storageSystem.getOfflineTime();
      if (offlineTime > 0) {
        this.calculateOfflineReward(offlineTime);
      }
    } else {
      // 创建新玩家
      this.player = createDefaultPlayer(playerName);
      console.log(`✅ 创建新角色: ${this.player.name}`);
    }
    
    this.startTime = Date.now();
  }
  
  /**
   * 开始游戏
   */
  start(): void {
    console.log('🎮 游戏开始！');
    console.log(`玩家: ${this.player.name}`);
    console.log(`等级: ${this.player.level}`);
    console.log(`境界: ${this.player.realm}`);
    
    // 启动游戏循环
    this.startGameLoop();
    
    // 启动自动保存
    this.startAutoSave();
  }
  
  /**
   * 停止游戏
   */
  stop(): void {
    console.log('🛑 游戏停止');
    
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    
    if (this.autoSaveLoop) {
      clearInterval(this.autoSaveLoop);
      this.autoSaveLoop = null;
    }
    
    // 最后一次保存
    this.saveGame();
  }
  
  /**
   * 游戏主循环
   */
  private startGameLoop(): void {
    this.gameLoop = setInterval(() => {
      this.processBattle();
    }, this.config.battleInterval);
  }
  
  /**
   * 处理战斗
   */
  private processBattle(): void {
    // 获取当前怪物
    this.currentMonster = getMonsterByLevel(this.player.level);
    
    // 执行战斗
    const result = this.battleSystem.autoBattle(this.player, this.currentMonster);
    
    this.battleCount++;
    
    if (result.win) {
      // 增加经验和金币
      const levelUpResult = this.levelSystem.addExp(this.player, result.expGain);
      this.player.gold += result.goldGain;
      this.player.totalKillCount++;
      
      // 触发事件
      this.emitEvent({
        type: 'battleWin',
        data: {
          monster: this.currentMonster,
          result,
          levelUp: levelUpResult
        }
      });
      
      // 检查升级
      if (levelUpResult.leveledUp) {
        this.emitEvent({
          type: 'levelUp',
          data: {
            newLevel: levelUpResult.newLevel,
            realmUp: levelUpResult.realmUp,
            newRealm: levelUpResult.newRealm
          }
        });
        
        if (levelUpResult.realmUp) {
          this.emitEvent({
            type: 'realmUp',
            data: { newRealm: levelUpResult.newRealm }
          });
        }
      }
      
      // 处理掉落
      if (result.drops.length > 0) {
        this.emitEvent({
          type: 'drop',
          data: { drops: result.drops }
        });
      }
    } else {
      // 战斗失败
      this.player.hp = this.player.maxHp; // 恢复生命
      
      this.emitEvent({
        type: 'battleLose',
        data: { monster: this.currentMonster, result }
      });
    }
  }
  
  /**
   * 计算离线收益
   */
  private calculateOfflineReward(offlineTime: number): void {
    const reward = this.battleSystem.calculateOfflineReward(this.player, offlineTime);
    
    console.log('📊 离线收益:');
    console.log(`  经验: +${reward.exp}`);
    console.log(`  灵石: +${reward.gold}`);
    console.log(`  击杀: ${reward.kills}只怪物`);
    
    // 发放奖励
    this.levelSystem.addExp(this.player, reward.exp);
    this.player.gold += reward.gold;
    this.player.totalKillCount += reward.kills;
  }
  
  /**
   * 自动保存
   */
  private startAutoSave(): void {
    this.autoSaveLoop = setInterval(() => {
      this.saveGame();
    }, this.config.autoSaveInterval);
  }
  
  /**
   * 保存游戏
   */
  saveGame(): void {
    this.player.lastSaveTime = Date.now();
    this.player.totalPlayTime += Date.now() - this.startTime;
    this.startTime = Date.now();
    
    this.storageSystem.savePlayerData(this.player);
    console.log('💾 游戏已保存');
  }
  
  /**
   * 加载游戏
   */
  loadGame(): PlayerData | null {
    // 尝试从存储中加载（这里简化处理）
    return null;
  }
  
  /**
   * 添加事件监听器
   */
  addEventListener(listener: (event: GameEvent) => void): void {
    this.eventListeners.push(listener);
  }
  
  /**
   * 触发事件
   */
  private emitEvent(event: GameEvent): void {
    this.eventListeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('事件处理器错误:', error);
      }
    });
  }
  
  /**
   * 获取玩家数据
   */
  getPlayer(): PlayerData {
    return this.player;
  }
  
  /**
   * 获取当前怪物
   */
  getCurrentMonster() {
    return this.currentMonster;
  }
  
  /**
   * 获取游戏统计
   */
  getStats() {
    return {
      battleCount: this.battleCount,
      playTime: Date.now() - this.startTime,
      levelProgress: this.levelSystem.getLevelProgress(this.player)
    };
  }
}
