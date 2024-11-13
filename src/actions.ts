
import mineflayer from 'mineflayer';
import pathfinderPkg from 'mineflayer-pathfinder';
const { Movements, goals } = pathfinderPkg;  

let jumpInterval: NodeJS.Timeout | null = null;
let guardPos: { x: number; y: number; z: number } | null = null;


export function startJumping(bot: mineflayer.Bot) {
    if (jumpInterval) return; 

    jumpInterval = setInterval(() => {
        if (bot.entity.onGround) {
            bot.setControlState('jump', true); 
            setTimeout(() => {
                bot.setControlState('jump', false); 
            }, 500); 
        }
    }, 1000); 
}

export function stopJumping() {
    if (jumpInterval) {
        clearInterval(jumpInterval); 
        jumpInterval = null;
    }
}



export function guardArea(bot: mineflayer.Bot, pos: { x: number; y: number; z: number }) {
    guardPos = pos;
    moveToGuardPos(bot); 
}


export function moveToGuardPos(bot: mineflayer.Bot) {
    if (!guardPos) return;
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z));
}

export function stopGuarding(bot: mineflayer.Bot) {
    guardPos = null;
    bot.pathfinder.setGoal(null); 
    bot.chat('Agora parei de guardar esta área.');
}




export function moveTo(bot: mineflayer.Bot, x: number, y: number, z: number) {
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z));
}


export function followPlayer(bot: mineflayer.Bot, targetEntity: any) {
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalFollow(targetEntity, 1));
}

export function attackEntity(bot: mineflayer.Bot, targetEntity: any) {
    if (targetEntity) {
        bot.attack(targetEntity);
    }
}


export function useItemAtSlot(bot: mineflayer.Bot, slot: number) {
    bot.setQuickBarSlot(slot);
    bot.activateItem();
}


export function interactWithBlock(bot: mineflayer.Bot, block: any) {
    bot.activateBlock(block);
}


export function jump(bot: mineflayer.Bot) {
    bot.setControlState('jump', true);
    setTimeout(() => {
        bot.setControlState('jump', false);
    }, 500);
}




export function stopFollowing(bot: mineflayer.Bot) {
    bot.pathfinder.setGoal(null);
}


