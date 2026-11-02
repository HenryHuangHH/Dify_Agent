# difyagent

A Claude Code skill that sends text to a [Dify](https://dify.ai) app for summarizing.

When you ask Claude Code to summarize something, the `summarize` skill runs `agent.js`, which sends the text to Dify and prints the reply. Claude then gives you the answer in under 200 words.

## Files

- `.claude/skills/summarize/SKILL.md`: the skill. Tells Claude when and how to run `agent.js`.
- `.claude/skills/agent/agent.js`: calls the Dify chat API and prints the streamed answer.
- `agent.sh`: the same request with curl, for testing.

## Setup

You need Node.js 20.12 or newer and an API key from your Dify app's **API Access** page. There's nothing to install.

```bash
cp .env.example .env
```

Then put your key in `.env`.

## Usage

In Claude Code, from this folder:

```
summarize this: <your text>
```

Or run the script yourself:

```bash
node .claude/skills/agent/agent.js "summarize this: <your text>"
```

## Errors

- `401`: the key is wrong. It should start with `app-`.
- `model_currently_not_support`: your Dify app uses a model your plan doesn't include. Pick another model in Dify and publish the app again.
# Dify_Agent
