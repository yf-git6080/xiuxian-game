import { PlayerData } from '../data/PlayerData';
import { getRealmByLevel, canBreakthrough, getNextRealm } from '../data/RealmConfig';

/**
 * 升级系统
 */
export class LevelSystem {
  /**
   * 获取升级所需经验
   */
  getExpNeeded(level: number): number {
    // 指数增长公式
    return Math.floor(100 * Math.pow(1.15, level - 1));
  }
  
  /**
   * 增加经验值
   */
  addExp(player: PlayerData, exp: number): {
    leveledUp: boolean;
    newLevel: number;
    realmUp: boolean;
    newRealm: string | null;
  } {
    player.exp += exp;
    let leveledUp = false;
    let realmUp = false;
    let newRealm: string | null = null;
    
    // 检查是否升级
    while (player.exp >= this.getExpNeeded(player.level)) {
      player.exp -= this.getExpNeeded(player.level);
      player.level++;
      leveledUp = true;
      
      // 检查境界提升
      const newRealmData = getRealmByLevel(player.level);
      if (newRealmData.name !== player.realm) {
        player.realm = newRealmData.name;
        player.realmLevel = newRealmData.minLevel;
        realmUp = true;
        newRealm = newRealmData.name;
      }
      
      // 提升基础属性
      this.upgradeBaseStats(player);
    }
    
    return {
      leveledUp,
      newLevel: player.level,
      realmUp,
      newRealm
    };
  }
  
  /**
   * 升级基础属性
   */
  upgradeBaseStats(player: PlayerData): void {
    // 每级提升
    player.maxHp += 10;
    player.attack += 2;
    player.defense += 1;
    player.maxSpirit += 5;
    
    // 恢复生命和灵力
    player.hp = player.maxHp;
    player.spirit = player.maxSpirit;
  }
  
  /**
   * 检查是否可以突破境界
   */
  checkBreakthrough(player: PlayerData): {
    canBreakthrough: boolean;
    cost: number;
    nextRealm: string | null;
  } {
    const canBreak = canBreakthrough(player.level, player.realm);
    const nextRealmData = getNextRealm(player.realm);
    
    return {
      canBreakthrough: canBreak,
      cost: nextRealmData?.breakthroughCost || 0,
      nextRealm: nextRealmData?.name || null
    };
  }
  
  /**
   * 执行境界突破
   */
  breakthrough(player: PlayerData): {
    success: boolean;
    message: string;
  } {
    const checkResult = this.checkBreakthrough(player);
    
    if (!checkResult.canBreakthrough) {
      return {
        success: false,
        message: '尚未达到突破条件'
      };
    }
    
    if (player.gold < checkResult.cost) {
      return {
        success: false,
        message: `灵石不足，需要 ${checkResult.cost} 灵石`
      };
    }
    
    // 扣除灵石
    player.gold -= checkResult.cost;
    
    // 突破成功
    const nextRealm = getNextRealm(player.realm);
    if (nextRealm) {
      player.realm = nextRealm.name;
      player.realmLevel = nextRealm.minLevel;
      
      // 突破奖励：大幅提升属性
      player.maxHp *= 1.5;
      player.attack *= 1.5;
      player.defense *= 1.5;
      player.hp = player.maxHp;
      player.spirit = player.maxSpirit;
      
      return {
        success: true,
        message: `恭喜突破至 ${nextRealm.name}！`
      };
    }
    
    return {
      success: false,
      message: '已经是最高境界'
    };
  }
  
  /**
   * 获取玩家等级进度
   */
  getLevelProgress(player: PlayerData): number {
    const expNeeded = this.getExpNeeded(player.level);
    return (player.exp / expNeeded) * 100;
  }
}
