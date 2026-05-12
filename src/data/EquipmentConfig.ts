/**
 * 装备类型
 */
export enum EquipmentType {
  WEAPON = 'weapon',      // 武器
  ARMOR = 'armor',        // 防具
  ACCESSORY = 'accessory' // 饰品
}

/**
 * 装备品质
 */
export enum EquipmentQuality {
  COMMON = 'common',      // 普通
  RARE = 'rare',          // 稀有
  EPIC = 'epic',          // 史诗
  LEGENDARY = 'legendary' // 传说
}

/**
 * 装备属性
 */
export interface EquipmentStats {
  attack?: number;
  defense?: number;
  hp?: number;
  spirit?: number;
}

/**
 * 装备配置
 */
export interface EquipmentConfig {
  id: string;
  name: string;
  type: EquipmentType;
  quality: EquipmentQuality;
  level: number;
  stats: EquipmentStats;
  description: string;
  dropRate: number;
}

/**
 * 装备列表
 */
export const EQUIPMENTS: EquipmentConfig[] = [
  // 武器 - 普通
  {
    id: 'weapon_001',
    name: '木剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.COMMON,
    level: 1,
    stats: { attack: 5 },
    description: '普通的木剑',
    dropRate: 0.3
  },
  {
    id: 'weapon_002',
    name: '铁剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.COMMON,
    level: 10,
    stats: { attack: 20 },
    description: '铁制的长剑',
    dropRate: 0.25
  },
  
  // 武器 - 稀有
  {
    id: 'weapon_003',
    name: '青云剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.RARE,
    level: 20,
    stats: { attack: 50 },
    description: '青云宗入门剑',
    dropRate: 0.15
  },
  {
    id: 'weapon_004',
    name: '紫电剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.RARE,
    level: 30,
    stats: { attack: 100 },
    description: '附带雷电之力的宝剑',
    dropRate: 0.1
  },
  
  // 武器 - 史诗
  {
    id: 'weapon_005',
    name: '星辰剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.EPIC,
    level: 40,
    stats: { attack: 200 },
    description: '蕴含星辰之力的神剑',
    dropRate: 0.05
  },
  
  // 武器 - 传说
  {
    id: 'weapon_006',
    name: '诛仙剑',
    type: EquipmentType.WEAPON,
    quality: EquipmentQuality.LEGENDARY,
    level: 50,
    stats: { attack: 500 },
    description: '上古神剑，一剑诛仙',
    dropRate: 0.01
  },
  
  // 防具 - 普通
  {
    id: 'armor_001',
    name: '布衣',
    type: EquipmentType.ARMOR,
    quality: EquipmentQuality.COMMON,
    level: 1,
    stats: { defense: 3, hp: 20 },
    description: '普通的布衣',
    dropRate: 0.3
  },
  {
    id: 'armor_002',
    name: '铁甲',
    type: EquipmentType.ARMOR,
    quality: EquipmentQuality.COMMON,
    level: 10,
    stats: { defense: 15, hp: 50 },
    description: '铁制的铠甲',
    dropRate: 0.25
  },
  
  // 防具 - 稀有
  {
    id: 'armor_003',
    name: '青云袍',
    type: EquipmentType.ARMOR,
    quality: EquipmentQuality.RARE,
    level: 20,
    stats: { defense: 40, hp: 100 },
    description: '青云宗弟子服饰',
    dropRate: 0.15
  },
  
  // 防具 - 史诗
  {
    id: 'armor_004',
    name: '金丝软甲',
    type: EquipmentType.ARMOR,
    quality: EquipmentQuality.EPIC,
    level: 40,
    stats: { defense: 150, hp: 300 },
    description: '金丝织就，刀枪不入',
    dropRate: 0.05
  },
  
  // 防具 - 传说
  {
    id: 'armor_005',
    name: '龙鳞甲',
    type: EquipmentType.ARMOR,
    quality: EquipmentQuality.LEGENDARY,
    level: 50,
    stats: { defense: 400, hp: 800 },
    description: '真龙之鳞，万法不侵',
    dropRate: 0.01
  },
  
  // 饰品 - 普通
  {
    id: 'accessory_001',
    name: '灵石',
    type: EquipmentType.ACCESSORY,
    quality: EquipmentQuality.COMMON,
    level: 1,
    stats: { spirit: 10 },
    description: '低级灵石',
    dropRate: 0.3
  },
  
  // 饰品 - 稀有
  {
    id: 'accessory_002',
    name: '灵玉佩',
    type: EquipmentType.ACCESSORY,
    quality: EquipmentQuality.RARE,
    level: 20,
    stats: { spirit: 50, hp: 30 },
    description: '灵气浓郁的玉佩',
    dropRate: 0.15
  },
  
  // 饰品 - 史诗
  {
    id: 'accessory_003',
    name: '护心镜',
    type: EquipmentType.ACCESSORY,
    quality: EquipmentQuality.EPIC,
    level: 40,
    stats: { spirit: 100, hp: 100, defense: 20 },
    description: '护持心脉的宝物',
    dropRate: 0.05
  },
  
  // 饰品 - 传说
  {
    id: 'accessory_004',
    name: '混沌珠',
    type: EquipmentType.ACCESSORY,
    quality: EquipmentQuality.LEGENDARY,
    level: 50,
    stats: { spirit: 300, hp: 300, attack: 50, defense: 50 },
    description: '混沌本源凝聚，至宝',
    dropRate: 0.01
  }
];

/**
 * 根据ID获取装备
 */
export function getEquipmentById(id: string): EquipmentConfig | undefined {
  return EQUIPMENTS.find(equipment => equipment.id === id);
}

/**
 * 获取指定类型和等级的装备
 */
export function getEquipmentsByTypeAndLevel(
  type: EquipmentType, 
  minLevel: number, 
  maxLevel: number
): EquipmentConfig[] {
  return EQUIPMENTS.filter(equipment => 
    equipment.type === type &&
    equipment.level >= minLevel &&
    equipment.level <= maxLevel
  );
}

/**
 * 随机掉落装备
 */
export function randomDropEquipment(playerLevel: number): EquipmentConfig | null {
  const availableEquipments = EQUIPMENTS.filter(equipment => 
    Math.abs(equipment.level - playerLevel) <= 10
  );
  
  for (const equipment of availableEquipments) {
    if (Math.random() < equipment.dropRate) {
      return equipment;
    }
  }
  
  return null;
}
