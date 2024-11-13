import pathfinderPkg from 'mineflayer-pathfinder';
const { Movements, goals } = pathfinderPkg;
let jumpInterval = null;
let guardPos = null;
export function startJumping(bot) {
    if (jumpInterval)
        return;
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
export function guardArea(bot, pos) {
    guardPos = pos;
    moveToGuardPos(bot);
}
export function moveToGuardPos(bot) {
    if (!guardPos)
        return;
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z));
}
export function stopGuarding(bot) {
    guardPos = null;
    bot.pathfinder.setGoal(null);
    bot.chat('Agora parei de guardar esta área.');
}
export function moveTo(bot, x, y, z) {
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z));
}
export function followPlayer(bot, targetEntity) {
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalFollow(targetEntity, 1));
}
export function attackEntity(bot, targetEntity) {
    if (targetEntity) {
        bot.attack(targetEntity);
    }
}
export function useItemAtSlot(bot, slot) {
    bot.setQuickBarSlot(slot);
    bot.activateItem();
}
export function interactWithBlock(bot, block) {
    bot.activateBlock(block);
}
export function jump(bot) {
    bot.setControlState('jump', true);
    setTimeout(() => {
        bot.setControlState('jump', false);
    }, 500);
}
export function stopFollowing(bot) {
    bot.pathfinder.setGoal(null);
}
