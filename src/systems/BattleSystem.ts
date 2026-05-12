import { PlayerData } from '../data/PlayerData';
import { MonsterConfig, getMonsterByLevel } from '../data/MonsterConfig';
import { getRealmByLevel } from '../data/RealmConfig';
import { getSkillById, calculateSkillBonus, SkillType } from '../data/SkillConfig';

/**
 * 战斗结果
 */
export interface BattleResult {
  win: boolean;
  expGain: number;
  goldGain: number;
  hpLoss: number;
  killCount: number;
  drops: string[];
}

/**
 * 战斗系统
 */
export class BattleSystem {
  /**
   * 计算玩家总属性
   */
  calculatePlayerStats(player: PlayerData): {
    totalAttack: number;
    totalDefense: number;
    totalHp: number;
  } {
    // 基础属性
    let totalAttack = player.attack;
    let totalDefense = player.defense;
    let totalHp = player.maxHp;
    
    // 境界加成
    const realm = getRealmByLevel(player.level);
    totalAttack *= realm.bonusMultiplier;
    totalDefense *= realm.bonusMultiplier;
    totalHp *= realm.bonusMultiplier;
    
    // 功法加成
    for (const skillId of player.equippedSkills) {
      const skill = getSkillById(skillId);
      if (skill) {
        const bonus = calculateSkillBonus(skill);
        
        switch (skill.type) {
          case SkillType.ATTACK:
            totalAttack *= bonus;
            break;
          case SkillType.DEFENSE:
            totalDefense *= bonus;
            break;
        }
      }
    }
    
    return {
      totalAttack: Math.floor(totalAttack),
      totalDefense: Math.floor(totalDefense),
      totalHp: Math.floor(totalHp)
    };
  }
  
  /**
   * 自动战斗
   */
  autoBattle(player: PlayerData, monster: MonsterConfig): BattleResult {
    const playerStats = this.calculatePlayerStats(player);
    
    // 计算伤害
    const playerDamage = Math.max(1, playerStats.totalAttack - monster.defense);
    const monsterDamage = Math.max(1, monster.attack - playerStats.totalDefense);
    
    // 计算战斗回合
    const roundsToKillMonster = Math.ceil(monster.hp / playerDamage);
    const totalMonsterDamage = roundsToKillMonster * monsterDamage;
    
    // 判断胜负
    const win = totalMonsterDamage < player.hp;
    
    // 计算奖励
    const expGain = win ? monster.exp : Math.floor(monster.exp * 0.3);
    const goldGain = win ? monster.gold : Math.floor(monster.gold * 0.3);
    const hpLoss = win ? totalMonsterDamage : player.hp;
    
    // 计算掉落
    const drops: string[] = [];
    if (win && monster.dropItems.length > 0) {
      for (const itemId of monster.dropItems) {
        if (Math.random() < 0.3) { // 30%掉落率
          drops.push(itemId);
        }
      }
    }
    
    return {
      win,
      expGain,
      goldGain,
      hpLoss,
      killCount: win ? 1 : 0,
      drops
    };
  }
  
  /**
   * 挂机战斗（连续战斗）
   */
  idleBattle(player: PlayerData, duration: number): {
    results: BattleResult[];
    totalExp: number;
    totalGold: number;
    totalKills: number;
    allDrops: string[];
  } {
    const results: BattleResult[] = [];
    let totalExp = 0;
    let totalGold = 0;
    let totalKills = 0;
    const allDrops: string[] = [];
    
    // 每秒战斗一次
    const battles = Math.floor(duration / 1000);
    
    for (let i = 0; i < battles; i++) {
      const monster = getMonsterByLevel(player.level);
      const result = this.autoBattle(player, monster);
      
      results.push(result);
      totalExp += result.expGain;
      totalGold += result.goldGain;
      totalKills += result.killCount;
      allDrops.push(...result.drops);
    }
    
    return {
      results,
      totalExp,
      totalGold,
      totalKills,
      allDrops
    };
  }
  
  /**
   * 计算离线收益
   */
  calculateOfflineReward(
    player: PlayerData, 
    offlineTime: number
  ): {
    exp: number;
    gold: number;
    kills: number;
    drops: string[];
  } {
    // 最大离线时间12小时
    const maxOfflineTime = 12 * 60 * 60 * 1000;
    const effectiveTime = Math.min(offlineTime, maxOfflineTime);
    
    // 离线收益效率50%
    const efficiency = 0.5;
    
    // 计算挂机收益
    const idleResult = this.idleBattle(player, effectiveTime);
    
    return {
      exp: Math.floor(idleResult.totalExp * efficiency),
      gold: Math.floor(idleResult.totalGold * efficiency),
      kills: idleResult.totalKills,
      drops: idleResult.allDrops
    };
  }
}
