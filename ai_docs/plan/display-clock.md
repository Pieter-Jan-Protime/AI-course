# Implementation Plan: Display Clock

## Overview

This plan covers scaffolding a Vite + React + TypeScript project in the `app/` subdirectory and implementing a full-screen clock that displays the current local time in 24-hour `h:mm` format (e.g. `9:05`, `14:30`), centered on the screen in a large font.

The affected parts of the repository are exclusively within the new `app/` directory. No existing files outside that directory are touched.

## Spec reference

`.AI_docs/specs/0001-display-clock.md`

## Interfaces & API contracts

```typescript
// app/src/hooks/useCurrentTime.ts
//
// Returns the current local time as a formatted string.
// Updates every second via setInterval.
// Format: h:mm (24-hour, no leading zero on hours, zero-padded minutes)
// Examples: "0:00", "9:05", "14:30", "23:59"
function useCurrentTime(): string;

// app/src/components/Clock/Clock.tsx
//
// Renders the formatted time string returned by useCurrentTime.
// Accepts no props — all state is encapsulated in the hook.
interface ClockProps {}

export default function Clock(props: ClockProps): JSX.Element;
```

## Implementation steps

### Step 1: Scaffold the Vite project

**Goal**: Create the Vite + React + TypeScript project in `app/`. This generates the standard boilerplate (entry point, tsconfig, vite config, etc.) that all subsequent steps build on.

**Files**: creates the entire `app/` directory

**Changes**:

```bash
# Run from the repository root
npm create vite@latest app -- --template react-ts
cd app
npm install
```

After this step the directory layout is:

```
app/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
└── src/
    ├── App.css
    ├── App.tsx
    ├── assets/
    ├── index.css
    ├── main.tsx
    └── vite-env.d.ts
```

**Test**: Run `npm run dev` inside `app/`. The Vite dev server should start and the default React page should load in the browser at `http://localhost:5173`.

---

### Step 2: Add the SCSS dependency

**Goal**: Enable `.module.scss` imports by installing the `sass` pre-processor. Vite picks it up automatically — no plugin configuration is required.

**Files**: `app/package.json`

**Changes**:

```bash
# Run from app/
npm install -D sass
```

**Test**: Create a temporary `app/src/test.module.scss` with any rule, import it in `App.tsx`, and confirm the dev server compiles without error. Delete the temp file afterwards.

---

### Step 3: Remove default boilerplate

**Goal**: Strip out the Vite/React placeholder content so there is a clean starting point. This prevents leftover global styles or JSX from interfering with the clock layout.

**Files**:

- `app/src/App.tsx` — replace with a minimal shell
- `app/src/App.css` — delete (replaced by SCSS module in step 5)
- `app/src/index.css` — keep the file but replace content with a single `body` reset

**Changes**:

`app/src/index.css` — replace entire content:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
```

`app/src/App.tsx` — replace entire content:

```tsx
import styles from "./App.module.scss";

export default function App() {
  return <main className={styles.layout}></main>;
}
```

Delete `app/src/App.css` (it will no longer be imported after the above change).

**Test**: The dev server compiles without errors and the browser shows a blank page with no layout artifacts.

---

### Step 4: Create the `useCurrentTime` hook

**Goal**: Encapsulate the timer logic in a custom hook so the component stays declarative. The hook initialises with the current time, then updates every second using `setInterval`. The interval is cleared on unmount to prevent memory leaks.

**Files**: `app/src/hooks/useCurrentTime.ts` (new file)

**Changes**:

```typescript
import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function useCurrentTime(): string {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return time;
}
```

**Test**:

Open the browser console and confirm the displayed value changes each second. Alternatively, write a quick manual check:

```tsx
// Temporarily add to App.tsx to sanity-check the hook
import { useCurrentTime } from "./hooks/useCurrentTime";
const time = useCurrentTime();
console.log(time); // should log current time and update every second
```

---

### Step 5: Create the `Clock` component

**Goal**: Build the presentational component that displays the time string. It uses an SCSS module for scoped styling so its CSS does not leak into the rest of the app.

**Files**:

- `app/src/components/Clock/Clock.tsx` (new file)
- `app/src/components/Clock/Clock.module.scss` (new file)

**Changes**:

`app/src/components/Clock/Clock.tsx`:

```tsx
import { useCurrentTime } from "../../hooks/useCurrentTime";
import styles from "./Clock.module.scss";

export default function Clock() {
  const time = useCurrentTime();
  return <time className={styles.clock}>{time}</time>;
}
```

`app/src/components/Clock/Clock.module.scss`:

```scss
.clock {
  font-size: clamp(4rem, 20vw, 16rem);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
  line-height: 1;
}
```

`font-variant-numeric: tabular-nums` prevents the layout from shifting as digits change width.

**Test**: Import `Clock` into `App.tsx` and render it. The time string should appear at large size.

---

### Step 6: Wire the clock into `App` and centre it

**Goal**: Render the `Clock` component from `App`, and apply a full-viewport flexbox layout so the clock is perfectly centred both horizontally and vertically.

**Files**:

- `app/src/App.tsx`
- `app/src/App.module.scss` (new file)

**Changes**:

`app/src/App.tsx`:

```tsx
import Clock from "./components/Clock/Clock";
import styles from "./App.module.scss";

export default function App() {
  return (
    <main className={styles.layout}>
      <Clock />
    </main>
  );
}
```

`app/src/App.module.scss`:

```scss
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
}
```

**Test**: Open the browser. The clock should be horizontally and vertically centred. Resize the browser window to confirm the centering holds at different viewport sizes.

---

### Step 7: Verify the time format

**Goal**: Confirm the displayed format matches the spec (`h:mm`, 24-hour, no leading zero on hours).

**Files**: no changes needed — this is a manual verification step

**Test**: Check the current time against the rendered output:

| System time | Expected display |
| ----------- | ---------------- |
| 00:05       | `0:05`           |
| 09:07       | `9:07`           |
| 13:45       | `13:45`          |
| 23:59       | `23:59`          |

If you want to test a specific hour without waiting, temporarily override in `useCurrentTime.ts`:

```typescript
// Temporary override for format testing — revert before committing
const [time, setTime] = useState<string>(() =>
  formatTime(new Date(2026, 0, 1, 9, 5)),
);
```

---

## End-to-end validation checklist

- [ ] `app/` directory exists at the repository root and contains a valid Vite project
- [ ] `npm install && npm run dev` inside `app/` starts without errors
- [ ] The browser opens to a blank page with the clock — no Vite/React default content visible
- [ ] The clock displays the correct current local time
- [ ] The time format is `h:mm` in 24-hour: single-digit hours have no leading zero, minutes are always two digits
- [ ] The clock updates every second (observe the seconds change by waiting at a minute boundary, or by setting the interval to 100 ms temporarily)
- [ ] The clock is centred horizontally and vertically at any viewport size
- [ ] Resizing the browser window confirms the clock remains centred and the font scales with `clamp`
- [ ] No console errors or warnings in the browser DevTools
- [ ] `npm run build` inside `app/` completes successfully with no TypeScript errors
