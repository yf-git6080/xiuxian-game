import { GameController } from './core/GameController';
import { GameEvent } from './core/GameController';

/**
 * 主程序入口
 */
class GameApp {
  private game: GameController;
  
  constructor() {
    // 创建游戏实例
    this.game = new GameController({
      autoSaveInterval: 30000,
      battleInterval: 1000
    });
    
    // 注册事件监听器
    this.registerEventListeners();
  }
  
  /**
   * 注册事件监听器
   */
  private registerEventListeners(): void {
    this.game.addEventListener((event: GameEvent) => {
      this.handleGameEvent(event);
    });
  }
  
  /**
   * 处理游戏事件
   */
  private handleGameEvent(event: GameEvent): void {
    const player = this.game.getPlayer();
    
    switch (event.type) {
      case 'levelUp':
        console.log(`🎉 升级！当前等级: ${event.data.newLevel}`);
        if (event.data.realmUp) {
          console.log(`🌟 境界突破: ${event.data.newRealm}`);
        }
        break;
        
      case 'realmUp':
        console.log(`🌟 恭喜突破至 ${event.data.newRealm}！`);
        break;
        
      case 'battleWin':
        if (this.game.getStats().battleCount % 10 === 0) {
          console.log(`⚔️ 已击杀 ${player.totalKillCount} 只怪物`);
          console.log(`💰 灵石: ${player.gold}`);
        }
        break;
        
      case 'battleLose':
        console.log(`💔 战斗失败，正在恢复...`);
        break;
        
      case 'drop':
        console.log(`🎁 获得装备: ${event.data.drops.join(', ')}`);
        break;
    }
  }
  
  /**
   * 启动游戏
   */
  start(playerName: string): void {
    console.log('====================================');
    console.log('    🎮 修仙挂机游戏 v1.0');
    console.log('====================================');
    console.log('');
    
    // 初始化游戏
    this.game.init(playerName);
    
    // 开始游戏
    this.game.start();
    
    console.log('');
    console.log('游戏运行中...');
    console.log('按 Ctrl+C 退出游戏');
    console.log('');
    
    // 显示玩家状态
    this.showPlayerStatus();
    
    // 定期显示状态
    setInterval(() => {
      this.showPlayerStatus();
    }, 10000); // 每10秒显示一次
  }
  
  /**
   * 显示玩家状态
   */
  private showPlayerStatus(): void {
    const player = this.game.getPlayer();
    const stats = this.game.getStats();
    
    console.log('');
    console.log('─────────────────────────────────');
    console.log(`📊 ${player.name} 的状态`);
    console.log('─────────────────────────────────');
    console.log(`等级: ${player.level}`);
    console.log(`境界: ${player.realm}`);
    console.log(`经验: ${player.exp} / ${this.getExpNeeded(player.level)}`);
    console.log(`生命: ${player.hp} / ${player.maxHp}`);
    console.log(`攻击: ${player.attack}  防御: ${player.defense}`);
    console.log(`灵石: ${player.gold}  仙玉: ${player.gems}`);
    console.log(`击杀: ${player.totalKillCount} 只怪物`);
    console.log(`战斗次数: ${stats.battleCount}`);
    console.log('─────────────────────────────────');
    console.log('');
  }
  
  /**
   * 获取升级所需经验
   */
  private getExpNeeded(level: number): number {
    return Math.floor(100 * Math.pow(1.15, level - 1));
  }
  
  /**
   * 停止游戏
   */
  stop(): void {
    this.game.stop();
  }
}

// 启动游戏
const app = new GameApp();

// 处理退出信号
process.on('SIGINT', () => {
  console.log('');
  console.log('正在保存游戏...');
  app.stop();
  console.log('游戏已退出，欢迎下次再来！');
  process.exit(0);
});

// 开始游戏
app.start('修仙者');
