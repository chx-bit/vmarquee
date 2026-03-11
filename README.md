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
| `vmarquee.js` | Core — development, readable with warnings |
| `vmarquee.min.js` | Core — production, minified |
| `vmarquee.d.ts` | TypeScript type definitions |
| `VMarquee.jsx` | React component (JavaScript) |
| `VMarquee.tsx` | React component (TypeScript) |

---

## Prerequisites

### Vanilla JS
No installation required. Just load the script via CDN.

### If using React
```bash
npm install react react-dom
```
React 18 and React 19 are both supported.

### If using TypeScript
```bash
npm install -D typescript
```
If using TypeScript with React:
```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

---

## Installation

**Production (minified)**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.1.0/vmarquee.min.js"></script>
```

**Development (readable)**
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
import VMarquee, { VMarqueeHandle } from './VMarquee.tsx';
import { useRef } from 'react';

export default function App() {
  const ref = useRef<VMarqueeHandle>(null);

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

`vMarquee.init()` returns an array of instances in DOM order.

```js
window.addEventListener('load', () => {
  const [m1, m2] = vMarquee.init();
});
```

### Instance Methods

| Method | Description |
|--------|-------------|
| `instance.pause()` | Pause the animation |
| `instance.play()` | Resume the animation |
| `instance.updateSpeed(ms)` | Update speed without reinitializing |
| `instance.destroy()` | Stop animation, remove events, clean up GPU layer |

### `vMarquee.init(selector?)`

Targets all elements matching the selector. Defaults to `.vmarquee`. Already-initialized elements are skipped automatically.

```js
vMarquee.init();               // targets .vmarquee
vMarquee.init('.xmarquee');    // custom selector
vMarquee.init('.x, .y, .z');   // multiple selectors
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

### Ref Handle (VMarqueeHandle)

| Method | Description |
|--------|-------------|
| `ref.current.pause()` | Pause the animation |
| `ref.current.play()` | Resume the animation |
| `ref.current.updateSpeed(ms)` | Update speed |
| `ref.current.destroy()` | Destroy the instance |
| `ref.current.getInstance()` | Get raw vMarquee instance |

---

## TypeScript

`vmarquee.d.ts` provides full type coverage for the core library.

```ts
import type { VMarqueeDirection, VMarqueeOptions, VMarqueeInstance, VMarqueeStatic } from './vmarquee';

const instance: VMarqueeInstance = vMarquee.init('.vmarquee')[0];
instance.pause();
instance.updateSpeed(5000);
```

`window.vMarquee` is also globally typed — no extra imports needed when using via CDN.

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
<div class="vmarquee" data-direction="up" data-speed="6000" style="height: 200px;">
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
    <img src="image3.jpg" alt="">
  </div>
</div>
```

```css
.img-group { display: flex; gap: 24px; }
.img-group img { width: 180px; height: 120px; object-fit: cover; display: block; flex-shrink: 0; }
```

### Diagonal X pattern
```html
<div class="x-wrap">
  <div class="vmarquee vm-x1" data-direction="left"  data-speed="14000">FREE API · NO AUTH · 200+ COUNTRIES ·</div>
  <div class="vmarquee vm-x2" data-direction="right" data-speed="14000">FREE API · NO AUTH · 200+ COUNTRIES ·</div>
</div>
```

```css
.x-wrap   { position: relative; height: 400px; overflow: hidden; }
.vmarquee { position: absolute; width: 160%; top: 50%; left: 50%; }
.vm-x1    { transform: translate(-50%, -50%) rotate(45deg); }
.vm-x2    { transform: translate(-50%, -50%) rotate(-45deg); }
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

vMarquee injects only the minimum styles required for animation. All visual styling is yours.

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

**Q: Can I use a custom class instead of `vmarquee`?**

Yes. Pass your class name to `init()`:
```js
vMarquee.init('.xmarquee');
vMarquee.init('.ymarquee');
```

Or target multiple at once:
```js
vMarquee.init('.xmarquee, .ymarquee, .zmarquee');
```

---

**Q: Does it work with React StrictMode?**

Yes. The component is StrictMode safe — it destroys the previous instance before re-initializing when React mounts the component twice in development.

---

**Q: Do I need to install React to use vMarquee?**

No. The core library (`vmarquee.js` / `vmarquee.min.js`) is pure vanilla JS with zero dependencies. React and TypeScript support are optional and only needed if you use `VMarquee.jsx` or `VMarquee.tsx`.

---

**Q: The animation jumps or the loop is wrong. Why?**

Always use `window.addEventListener('load', ...)`. The library will automatically retry up to 10 times if the element size is zero on the first frame.

---

**Q: Does it handle window resize?**

Yes. The library uses `ResizeObserver` to automatically recalculate the loop offset when the element changes size.

---

**Q: Can I put images or any HTML inside the marquee?**

Yes. Wrap multiple items in a single container:
```html
<div class="vmarquee">
  <div class="group">
    <img src="a.jpg">
    <img src="b.jpg">
  </div>
</div>
```

---

**Q: What does `destroy()` clean up?**

It removes all event listeners, disconnects the `ResizeObserver`, stops the animation, resets `will-change` to free the GPU compositor layer, and removes the `data-direction` attribute.

---

## Browser Support

Works in all modern browsers. `ResizeObserver` is supported in Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+. On older browsers it degrades gracefully — resize handling is simply skipped.

---

## Changelog

### v1.1.0
- Added React component (`VMarquee.jsx` / `VMarquee.tsx`)
- Added TypeScript type definitions (`vmarquee.d.ts`)
- React StrictMode safe
- `VMarqueeHandle` ref API for imperative control

### v1.0.1
- Fixed scroll position reset after `init()` — page no longer jumps to top on load
- Fixed `destroy()` memory leak — event listeners now correctly removed
- Fixed `will-change` not cleaned up after `destroy()`
- Added `ResizeObserver` for automatic resize recalculation
- Added retry logic (up to 10 attempts) for hidden elements

### v1.0.0
- Initial release

---

## License

MIT — free to use, modify, and distribute.
