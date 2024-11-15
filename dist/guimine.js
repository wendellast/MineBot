import mineflayer from 'mineflayer';
import pathfinderPkg from 'mineflayer-pathfinder';
import { stopJumping, followPlayer, guardArea, stopGuarding, wanderAround, stopExploring } from './actions.js';
import fetch from 'node-fetch';
const { pathfinder, Movements } = pathfinderPkg;
const HOST = "25.42.191.228";
const PORT = 37067;
const BOTNAME = "GUI";
async function createBot() {
    const bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOTNAME,
        version: '1.16.5'
    });
    let talkingEnabled = false;
    bot.loadPlugin(pathfinder);
    // Inicialização dos Movimentos
    bot.on('spawn', () => {
        const defaultMove = new Movements(bot);
        bot.pathfinder.setMovements(defaultMove);
        console.log("Movements inicializado com sucesso!");
    });
    // Função para enviar mensagens via API
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
    // Evento de login
    bot.on('login', () => {
        console.log("Bot conectado ao servidor Minecraft!");
    });
    // Evento de chat
    bot.on('chat', async (username, message) => {
        if (username === bot.username)
            return;
        console.log(`Mensagem recebida de ${username}: ${message}`);
        const botName = bot.username;
        switch (message) {
            case `${botName} parar_pular`:
                stopJumping();
                bot.chat('Agora parei de pular.');
                break;
            case `${botName} explora`:
                bot.chat('Voltando a explorar!');
                wanderAround(bot);
                break;
            case `${botName} parar de explora`:
                bot.chat('Parando de explorar!');
                stopExploring();
                break;
            case `${botName} guard`:
                const player = bot.players[username];
                if (player) {
                    bot.chat('Guardando a área.');
                    guardArea(bot, player.entity.position);
                }
                break;
            case `${botName} parar_guardar`:
                stopGuarding(bot);
                bot.chat('Parando de guardar.');
                break;
            case `${botName} falar`:
                talkingEnabled = true;
                bot.chat("Olá, vamos conversar!");
                break;
            case `${botName} parar de falar`:
                talkingEnabled = false;
                bot.chat("Agora parei de falar. :(");
                break;
            default:
                if (talkingEnabled) {
                    const response = await sendMessage(message);
                    bot.chat(response);
                }
                break;
        }
        // Comando para seguir um jogador
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
        }
    });
    // Tratamento de erro
    bot.on('error', (err) => console.error("Erro:", err));
    // Reconexão automática
    bot.on('end', () => {
        console.log("Bot desconectado. Reconectando...");
        setTimeout(createBot, 5000);
    });
}
createBot();
