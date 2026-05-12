/**
 * 境界配置
 */
export interface RealmConfig {
  name: string;
  minLevel: number;
  maxLevel: number;
  bonusMultiplier: number;
  breakthroughCost: number;
  description: string;
}

/**
 * 境界列表
 */
export const REALMS: RealmConfig[] = [
  {
    name: '练气期',
    minLevel: 1,
    maxLevel: 9,
    bonusMultiplier: 1.0,
    breakthroughCost: 0,
    description: '修炼的基础阶段，感应天地灵气'
  },
  {
    name: '筑基期',
    minLevel: 10,
    maxLevel: 19,
    bonusMultiplier: 1.5,
    breakthroughCost: 1000,
    description: '筑建道基，为修炼打下坚实根基'
  },
  {
    name: '金丹期',
    minLevel: 20,
    maxLevel: 29,
    bonusMultiplier: 2.5,
    breakthroughCost: 5000,
    description: '凝聚金丹，实力大增'
  },
  {
    name: '元婴期',
    minLevel: 30,
    maxLevel: 39,
    bonusMultiplier: 4.0,
    breakthroughCost: 20000,
    description: '元婴出窍，神游太虚'
  },
  {
    name: '化神期',
    minLevel: 40,
    maxLevel: 49,
    bonusMultiplier: 6.0,
    breakthroughCost: 100000,
    description: '化神返虚，与天地合一'
  },
  {
    name: '合体期',
    minLevel: 50,
    maxLevel: 59,
    bonusMultiplier: 10.0,
    breakthroughCost: 500000,
    description: '天人合一，法力无边'
  },
  {
    name: '大乘期',
    minLevel: 60,
    maxLevel: 69,
    bonusMultiplier: 15.0,
    breakthroughCost: 2000000,
    description: '功行圆满，只差一步登仙'
  },
  {
    name: '渡劫期',
    minLevel: 70,
    maxLevel: 79,
    bonusMultiplier: 25.0,
    breakthroughCost: 10000000,
    description: '渡过天劫，即可飞升成仙'
  },
  {
    name: '仙人',
    minLevel: 80,
    maxLevel: 100,
    bonusMultiplier: 50.0,
    breakthroughCost: 0,
    description: '超脱凡尘，逍遥自在'
  }
];

/**
 * 根据等级获取当前境界
 */
export function getRealmByLevel(level: number): RealmConfig {
  return REALMS.find(realm => 
    level >= realm.minLevel && level <= realm.maxLevel
  ) || REALMS[0];
}

/**
 * 检查是否可以突破境界
 */
export function canBreakthrough(level: number, realm: string): boolean {
  const currentRealm = REALMS.find(r => r.name === realm);
  if (!currentRealm) return false;
  
  // 已经是最高境界
  if (currentRealm.name === '仙人') return false;
  
  // 等级达到当前境界上限
  return level >= currentRealm.maxLevel;
}

/**
 * 获取下一个境界
 */
export function getNextRealm(currentRealm: string): RealmConfig | null {
  const index = REALMS.findIndex(r => r.name === currentRealm);
  if (index === -1 || index === REALMS.length - 1) return null;
  return REALMS[index + 1];
}
