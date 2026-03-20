---
name: implement-plan
description: Use when implementing a plan step-by-step with TDD, following each step exactly as written without deviation.
---

## Workflow

1. **Read the plan**
   - Load `${input:planFilePath}` in full. Do not rely on memory or assumptions — read every step.
   - Understand the full scope before writing any code.

2. **Implement each step in order using TDD**
   - For each step in the plan, follow this sequence strictly:
     1. Write the test(s) specified in the step's **Test** section first. The test must fail at this point.
     2. Write the minimum implementation required to make the test pass.
     3. Verify the test passes before moving to the next step.
   - Do not skip steps, reorder them, or introduce steps not in the plan.
   - Do not add extra functionality, abstractions, or improvements beyond what the step explicitly requires.

3. **Follow the plan's file and code contracts exactly**
   - Create or modify only the files listed in each step.
   - Use the interfaces, types, and API contracts defined in the plan verbatim — do not redesign them.

4. **Confirm completion**
   - After all steps are implemented and their tests pass, run the full test suite to verify nothing is broken.
   - Report the final test results.

## Result

- Every step in the plan is implemented, with a passing test for each.
- No steps were skipped, added, or modified beyond the plan's instructions.
- The full test suite passes.
- Success is verified by running the end-to-end validation checklist at the bottom of the plan file (if present).
