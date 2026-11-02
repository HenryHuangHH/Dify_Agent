---
name: summarize
description: use when user ask to summarize a long paragraph
---

## steps

- Run `node .claude/skills/agent/agent.js "summarize this: <paragraph>"` via Bash from the project root. The script reads `DIFY_API_KEY` from the environment or from the project's `.env` file (the Dify agent does the actual summarizing).
- Take the printed answer and present it to the user in under 200 words.
