import pathfinderPkg from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
const { Movements, goals } = pathfinderPkg;
let jumpInterval = null;
let guardPos = null;
let exploring = false;
/**
 * Inicia o bot pulando a cada segundo.
 * @param bot Instância do bot
 */
export function startJumping(bot) {
    if (jumpInterval)
        return;
    jumpInterval = setInterval(() => {
        if (bot.entity.onGround) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 1000);
}
/**
 * Para o bot de pular.
 */
export function stopJumping() {
    if (jumpInterval) {
        clearInterval(jumpInterval);
        jumpInterval = null;
    }
}
/**
 * Define uma posição para o bot guardar e move-o até lá.
 * @param bot Instância do bot
 * @param pos Posição a ser guardada
 */
export function guardArea(bot, pos) {
    guardPos = pos;
    moveToGuardPos(bot);
}
/**
 * Move o bot para a posição definida para guardar.
 * @param bot Instância do bot
 */
export function moveToGuardPos(bot) {
    if (!guardPos)
        return;
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z));
}
/**
 * Para de guardar a posição.
 * @param bot Instância do bot
 */
export function stopGuarding(bot) {
    guardPos = null;
    bot.pathfinder.setGoal(null);
    bot.chat('Agora parei de guardar esta área.');
}
/**
 * Faz o bot seguir uma entidade.
 * @param bot Instância do bot
 * @param targetEntity Entidade a ser seguida
 */
export function followPlayer(bot, targetEntity) {
    const movements = new Movements(bot);
    bot.pathfinder.setMovements(movements);
    bot.pathfinder.setGoal(new goals.GoalFollow(targetEntity, 1));
}
/**
 * Para o bot de seguir qualquer entidade.
 * @param bot Instância do bot
 */
export function stopFollowing(bot) {
    bot.pathfinder.setGoal(null);
}
/**
 * Faz o bot explorar o ambiente aleatoriamente.
 * @param bot Instância do bot
 */
export async function wanderAround(bot) {
    exploring = true;
    while (exploring) {
        const x = bot.entity.position.x + (Math.random() - 0.5) * 100;
        const z = bot.entity.position.z + (Math.random() - 0.5) * 100;
        const y = bot.entity.position.y;
        const targetPos = new Vec3(x, y, z);
        bot.pathfinder.setGoal(new goals.GoalNear(targetPos.x, targetPos.y, targetPos.z, 1));
        console.log(`Explorando para posição x:${x.toFixed(2)} z:${z.toFixed(2)}`);
        await new Promise((resolve) => setTimeout(resolve, 15000));
    }
}
/**
 * Para o bot de explorar.
 */
export function stopExploring() {
    exploring = false;
}
