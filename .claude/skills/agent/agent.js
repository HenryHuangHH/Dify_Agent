const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Readable } = require('stream');

const envFile = path.join(__dirname, '../../../.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const key = process.env.DIFY_API_KEY;
const query = process.argv.slice(2).join(' ');

if (!key) {
  console.error('DIFY_API_KEY is not set (put it in .env)');
  process.exit(1);
}
if (!query) {
  console.error('usage: node agent.js "your text"');
  process.exit(1);
}

async function main() {
  const res = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      query,
      response_mode: 'streaming',
      user: 'claude-code',
    }),
  });

  if (!res.ok) {
    throw new Error(`Dify returned ${res.status}: ${await res.text()}`);
  }

  // Dify streams lines like: data: {"event": "message", "answer": "..."}
  const lines = readline.createInterface({ input: Readable.fromWeb(res.body) });
  for await (const line of lines) {
    if (!line.startsWith('data:')) continue;
    const data = JSON.parse(line.slice(5));

    if (data.event === 'message' || data.event === 'agent_message') {
      process.stdout.write(data.answer);
    }
    if (data.event === 'error') {
      throw new Error(data.message);
    }
  }
  console.log();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
