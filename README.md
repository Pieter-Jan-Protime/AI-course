# AI Course — GitHub Copilot Customization

A hands-on course for learning how to customize GitHub Copilot in VS Code using prompt files, slash commands, and workspace-scoped AI instructions.

---

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [How to Use](#how-to-use)
  - [Slash Commands (Prompt Files)](#slash-commands-prompt-files)
  - [Available Commands](#available-commands)
- [Documentation](#documentation)

---

## Overview

This course walks through the process of extending and customizing GitHub Copilot through:

- **Workspace prompt files** — reusable slash commands (`.prompt.md`) stored in `.github/prompts/`
- **AI documentation** — reference guides for contributors and the AI assistant stored in `.AI_docs/`
- **Conventional Commits** — a structured commit workflow enforced via a prompt

The `DEVLOG.md` tracks the incremental tasks completed during the course.

---

## File Structure

```
AI-course/
├── .AI_docs/
│   └── prompt-file.md          # Guide: how to create workspace prompt files
├── .github/
│   └── prompts/
│       ├── commit.prompt.md    # /commit — stage & commit with Conventional Commits
│       └── readme.prompt.md    # /readme — generate or update this README
├── DEVLOG.md                   # Running log of course tasks and progress
└── README.md                   # This file
```

---

## How to Use

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with the **GitHub Copilot** extension installed and signed in.

### Slash Commands (Prompt Files)

Prompt files are invoked by typing `/` followed by the prompt name in the Copilot Chat panel.

```
/commit
/readme
```

You can append extra context after the command if needed:

```
/commit fix login bug
```

### Available Commands

| Command | Description |
|---|---|
| `/commit` | Stages all changes and creates a Conventional Commits 1.0.0 message without confirmation. |
| `/readme` | Gathers project information and generates or updates the `README.md`. |

---

## Documentation

| File | Description |
|---|---|
| [.AI_docs/prompt-file.md](.AI_docs/prompt-file.md) | Reference guide for creating workspace prompt files: format, front-matter fields, file location, and usage tips. |
| [DEVLOG.md](DEVLOG.md) | Chronological log of course tasks and the decisions made along the way. |
