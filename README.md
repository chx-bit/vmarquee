# vMarquee

![version](https://img.shields.io/badge/version-1.1.0-red)
![license](https://img.shields.io/badge/license-MIT-green)
![deps](https://img.shields.io/badge/dependencies-none-brightgreen)
![Built with Claude](https://img.shields.io/badge/Built%20with%20Claude-D97757?logo=claude&logoColor=white)

A lightweight, flexible, and scalable marquee library. Zero dependencies, pure vanilla JS. Supports text, images, and any HTML content with full control over direction, speed, gap, rotation, and behavior via `data-*` attributes.

---

## Files

| File | Use |
|------|-----|
| `vmarquee.js` | Core — development, readable |
| `vmarquee.min.js` | Core — production, minified |
| `vmarquee.d.ts` | TypeScript type definitions |
| `VMarquee.jsx` | React component (JavaScript) |
| `VMarquee.tsx` | React component (TypeScript) |

---

## Prerequisites

**Vanilla JS** — no installation required. Load via CDN.

**If using React:**
```bash
npm install react react-dom
```
React 18 and React 19 are both supported.

**If using TypeScript:**
```bash
npm install -D typescript
```

**If using TypeScript + React:**
```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

---

## Installation

**Production**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.1.0/vmarquee.min.js"></script>
```

**Development**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.1.0/vmarquee.js"></script>
```

**Always latest**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@main/vmarquee.min.js"></script>
```

---

## Quick Start

### Vanilla JS
```html
<div class="vmarquee" data-direction="left" data-speed="8000">
  FREE API · NO AUTH · 200+ COUNTRIES · OPEN SOURCE ·
</div>

<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.1.0/vmarquee.min.js"></script>
<script>
  window.addEventListener('load', () => vMarquee.init());
</script>
```

> Always call `vMarquee.init()` inside `window.addEventListener('load', ...)` — not `DOMContentLoaded`. This ensures fonts and images are fully loaded before the library measures element sizes.

### React (JSX)
```jsx
import VMarquee from './VMarquee.jsx';

// vmarquee.min.js must be loaded via CDN in your index.html
export default function App() {
  return (
    <VMarquee direction="left" speed={10000}>
      FREE API · NO AUTH · 200+ COUNTRIES ·
    </VMarquee>
  );
}
```

### React (TSX)
```tsx
import VMarquee, { Handle } from './VMarquee.tsx';
import { useRef } from 'react';

export default function App() {
  const ref = useRef<Handle>(null);

  return (
    <>
      <VMarquee ref={ref} direction="left" speed={10000}>
        FREE API · NO AUTH · 200+ COUNTRIES ·
      </VMarquee>
      <button onClick={() => ref.current?.pause()}>Pause</button>
      <button onClick={() => ref.current?.play()}>Play</button>
    </>
  );
}
```

---

## Data Attributes

| Attribute | Default | Type | Description |
|-----------|---------|------|-------------|
| `data-direction` | `left` | string | Scroll direction: `left` `right` `up` `down` |
| `data-speed` | `8000` | number | Duration of one full loop in ms |
| `data-gap` | `48` | number | Gap between repeated items in px |
| `data-pause-on-hover` | `true` | boolean | Pause animation on mouse hover |
| `data-rotate` | `0` | number | Rotate content inside each item in degrees |

---

## JS API

### `vMarquee.init(selector?)`

Initializes all matching elements. Defaults to `.vmarquee`. Already-initialized elements are skipped.

```js
vMarquee.init();                     // targets .vmarquee
vMarquee.init('.xmarquee');          // custom selector
vMarquee.init('.x, .y, .z');         // multiple selectors
```

Returns an array of instances in DOM order.

```js
const [m1, m2] = vMarquee.init();
```

### `vMarquee.getInstance(el)`

Returns the instance bound to a DOM element, or `null`.

```js
const el = document.querySelector('.vmarquee');
vMarquee.getInstance(el).pause();
```

### `vMarquee.version`

```js
console.log(vMarquee.version); // "1.1.0"
```

### Instance Methods

| Method | Description |
|--------|-------------|
| `instance.pause()` | Pause the animation |
| `instance.play()` | Resume the animation |
| `instance.updateSpeed(ms)` | Update speed without reinitializing |
| `instance.destroy()` | Stop animation, remove events, clean up GPU layer |

---

## React API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | Scroll direction |
| `speed` | `number` | `8000` | Duration of one full loop in ms |
| `gap` | `number` | `48` | Gap between repeated items in px |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |
| `rotate` | `number` | `0` | Rotate content in degrees |
| `children` | `ReactNode` | — | Content to marquee |
| `className` | `string` | — | Optional CSS class |
| `style` | `CSSProperties` | — | Optional inline styles |

### Ref Handle

| Method | Description |
|--------|-------------|
| `ref.current.pause()` | Pause the animation |
| `ref.current.play()` | Resume the animation |
| `ref.current.updateSpeed(ms)` | Update speed |
| `ref.current.destroy()` | Destroy the instance |
| `ref.current.instance` | Get raw vMarquee instance |

---

## TypeScript

`vmarquee.d.ts` exports `Dir`, `Opts`, `Instance`, and `Static` types. `window.vMarquee` is globally typed — no extra import needed when using via CDN.

```ts
import type { Dir, Instance } from './vmarquee';

const instance: Instance = vMarquee.init('.vmarquee')[0];
instance.pause();
instance.updateSpeed(5000);
```

---

## Examples

### Basic text
```html
<div class="vmarquee" data-direction="left" data-speed="10000" data-gap="48">
  FREE API · NO AUTH · 200+ COUNTRIES · OPEN SOURCE ·
</div>
```

### Two directions
```html
<div class="vmarquee" data-direction="left"  data-speed="10000">...</div>
<div class="vmarquee" data-direction="right" data-speed="12000">...</div>
```

### Vertical scroll
```html
<div class="vmarquee" data-direction="up" data-speed="6000" style="height:200px">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Image carousel
```html
<div class="vmarquee" data-direction="left" data-speed="12000" data-gap="24">
  <div class="img-group">
    <img src="image1.jpg" alt="">
    <img src="image2.jpg" alt="">
  </div>
</div>
```

```css
.img-group { display: flex; gap: 24px; }
.img-group img { width: 180px; height: 120px; object-fit: cover; flex-shrink: 0; }
```

### Diagonal X pattern
```html
<div class="x-wrap">
  <div class="vmarquee vm-x1" data-direction="left"  data-speed="14000">FREE API · NO AUTH ·</div>
  <div class="vmarquee vm-x2" data-direction="right" data-speed="14000">FREE API · NO AUTH ·</div>
</div>
```

```css
.x-wrap { position: relative; height: 400px; overflow: hidden; }
.vmarquee { position: absolute; width: 160%; top: 50%; left: 50%; }
.vm-x1  { transform: translate(-50%, -50%) rotate(45deg); }
.vm-x2  { transform: translate(-50%, -50%) rotate(-45deg); }
```

### Fade edges
```css
.vmarquee {
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
}
```

### Pause / play via button
```js
const [m1] = vMarquee.init();
document.querySelector('#pause').addEventListener('click', () => m1.pause());
document.querySelector('#play').addEventListener('click',  () => m1.play());
```

---

## Styling

vMarquee injects only the minimum required styles. All visual styling is yours.

```css
.vmarquee {
  overflow: hidden;
  border-block: 1px solid rgba(255, 255, 255, 0.09);
  padding-block: 12px;
  font-family: monospace;
  font-size: 12px;
  color: #888;
}
```

---

## Q&A

**Q: Can I use a custom class instead of `.vmarquee`?**

```js
vMarquee.init('.xmarquee');
vMarquee.init('.xmarquee, .ymarquee');
```

**Q: Does it work with React StrictMode?**

Yes. The component destroys the previous instance before re-initializing — safe in StrictMode double-invoke.

**Q: Do I need React to use vMarquee?**

No. The core is pure vanilla JS. React and TypeScript files are optional extras for those who need them.

**Q: Animation jumps or loop is wrong?**

Always use `window.addEventListener('load', ...)`. The library retries up to 10 times if element size is zero on first frame.

**Q: Does it handle window resize?**

Yes. `ResizeObserver` automatically recalculates the loop offset on resize.

**Q: Can I put images or HTML inside?**

Yes — wrap multiple items in one container so they clone as a group:
```html
<div class="vmarquee">
  <div class="group">
    <img src="a.jpg"> <img src="b.jpg">
  </div>
</div>
```

**Q: What does `destroy()` clean up?**

Removes event listeners, disconnects `ResizeObserver`, stops animation, resets `will-change`, and removes `data-direction`.

---

## Browser Support

All modern browsers. `ResizeObserver` supported in Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+. Degrades gracefully on older browsers — resize handling is skipped.

---

## Changelog

### v1.1.0
- Added React component (`VMarquee.jsx` / `VMarquee.tsx`)
- Added TypeScript type definitions (`vmarquee.d.ts`)
- Full rewrite — smaller, faster, more scalable
- Core reduced from 7.3kb → 5.2kb, minified 5.6kb → 3.9kb
- Shortened internal class names and property names
- React StrictMode safe
- `Handle` ref API for imperative control in React

### v1.0.1
- Fixed scroll position reset after `init()`
- Fixed `destroy()` memory leak
- Fixed `will-change` not cleaned up after `destroy()`
- Added `ResizeObserver` for automatic resize recalculation
- Added retry logic (up to 10 attempts) for hidden elements

### v1.0.0
- Initial release

---

## License

MIT — free to use, modify, and distribute.

Built by [chxbit](https://github.com/chx-bit)

