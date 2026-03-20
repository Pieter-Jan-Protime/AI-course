# AI Course — GitHub Copilot Customization

A hands-on course for learning how to customize GitHub Copilot in VS Code using prompt files, slash commands, and workspace-scoped AI instructions.

---

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [How to Use](#how-to-use)
  - [Prerequisites](#prerequisites)
  - [Running the App](#running-the-app)
  - [Slash Commands (Prompt Files)](#slash-commands-prompt-files)
  - [Available Commands](#available-commands)
- [Documentation](#documentation)

---

## Overview

This course walks through the process of extending and customizing GitHub Copilot through:

- **Workspace prompt files** — reusable slash commands (`.prompt.md`) stored in `.github/prompts/`
- **AI documentation** — reference guides, specs, and implementation plans stored in `.AI_docs/` and `ai_docs/`
- **Conventional Commits** — a structured commit workflow enforced via a prompt
- **Sample app** — a React/TypeScript/Vite application (`app/`) built incrementally by following AI-generated plans

The `DEVLOG.md` tracks the incremental tasks completed during the course.

---

## File Structure

```
AI-course/
├── .AI_docs/
│   ├── prompt-file.md          # Guide: how to create workspace prompt files
│   └── specs/
│       └── 0001-display-clock.md   # Feature spec: display a live clock
├── .github/
│   └── prompts/
│       ├── commit.prompt.md              # /commit
│       ├── create-implementation-plan.prompt.md  # /create-implementation-plan
│       ├── implement-plan.prompt.md      # /implement-plan
│       ├── make-workspace-prompt.prompt.md       # /make-workspace-prompt
│       └── readme.prompt.md              # /readme
├── ai_docs/
│   └── plan/
│       └── display-clock.md    # Implementation plan for the clock feature
├── app/                        # React + TypeScript + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   └── Clock/          # Clock component (displays h:mm, 24-hour)
│   │   ├── hooks/
│   │   │   └── useCurrentTime.ts  # Custom hook: live time updated every second
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── DEVLOG.md                   # Running log of course tasks and progress
└── README.md                   # This file
```

---

## How to Use

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with the **GitHub Copilot** extension installed and signed in.
- [Node.js](https://nodejs.org/) (v18 or later) for running the sample app.

### Running the App

```bash
cd app
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

### Slash Commands (Prompt Files)

Prompt files are invoked by typing `/` followed by the prompt name in the Copilot Chat panel.

```
/commit
/readme
/create-implementation-plan
/implement-plan
/make-workspace-prompt
```

You can append extra context after a command if needed:

```
/commit fix login bug
/create-implementation-plan #file:.AI_docs/specs/0001-display-clock.md
```

### Available Commands

| Command                       | Description                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `/commit`                     | Stages all changes and creates a Conventional Commits 1.0.0 message without user confirmation.  |
| `/readme`                     | Gathers project information and generates or updates the `README.md`.                           |
| `/create-implementation-plan` | Reads a spec file and produces a detailed, step-by-step implementation plan in `ai_docs/plan/`. |
| `/implement-plan`             | Implements a plan from `ai_docs/plan/` step-by-step using TDD, following the plan exactly.      |
| `/make-workspace-prompt`      | Creates a new `.prompt.md` workspace prompt file from a high-level description.                 |

---

## Documentation

| File                                               | Description                                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [.AI_docs/prompt-file.md](.AI_docs/prompt-file.md) | Reference guide for creating workspace prompt files: format, front-matter fields, file location, and usage tips. |
| [DEVLOG.md](DEVLOG.md)                             | Chronological log of course tasks and the decisions made along the way.                                          |
