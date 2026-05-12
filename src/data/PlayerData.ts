/**
 * 玩家数据模型
 */
export interface PlayerData {
  // 基础信息
  id: string;
  name: string;
  level: number;
  exp: number;
  
  // 境界
  realm: string;
  realmLevel: number;
  
  // 属性
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  spirit: number;
  maxSpirit: number;
  
  // 资源
  gold: number;
  gems: number;
  
  // 功法
  skills: string[];
  equippedSkills: string[];
  
  // 装备
  equipment: {
    weapon?: string;
    armor?: string;
    accessory?: string;
  };
  
  // 统计
  totalKillCount: number;
  totalPlayTime: number;
  lastLoginTime: number;
  lastSaveTime: number;
}

/**
 * 创建默认玩家数据
 */
export function createDefaultPlayer(name: string): PlayerData {
  return {
    id: `player_${Date.now()}`,
    name,
    level: 1,
    exp: 0,
    realm: '练气期',
    realmLevel: 1,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    spirit: 100,
    maxSpirit: 100,
    gold: 0,
    gems: 0,
    skills: [],
    equippedSkills: [],
    equipment: {},
    totalKillCount: 0,
    totalPlayTime: 0,
    lastLoginTime: Date.now(),
    lastSaveTime: Date.now()
  };
}
