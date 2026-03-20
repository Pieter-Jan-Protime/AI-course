---
name: create-implementation-plan
description: Use when you need a detailed, self-contained implementation plan generated from a spec file.
---

## Workflow

1. **Read the spec file**
   - Load `${input:specFilePath}` in full. Do not rely on memory or assumptions — read every section.
   - Identify the spec's subject/feature name. Derive a short, lowercase, hyphen-separated identifier from it (e.g. `user-auth-flow`). This becomes `<implementation-plan-name>`.

2. **Research the codebase**
   - Explore the existing project structure to understand relevant directories, frameworks, patterns, and conventions.
   - Locate all files that are likely to be created or modified by this feature (source files, tests, config, migrations, etc.).
   - Read those files to understand the current state — do not assume their contents.
   - If the spec references external libraries or APIs you are not certain about, search the project's dependency manifests and existing usages before making claims.

3. **Identify all interfaces and API contracts**
   - Extract every public interface, function signature, REST endpoint, event schema, or data contract implied by the spec.
   - Write these out in full, typed, non-pseudo-code form (TypeScript interfaces, OpenAPI-style endpoint definitions, SQL schemas, etc. — whichever matches the project's stack).

4. **Break the work into ordered implementation steps**
   - Produce a numbered list of atomic steps that a junior developer can follow sequentially.
   - Each step must include:
     - A plain-language description of what to do and why.
     - The exact files to create or modify (relative paths from the repo root).
     - A code example illustrating the change (pseudo code is acceptable for business logic; actual code is required for interfaces, types, and contracts).

5. **Define testing and validation**
   - For each significant step, specify how to verify it works: unit tests, integration tests, manual test steps, or CLI commands to run.
   - Include any expected output or assertions.
   - Add an end-to-end validation checklist at the end of the plan that confirms the complete feature is working as specified.

6. **Write the plan file**
   - Create `ai_docs/plan/<implementation-plan-name>.md` with the structure described in the **Result** section below.
   - Ensure the file is fully self-contained — a reader should not need access to any other document to follow the plan.

## Result

The file `ai_docs/plan/<implementation-plan-name>.md` must be created with the following structure:

```
# Implementation Plan: <Feature Name>

## Overview
One or two paragraphs summarising what is being built, why, and which parts of the codebase are affected.

## Spec reference
Path to the source spec file.

## Interfaces & API contracts
All public interfaces, types, endpoint definitions, event schemas, and data contracts — written in full, typed form appropriate to the project's stack.

## Implementation steps

### Step 1: <Title>
**Goal**: …
**Files**: list of files to create/modify
**Changes**: code example or description
**Test**: how to verify this step

### Step 2: …
…

## End-to-end validation checklist
- [ ] Check 1
- [ ] Check 2
…
```

Success criteria:

- Every section above is present and populated.
- No step references unexplored files or makes assumptions about content that was not read.
- All interfaces and contracts are written in real, typed code — not pseudo code.
- A junior developer unfamiliar with the codebase could follow the plan without asking clarifying questions.
- Running the validation checklist against the completed implementation confirms the spec is satisfied.
