# Workspace Prompt Files

Prompt files (slash commands) let you encode common tasks as standalone Markdown files that you invoke directly in chat. Each file includes task-specific instructions and context.

## File Format

Prompt files use the `.prompt.md` extension and are plain Markdown files. An optional YAML front-matter block at the top configures the prompt's metadata.

### Front-matter

Only two fields are used:

```yaml
---
name: my-prompt
description: A short description of what this prompt does.
---
```

| Field | Description |
|---|---|
| `name` | The name that appears when typing `/` in chat. Defaults to the file name if omitted. |
| `description` | A short description of the prompt's purpose. |

### Body

The body is standard Markdown. Write clear instructions for the AI to follow.

```md
---
name: create-component
description: Scaffold a new React component.
---

Create a new React functional component named `${input:componentName}`.

- Use TypeScript
- Include a default export
- Add a props interface
```

## File Location

Place workspace prompt files in the `.github/prompts/` folder at the root of your workspace:

```
.github/
  prompts/
    create-component.prompt.md
    security-review.prompt.md
```

## How to Use

Type `/` in the Chat view followed by the prompt name (e.g., `/create-component`) to invoke it. You can append extra context after the slash command:

```
/create-component formName=LoginForm
```

## Tips

- Reference other workspace files using relative Markdown links.
- Use `${input:variableName}` placeholders to prompt for user input at runtime.
- Use `${selection}` to pass the current editor selection into the prompt.
- Keep each prompt focused on a single task.
