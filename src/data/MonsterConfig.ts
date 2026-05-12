/**
 * 怪物配置
 */
export interface MonsterConfig {
  id: string;
  name: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
  dropItems: string[];
  description: string;
}

/**
 * 怪物列表
 */
export const MONSTERS: MonsterConfig[] = [
  // 1-10级怪物
  {
    id: 'monster_001',
    name: '野狼',
    level: 1,
    hp: 50,
    attack: 8,
    defense: 2,
    exp: 10,
    gold: 5,
    dropItems: [],
    description: '普通的野狼'
  },
  {
    id: 'monster_002',
    name: '野猪',
    level: 3,
    hp: 80,
    attack: 12,
    defense: 5,
    exp: 20,
    gold: 10,
    dropItems: [],
    description: '凶猛的野猪'
  },
  {
    id: 'monster_003',
    name: '山贼',
    level: 5,
    hp: 100,
    attack: 15,
    defense: 8,
    exp: 30,
    gold: 20,
    dropItems: ['weapon_001', 'armor_001'],
    description: '落草为寇的山贼'
  },
  {
    id: 'monster_004',
    name: '妖狐',
    level: 8,
    hp: 150,
    attack: 20,
    defense: 10,
    exp: 50,
    gold: 30,
    dropItems: ['accessory_001'],
    description: '修炼的狐狸精'
  },
  {
    id: 'monster_005',
    name: '黑熊精',
    level: 10,
    hp: 200,
    attack: 25,
    defense: 15,
    exp: 80,
    gold: 50,
    dropItems: ['weapon_002', 'armor_002'],
    description: '成精的黑熊'
  },
  
  // 11-20级怪物
  {
    id: 'monster_006',
    name: '石魔',
    level: 15,
    hp: 400,
    attack: 40,
    defense: 30,
    exp: 150,
    gold: 100,
    dropItems: ['weapon_003'],
    description: '岩石凝聚的魔物'
  },
  {
    id: 'monster_007',
    name: '火鸦',
    level: 20,
    hp: 600,
    attack: 60,
    defense: 40,
    exp: 300,
    gold: 200,
    dropItems: ['weapon_003', 'armor_003'],
    description: '火焰凝聚的妖鸟'
  },
  
  // 21-30级怪物
  {
    id: 'monster_008',
    name: '蛟龙',
    level: 25,
    hp: 1000,
    attack: 100,
    defense: 80,
    exp: 600,
    gold: 500,
    dropItems: ['weapon_004', 'accessory_002'],
    description: '半步化龙的蛟'
  },
  {
    id: 'monster_009',
    name: '血魔',
    level: 30,
    hp: 2000,
    attack: 150,
    defense: 100,
    exp: 1200,
    gold: 1000,
    dropItems: ['weapon_004', 'armor_003'],
    description: '嗜血的魔物'
  },
  
  // 31-40级怪物
  {
    id: 'monster_010',
    name: '天龙',
    level: 35,
    hp: 5000,
    attack: 300,
    defense: 200,
    exp: 3000,
    gold: 2500,
    dropItems: ['weapon_005', 'accessory_003'],
    description: '真正的龙族'
  },
  {
    id: 'monster_011',
    name: '魔修',
    level: 40,
    hp: 8000,
    attack: 500,
    defense: 300,
    exp: 6000,
    gold: 5000,
    dropItems: ['weapon_005', 'armor_004'],
    description: '修炼魔功的修士'
  },
  
  // 41-50级怪物
  {
    id: 'monster_012',
    name: '上古凶兽',
    level: 45,
    hp: 15000,
    attack: 800,
    defense: 500,
    exp: 12000,
    gold: 10000,
    dropItems: ['weapon_005', 'armor_004', 'accessory_003'],
    description: '上古时期的凶兽'
  },
  {
    id: 'monster_013',
    name: '魔尊',
    level: 50,
    hp: 30000,
    attack: 1500,
    defense: 800,
    exp: 25000,
    gold: 20000,
    dropItems: ['weapon_006', 'armor_005', 'accessory_004'],
    description: '魔道至尊'
  }
];

/**
 * 根据ID获取怪物
 */
export function getMonsterById(id: string): MonsterConfig | undefined {
  return MONSTERS.find(monster => monster.id === id);
}

/**
 * 根据等级获取怪物
 */
export function getMonsterByLevel(level: number): MonsterConfig {
  // 找到等级最接近的怪物
  const sortedMonsters = [...MONSTERS].sort((a, b) => 
    Math.abs(a.level - level) - Math.abs(b.level - level)
  );
  
  return sortedMonsters[0];
}

/**
 * 获取随机怪物（基于玩家等级）
 */
export function getRandomMonster(playerLevel: number): MonsterConfig {
  // 筛选适合玩家等级的怪物（±5级）
  const suitableMonsters = MONSTERS.filter(monster =>
    Math.abs(monster.level - playerLevel) <= 5
  );
  
  if (suitableMonsters.length === 0) {
    return MONSTERS[0];
  }
  
  // 随机选择一个
  return suitableMonsters[Math.floor(Math.random() * suitableMonsters.length)];
}
