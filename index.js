const { createClient } = require("bedrock-protocol");

const options = {
  host: "omertauhid.aternos.me", // Replace with your Aternos Bedrock server IP
  port: 45001, // Usually 19132 for Bedrock
  username: "BotKeepAlive", // Bot name
  skipPing: true
};

const client = createClient(options);

client.on('join', () => {
  console.log('Bot joined the server');
});

client.on('disconnect', (reason) => {
  console.log('Bot got disconnected:', reason);
  setTimeout(() => {
    console.log('Reconnecting...');
    createClient(options);
  }, 5000); // Try to reconnect after 5 seconds
});
