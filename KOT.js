const { createClient } = require("bedrock-protocol");

let client;
let sleeping = false;

const options = {
  host: "KaOaTa.aternos.me",
  port: 21065,
  username: "BotKeepAlive",
  skipPing: true
};

function connectBot() {
  client = createClient(options);

  client.on('join', () => {
    sleeping = false;
    console.log('Bot joined the server ✅');
  });

  client.on('text', (packet) => {
    if (packet.type === 'chat') {
      const message = packet.message.toLowerCase().trim();
      console.log(`💬 ${packet.source_name}: ${message}`);

      if (message === "!bot sleep" && !sleeping) {
        console.log("😴 Sleeping for 2 minutes...");
        sleeping = true;
        client.disconnect(); // Leave the server

        setTimeout(() => {
          console.log("⏰ Waking up and reconnecting...");
          connectBot(); // Reconnect
        }, 2 * 60 * 1000); // 2 minutes
      }
    }
  });

  client.on('disconnect', (reason) => {
    console.log('❌ Disconnected:', reason);
    if (!sleeping) {
      setTimeout(() => {
        console.log('🔁 Reconnecting...');
        connectBot();
      }, 5000);
    }
  });
}

connectBot();
