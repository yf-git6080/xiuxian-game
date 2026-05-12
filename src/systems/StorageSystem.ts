import { PlayerData } from '../data/PlayerData';

/**
 * 存储系统（适配抖音小游戏和Node.js环境）
 */
export class StorageSystem {
  private storage: Storage;
  
  constructor() {
    // 检测运行环境
    if (typeof tt !== 'undefined' && tt.getStorageSync) {
      // 抖音小游戏环境
      this.storage = {
        getItem: (key: string) => tt.getStorageSync(key) || null,
        setItem: (key: string, value: string) => tt.setStorageSync(key, value),
        removeItem: (key: string) => tt.removeStorageSync(key),
        clear: () => tt.clearStorageSync(),
        length: 0,
        key: (index: number) => ''
      } as Storage;
    } else if (typeof localStorage !== 'undefined') {
      // 浏览器环境
      this.storage = localStorage;
    } else {
      // Node.js环境（内存存储）
      const memoryStorage: { [key: string]: string } = {};
      this.storage = {
        getItem: (key: string) => memoryStorage[key] || null,
        setItem: (key: string, value: string) => { memoryStorage[key] = value; },
        removeItem: (key: string) => { delete memoryStorage[key]; },
        clear: () => { Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]); },
        length: Object.keys(memoryStorage).length,
        key: (index: number) => Object.keys(memoryStorage)[index] || ''
      } as Storage;
    }
  }
  
  /**
   * 保存玩家数据
   */
  savePlayerData(player: PlayerData): void {
    const key = `player_${player.id}`;
    const value = JSON.stringify(player);
    this.storage.setItem(key, value);
    
    // 保存最后登录时间
    this.storage.setItem('lastLoginTime', Date.now().toString());
  }
  
  /**
   * 加载玩家数据
   */
  loadPlayerData(playerId: string): PlayerData | null {
    const key = `player_${playerId}`;
    const value = this.storage.getItem(key);
    
    if (value) {
      try {
        return JSON.parse(value) as PlayerData;
      } catch (error) {
        console.error('解析玩家数据失败:', error);
        return null;
      }
    }
    
    return null;
  }
  
  /**
   * 删除玩家数据
   */
  deletePlayerData(playerId: string): void {
    const key = `player_${playerId}`;
    this.storage.removeItem(key);
  }
  
  /**
   * 获取最后登录时间
   */
  getLastLoginTime(): number {
    const time = this.storage.getItem('lastLoginTime');
    return time ? parseInt(time) : 0;
  }
  
  /**
   * 计算离线时间（毫秒）
   */
  getOfflineTime(): number {
    const lastLoginTime = this.getLastLoginTime();
    if (lastLoginTime === 0) return 0;
    
    return Date.now() - lastLoginTime;
  }
  
  /**
   * 保存游戏设置
   */
  saveSettings(settings: any): void {
    this.storage.setItem('gameSettings', JSON.stringify(settings));
  }
  
  /**
   * 加载游戏设置
   */
  loadSettings(): any {
    const value = this.storage.getItem('gameSettings');
    return value ? JSON.parse(value) : {
      soundEnabled: true,
      musicEnabled: true,
      vibrationEnabled: true
    };
  }
  
  /**
   * 清除所有数据
   */
  clearAll(): void {
    this.storage.clear();
  }
}

// 声明抖音小游戏API
declare const tt: any;
