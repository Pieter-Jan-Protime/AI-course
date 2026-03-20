---
name: commit
description: Stage all changes and commit using a Conventional Commits message — no confirmation needed.
---

Stage all changes and create a git commit with a Conventional Commits 1.0.0 message. Do not ask for confirmation — proceed immediately.

## Steps

1. Run `git status` and `git diff HEAD` to review all changes (staged and unstaged).
2. Run `git add -A` to stage all changes.
3. Analyse the diff and determine the correct commit message following the Conventional Commits 1.0.0 format (see below).
4. Run `git commit -m "<message>"` (use `-m` for the subject and a second `-m` for the body/footers when needed). Do not open an editor.

## Conventional Commits 1.0.0 Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type — choose exactly one

| Type | When to use |
|---|---|
| `feat` | A new feature (→ MINOR bump) |
| `fix` | A bug fix (→ PATCH bump) |
| `docs` | Documentation only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure — not a fix or feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks that don't fit elsewhere |
| `revert` | Reverting a previous commit |

### Rules

- **Subject line**: `<type>[optional scope]: <description>` — lowercase description, no trailing period, ≤ 72 chars.
- **Scope**: optional noun in parentheses describing the affected section, e.g. `feat(auth):`.
- **Breaking change**: append `!` after the type/scope **and/or** add a `BREAKING CHANGE: <description>` footer.
- **Body**: free-form, begins one blank line after the subject; explains *what* and *why*.
- **Footers**: one blank line after the body; format `Token: value` or `Token #value`. `BREAKING CHANGE` must be uppercase.

### Examples

```
feat(api): add pagination to /users endpoint
```

```
fix(auth): prevent token refresh loop on 401

The refresh interceptor was calling itself recursively when the
refresh token was also expired. Added a flag to break the cycle.

Refs: #42
```

```
feat!: redesign plugin interface

BREAKING CHANGE: plugin.init() now receives a context object instead
of individual parameters. Update all plugins accordingly.
```

```
chore: update dependencies to latest patch versions
```

## Important

- Infer the type from the actual diff — do not default to `chore` when a more specific type fits.
- If changes span multiple concerns, pick the **most significant** type or split into multiple commits only if the user's request clearly implies it.
- Commit immediately. Do not prompt the user to confirm the message.
