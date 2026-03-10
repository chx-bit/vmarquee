# vMarquee

A lightweight, flexible, and scalable marquee library. Zero dependencies, pure vanilla JS. Supports text, images, and any HTML content with full control over direction, speed, gap, rotation, and behavior via `data-*` attributes.

---

## Files

| File | Use |
|------|-----|
| `vmarquee.js` | Development — readable, with warnings and comments |
| `vmarquee.min.js` | Production — minified, optimized for deployment |

---

## Installation

**Production (minified)**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.0.0/vmarquee.min.js"></script>
```

**Development (readable)**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.0.0/vmarquee.js"></script>
```

**Always latest**
```html
<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@main/vmarquee.min.js"></script>
```

---

## Quick Start

```html
<div class="vmarquee" data-direction="left" data-speed="8000">
  FREE API · NO AUTH · 200+ COUNTRIES · OPEN SOURCE ·
</div>

<script src="https://cdn.jsdelivr.net/gh/chx-bit/vmarquee@1.0.0/vmarquee.min.js"></script>
<script>
  window.addEventListener('load', () => vMarquee.init());
</script>
```

> Always call `vMarquee.init()` inside `window.addEventListener('load', ...)` — not `DOMContentLoaded`. This ensures fonts and images are fully loaded before the library measures element sizes.

---

## Data Attributes

| Attribute             | Default | Type    | Description |
|-----------------------|---------|---------|-------------|
| `data-direction`      | `left`  | string  | Scroll direction: `left` `right` `up` `down` |
| `data-speed`          | `8000`  | number  | Duration of one full loop in ms |
| `data-gap`            | `48`    | number  | Gap between repeated items in px |
| `data-pause-on-hover` | `true`  | boolean | Pause animation on mouse hover |
| `data-rotate`         | `0`     | number  | Rotate content inside each item in degrees |

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
vMarquee.init();                      // targets .vmarquee
vMarquee.init('.xmarquee');           // custom selector
vMarquee.init('.x, .y, .z');          // multiple selectors
```

### `vMarquee.getInstance(el)`

Returns the instance bound to a DOM element, or `null`.

```js
const el = document.querySelector('.vmarquee');
vMarquee.getInstance(el).pause();
```

### `vMarquee.version`

```js
console.log(vMarquee.version); // "1.0.0"
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
.x-wrap    { position: relative; height: 400px; overflow: hidden; }
.vmarquee  { position: absolute; width: 160%; top: 50%; left: 50%; }
.vm-x1     { transform: translate(-50%, -50%) rotate(45deg); }
.vm-x2     { transform: translate(-50%, -50%) rotate(-45deg); }
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
vMarquee.init('.zmarquee');
```

Or target multiple at once:
```js
vMarquee.init('.xmarquee, .ymarquee, .zmarquee');
```

---

**Q: I have multiple custom classes with different styles. How do I keep them isolated?**

Call `init()` separately per class — each call is fully independent:
```js
window.addEventListener('load', () => {
  const x = vMarquee.init('.xmarquee');
  const y = vMarquee.init('.ymarquee');
  const z = vMarquee.init('.zmarquee');

  x[0].updateSpeed(6000);
  y[0].pause();
});
```

---

**Q: My custom class uses `position: absolute` and the layout breaks.**

Apply positional CSS directly on the `.vmarquee` element and use a wrapper as the positioning context:

```css
.x-wrap   { position: relative; overflow: hidden; }
.xmarquee { position: absolute; width: 160%; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); }
```

The library only controls the internal track — outer positioning is always safe to override.

---

**Q: What is the difference between `data-rotate` and CSS `transform: rotate()`?**

`data-rotate` rotates the content **inside** each item. CSS `transform: rotate()` on the element rotates the **entire marquee band**. Do not use both on the same element — CSS `transform` will override `data-rotate`.

---

**Q: The animation jumps or the loop is wrong. Why?**

The library measures element size to calculate the loop. If fonts or images are not loaded yet, the measurement will be `0`. Always use `window.addEventListener('load', ...)`. The library will automatically retry up to 10 times if the element size is zero on the first frame.

---

**Q: Can I update speed after init?**

Yes:
```js
const [m1] = vMarquee.init();
m1.updateSpeed(3000);   // faster
m1.updateSpeed(20000);  // slower
```

---

**Q: Does it handle window resize?**

Yes. The library uses `ResizeObserver` to automatically recalculate the loop offset when the element changes size — including phone rotation and window resize.

---

**Q: Can I put images or any HTML inside the marquee?**

Yes. Wrap multiple items in a single container so they are cloned as one group:

```html
<div class="vmarquee" data-direction="left">
  <div class="group">
    <img src="a.jpg">
    <img src="b.jpg">
    <img src="c.jpg">
  </div>
</div>
```

---

**Q: What does `destroy()` clean up?**

It removes all event listeners, disconnects the `ResizeObserver`, stops the animation, resets `will-change` to free the GPU compositor layer, and removes the `data-direction` attribute. The element is fully restored and can be re-initialized.

---

## Browser Support

Works in all modern browsers. `ResizeObserver` (used for responsive recalculation) is supported in Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+. On older browsers it degrades gracefully — resize handling is simply skipped.

---

## License

MIT — free to use, modify, and distribute.

Built by [chxbit](https://github.com/chx-bi)
![Built with Claude](https://img.shields.io/badge/Built%20with%20Claude-D97757?logo=claude&logoColor=white)
![version](https://img.shields.io/badge/version-1.0.0-red)
![license](https://img.shields.io/badge/license-MIT-green)
![size](https://img.shields.io/badge/size-5.4kb-blue)
