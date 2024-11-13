# Bot Minecraft - README

Este projeto cria um bot para o servidor Minecraft utilizando `mineflayer` e `mineflayer-pathfinder`. O bot se conecta ao servidor Minecraft, interage com jogadores e executa diversas ações baseadas em comandos de chat.

## Requisitos

- **Node.js** versão 18 ou superior. (Verifique sua versão com `node -v`)

## Instalando as dependências

### 1. Clone o repositório ou baixe os arquivos do projeto.

```bash
git clone  https://github.com/wendellast/MineBot.git

```
```bash
cd MineBot   
```

### 2. Instale as dependências do projeto utilizando `npm`:
```bash
npm install
```

### 3. Iniciar o server, rode `start` para começar:
```bash
npm start
```

## Configuração

Antes de rodar o bot, você pode configurar os parâmetros de conexão para o servidor Minecraft no código:

- **HOST**: O IP do servidor Minecraft (exemplo: `"25.42.191.228"`).
- **PORT**: A porta de conexão do servidor (exemplo: `44903`).
- **BOTNAME**: O nome do bot (exemplo: `"GUI"`).

## Rodando o bot

Com as dependências instaladas e a configuração ajustada, inicie o bot com o comando:

   npm start

O bot se conectará automaticamente ao servidor Minecraft e ficará esperando por comandos no chat do jogo.

## Comandos do Bot

O bot responde a uma série de comandos enviados no chat do servidor. Alguns exemplos de comandos:

- **Parar de pular:**
  - Comando: `GUI parar_pular`
  - Descrição: O bot para de pular.

- **Seguir outro jogador:**
  - Comando: `GUI seguir <nome_do_jogador>`
  - Descrição: O bot começará a seguir o jogador especificado.

- **Guardar a área:**
  - Comando: `GUI guard`
  - Descrição: O bot começará a guardar a posição de um jogador.

- **Parar de guardar:**
  - Comando: `GUI parar_guardar`
  - Descrição: O bot para de guardar a área.

- **Explorar:**
  - Comando: `GUI explora`
  - Descrição: O bot começará a explorar o mundo aleatoriamente.

- **Parar de explorar:**
  - Comando: `GUI parar de explora`
  - Descrição: O bot para de explorar.

- **Falar:**
  - Comando: `GUI falar`
  - Descrição: O bot começará a responder automaticamente às mensagens.

- **Parar de falar:**
  - Comando: `GUI parar de falar`
  - Descrição: O bot para de responder automaticamente.


## API

- O Bot esta usando api da GUI-IA, para desenvolver conversa dentro do chat do minecraft: `https://github.com/wendellast/Gui.git`