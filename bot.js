const { createClient } = require('bedrock-protocol');

        const client = createClient({
          host: 'omertauhid.aternos.me', // replace with IP
          port: 45001, // or your custom port
          username: 'GitHubBot',
          version: '1.21.72',
        });

        client.on('join', () => {
          console.log('Joined server');
        });

        client.on('disconnect', (reason) => {
          console.log('Disconnected:', reason);
        });

        // Stay for 15 minutes
        setTimeout(() => {
          console.log('Leaving server...');
          client.disconnect('Timeout done');
        }, 15 * 60 * 1000);
