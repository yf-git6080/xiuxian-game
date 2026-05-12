/**
 * 功法类型
 */
export enum SkillType {
  ATTACK = 'attack',      // 攻击型
  DEFENSE = 'defense',    // 防御型
  AUXILIARY = 'auxiliary' // 辅助型
}

/**
 * 功法品质
 */
export enum SkillQuality {
  COMMON = 'common',      // 普通
  RARE = 'rare',          // 稀有
  EPIC = 'epic',          // 史诗
  LEGENDARY = 'legendary' // 传说
}

/**
 * 功法配置
 */
export interface SkillConfig {
  id: string;
  name: string;
  type: SkillType;
  quality: SkillQuality;
  level: number;
  maxLevel: number;
  bonus: number;
  bonusPerLevel: number;
  cost: number;
  description: string;
  unlockLevel: number;
}

/**
 * 功法列表
 */
export const SKILLS: SkillConfig[] = [
  // 普通功法
  {
    id: 'skill_001',
    name: '基础吐纳法',
    type: SkillType.AUXILIARY,
    quality: SkillQuality.COMMON,
    level: 1,
    maxLevel: 10,
    bonus: 1.1,
    bonusPerLevel: 0.05,
    cost: 100,
    description: '修炼基础功法，提升修炼速度10%',
    unlockLevel: 1
  },
  {
    id: 'skill_002',
    name: '铁布衫',
    type: SkillType.DEFENSE,
    quality: SkillQuality.COMMON,
    level: 1,
    maxLevel: 10,
    bonus: 1.1,
    bonusPerLevel: 0.05,
    cost: 200,
    description: '外门硬功，提升防御10%',
    unlockLevel: 3
  },
  {
    id: 'skill_003',
    name: '烈焰掌',
    type: SkillType.ATTACK,
    quality: SkillQuality.COMMON,
    level: 1,
    maxLevel: 10,
    bonus: 1.15,
    bonusPerLevel: 0.08,
    cost: 300,
    description: '掌心凝聚烈焰，提升攻击15%',
    unlockLevel: 5
  },
  
  // 稀有功法
  {
    id: 'skill_004',
    name: '太乙真经',
    type: SkillType.AUXILIARY,
    quality: SkillQuality.RARE,
    level: 1,
    maxLevel: 20,
    bonus: 1.3,
    bonusPerLevel: 0.1,
    cost: 1000,
    description: '道家真经，修炼速度提升30%',
    unlockLevel: 10
  },
  {
    id: 'skill_005',
    name: '金刚不坏体',
    type: SkillType.DEFENSE,
    quality: SkillQuality.RARE,
    level: 1,
    maxLevel: 20,
    bonus: 1.25,
    bonusPerLevel: 0.12,
    cost: 1500,
    description: '佛门护体神功，防御提升25%',
    unlockLevel: 15
  },
  {
    id: 'skill_006',
    name: '雷霆剑诀',
    type: SkillType.ATTACK,
    quality: SkillQuality.RARE,
    level: 1,
    maxLevel: 20,
    bonus: 1.35,
    bonusPerLevel: 0.15,
    cost: 2000,
    description: '引九天雷霆入剑，攻击提升35%',
    unlockLevel: 20
  },
  
  // 史诗功法
  {
    id: 'skill_007',
    name: '太上忘情录',
    type: SkillType.AUXILIARY,
    quality: SkillQuality.EPIC,
    level: 1,
    maxLevel: 30,
    bonus: 1.6,
    bonusPerLevel: 0.15,
    cost: 10000,
    description: '太上忘情，修炼速度提升60%',
    unlockLevel: 30
  },
  {
    id: 'skill_008',
    name: '九转金身',
    type: SkillType.DEFENSE,
    quality: SkillQuality.EPIC,
    level: 1,
    maxLevel: 30,
    bonus: 1.5,
    bonusPerLevel: 0.18,
    cost: 15000,
    description: '九转功成，金身不坏，防御提升50%',
    unlockLevel: 35
  },
  {
    id: 'skill_009',
    name: '星辰剑诀',
    type: SkillType.ATTACK,
    quality: SkillQuality.EPIC,
    level: 1,
    maxLevel: 30,
    bonus: 1.65,
    bonusPerLevel: 0.2,
    cost: 20000,
    description: '引星辰之力，攻击提升65%',
    unlockLevel: 40
  },
  
  // 传说功法
  {
    id: 'skill_010',
    name: '混沌功',
    type: SkillType.AUXILIARY,
    quality: SkillQuality.LEGENDARY,
    level: 1,
    maxLevel: 50,
    bonus: 2.0,
    bonusPerLevel: 0.25,
    cost: 100000,
    description: '混沌初开，修炼速度翻倍',
    unlockLevel: 50
  },
  {
    id: 'skill_011',
    name: '不灭金身',
    type: SkillType.DEFENSE,
    quality: SkillQuality.LEGENDARY,
    level: 1,
    maxLevel: 50,
    bonus: 1.8,
    bonusPerLevel: 0.22,
    cost: 150000,
    description: '金身不灭，万法不侵，防御提升80%',
    unlockLevel: 60
  },
  {
    id: 'skill_012',
    name: '诛仙剑诀',
    type: SkillType.ATTACK,
    quality: SkillQuality.LEGENDARY,
    level: 1,
    maxLevel: 50,
    bonus: 2.0,
    bonusPerLevel: 0.25,
    cost: 200000,
    description: '一剑诛仙，攻击翻倍',
    unlockLevel: 70
  }
];

/**
 * 根据ID获取功法
 */
export function getSkillById(id: string): SkillConfig | undefined {
  return SKILLS.find(skill => skill.id === id);
}

/**
 * 获取玩家可学习的功法
 */
export function getAvailableSkills(playerLevel: number): SkillConfig[] {
  return SKILLS.filter(skill => playerLevel >= skill.unlockLevel);
}

/**
 * 计算功法加成
 */
export function calculateSkillBonus(skill: SkillConfig): number {
  return skill.bonus + (skill.level - 1) * skill.bonusPerLevel;
}
