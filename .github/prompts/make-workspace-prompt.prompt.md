---
name: make-workspace-prompt
description: "Create a new workspace prompt file from a high-level description. Derives the file name, analyzes the task, and generates structured agent instructions with workflow and result sections."
argument-hint: "High-level description of the prompt's purpose (e.g. 'scaffold a new REST API endpoint')"
agent: agent
---

You are creating a new workspace prompt file (`.prompt.md`) based on the following high-level description:

> ${input:description}

## Your Task

### 1. Derive the prompt name

Convert the description into a short, lowercase, hyphen-separated identifier (2–5 words). This becomes:
- The `name` field in the front-matter
- The filename: `<name>.prompt.md`

### 2. Write the front-matter

Produce a YAML front-matter block with:
- `name`: the derived identifier
- `description`: a concise one-sentence description of the prompt's purpose, written as "Use when…" or as an imperative phrase

### 3. Analyze the description

Break down the description to identify:
- **Goal**: what the agent must produce or accomplish
- **Inputs**: what information the user must supply (use `${input:variableName}` placeholders)
- **Constraints**: rules, conventions, or quality standards the output must meet
- **Steps**: the logical sequence needed to achieve the goal

### 4. Write the prompt body

Structure the body with two required sections:

#### `## Workflow`

Provide numbered, step-by-step instructions the agent must follow. Each step should be:
- Actionable and specific (not vague guidance)
- Ordered logically so each step builds on the previous
- Clear about what tools, files, or context to consult if needed

#### `## Result`

Describe the desired outcome precisely:
- What artifact(s) must be produced (files, output, changes)
- Quality criteria the result must satisfy
- How the user will verify success

### 5. Create the file

Save the finished prompt to `.github/prompts/<name>.prompt.md` in the workspace root.

## Rules

- Keep the prompt focused on a **single task**
- Prefer `${input:variableName}` over hardcoded values for any user-supplied data
- Do **not** include implementation code in the prompt — only instructions for the agent
- Ensure the `description` field is meaningful enough to surface the prompt when the user types `/` in chat
