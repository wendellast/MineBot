import mineflayer from 'mineflayer';
import pathfinderPkg from 'mineflayer-pathfinder';
import { stopJumping, followPlayer, guardArea, stopGuarding } from './actions.js';
import { Vec3 } from 'vec3';
const HOST = "25.42.191.228";
const PORT = 44903;
const BOTNAME = "GUI";
const { pathfinder, Movements, goals } = pathfinderPkg;
async function createBot() {
    const fetch = (await import('node-fetch')).default;
    const bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOTNAME,
    });
    let exploring = false;
    let talkingEnabled = false;
    bot.loadPlugin(pathfinder);
    bot.on('spawn', () => {
        const defaultMove = new Movements(bot);
        bot.pathfinder.setMovements(defaultMove);
        console.log("Movements inicializado com sucesso!");
    });
    async function sendMessage(message) {
        try {
            const response = await fetch('https://gui.up.railway.app/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            return data.response;
        }
        catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
            return "Erro ao enviar a mensagem.";
        }
    }
    async function wanderAround() {
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
    bot.on('login', () => {
        console.log("Bot conectado ao servidor Minecraft!");
    });
    bot.on('chat', async (username, message) => {
        if (username === bot.username)
            return;
        console.log(`Mensagem recebida de ${username}: ${message}`);
        const botName = bot.username;
        if (message === `${botName} parar_pular`) {
            stopJumping();
            bot.chat('Agora parei de pular.');
            exploring = false;
        }
        if (message.startsWith(`${botName} seguir`)) {
            const targetPlayerName = message.split(' ')[2];
            const targetPlayer = bot.players[targetPlayerName];
            if (targetPlayer) {
                followPlayer(bot, targetPlayer.entity);
                bot.chat(`Agora estou seguindo ${targetPlayerName}`);
            }
            else {
                bot.chat(`Não encontrei o jogador ${targetPlayerName}`);
            }
            exploring = false;
        }
        if (message === `${botName} guard`) {
            const player = bot.players[username];
            if (player) {
                bot.chat('Guardando a área.');
                guardArea(bot, player.entity.position);
            }
            exploring = false;
        }
        if (message === `${botName} parar_guardar`) {
            stopGuarding(bot);
            bot.chat('Parando de guardar.');
        }
        if (message === `${botName} explora`) {
            bot.chat('Voltando a explorar!');
            exploring = true;
            wanderAround();
        }
        if (message === `${botName} parar de explora`) {
            bot.chat('parando de  explorar!');
            exploring = false;
        }
        if (message === `${botName} falar`) {
            talkingEnabled = true;
            bot.chat("Ola vamos conversar!");
            return;
        }
        if (message === `${botName} parar de falar`) {
            talkingEnabled = false;
            bot.chat("Agora parei de falar. :(");
            return;
        }
        if (talkingEnabled) {
            const response = await sendMessage(message);
            bot.chat(response);
        }
    });
    bot.on('error', (err) => console.error("Erro:", err));
    bot.on('end', () => {
        console.log("Bot desconectado. Reconectando...");
        setTimeout(createBot, 5000);
    });
}
createBot();
