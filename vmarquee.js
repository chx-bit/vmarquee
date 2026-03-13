/*! vMarquee v1.1.0 | MIT | https://github.com/chx-bit/vmarquee */
(function (g) {

  const V = '1.1.0';

  const D = { direction: 'left', speed: 8000, gap: 48, pauseOnHover: true, rotate: 0 };

  const A = { left: 'vml', right: 'vmr', up: 'vmu', down: 'vmd' };

  const STYLES =
    '.vm__t{display:flex;width:max-content;will-change:transform;flex-shrink:0}' +
    '[data-direction=up] .vm__t,[data-direction=down] .vm__t{flex-direction:column;width:auto;height:max-content}' +
    '.vm__i{flex-shrink:0;display:inline-block}' +
    '@keyframes vml{from{transform:translateX(0)}to{transform:translateX(var(--vmo))}}' +
    '@keyframes vmr{from{transform:translateX(var(--vmo))}to{transform:translateX(0)}}' +
    '@keyframes vmu{from{transform:translateY(0)}to{transform:translateY(var(--vmo))}}' +
    '@keyframes vmd{from{transform:translateY(var(--vmo))}to{transform:translateY(0)}}';

  function injectStyles() {
    if (document.getElementById('vm-s')) return;
    const s = document.createElement('style');
    s.id = 'vm-s';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  function parse(el) {
    const d = el.dataset;
    return {
      direction:    A[d.direction] ? d.direction   : D.direction,
      speed:        +d.speed > 0   ? +d.speed      : D.speed,
      gap:          +d.gap  >= 0   ? +d.gap        : D.gap,
      pauseOnHover: d.pauseOnHover !== 'false',
      rotate:       +d.rotate || D.rotate,
    };
  }

  class VMarquee {
    constructor(el) {
      this.el      = el;
      this.track   = null;
      this.paused  = false;
      this.opts    = parse(el);
      this._ob     = null;
      this._ph     = [this.pause.bind(this), this.play.bind(this)];
      this._build();
    }

    _build() {
      const { direction, gap, speed, rotate } = this.opts;
      const v   = direction === 'up' || direction === 'down';
      const src = this.el.innerHTML.trim();

      if (!src) return;

      const sy = window.scrollY;
      this.el.innerHTML = '';
      this.el.setAttribute('data-direction', direction);

      const t = document.createElement('div');
      t.className = 'vm__t';

      const item = document.createElement('div');
      item.className = 'vm__i';
      item.innerHTML = src;
      item.style[v ? 'paddingBottom' : 'paddingRight'] = gap + 'px';
      if (rotate) item.style.transform = `rotate(${rotate}deg)`;

      t.appendChild(item);
      this.el.appendChild(t);
      this.track = t;

      this._fill(item, v, speed, direction);
      this._events(true);
      this._resize(item, v, speed, direction);
      requestAnimationFrame(() => window.scrollTo(0, sy));
    }

    _fill(item, v, speed, dir, n) {
  n = n || 0;
  const is = v ? item.offsetHeight  : item.offsetWidth;
  const cs = v ? this.el.offsetHeight : this.el.offsetWidth;

  if (!is || !cs) {
    if (n < 10) requestAnimationFrame(() => this._fill(item, v, speed, dir, n + 1));
    return;
  }

  const sy = window.scrollY; // tambah ini

  [...this.track.querySelectorAll('.vm__i')].slice(1).forEach(e => e.remove());

  const f = document.createDocumentFragment();
  const c = Math.ceil(cs * 3 / is) + 2;
  for (let i = 1; i < c; i++) f.appendChild(item.cloneNode(true));
  this.track.appendChild(f);

  this.track.style.setProperty('--vmo', `-${is}px`);
  this.track.style.animation = `${A[dir]} ${speed}ms linear infinite`;
  if (this.paused) this.track.style.animationPlayState = 'paused';

  requestAnimationFrame(() => window.scrollTo(0, sy)); // tambah ini
    }

    _resize(item, v, speed, dir) {
      if (!window.ResizeObserver) return;
      this._ob = new ResizeObserver(() => this._fill(item, v, speed, dir));
      this._ob.observe(this.el);
    }

    _events(on) {
      if (!this.opts.pauseOnHover) return;
      const fn = on ? 'addEventListener' : 'removeEventListener';
      this.el[fn]('mouseenter', this._ph[0]);
      this.el[fn]('mouseleave', this._ph[1]);
    }

    pause() {
      if (!this.track) return;
      this.track.style.animationPlayState = 'paused';
      this.paused = true;
    }

    play() {
      if (!this.track) return;
      this.track.style.animationPlayState = 'running';
      this.paused = false;
    }

    updateSpeed(ms) {
      if (!this.track) return;
      this.opts.speed = ms = Math.max(1, ms);
      this.track.style.animation = this.track.style.animation.replace(/[\d.]+ms/, ms + 'ms');
    }

    destroy() {
      this._events(false);
      this._ob?.disconnect();
      if (this.track) {
        this.track.style.animation  = 'none';
        this.track.style.willChange = 'auto';
      }
      this.el.removeAttribute('data-direction');
      this.el._vm = null;
    }
  }

  function init(sel) {
    injectStyles();
    return [...document.querySelectorAll(sel || '.vmarquee')].reduce((acc, el) => {
      if (el._vm) return acc;
      try {
        el._vm = new VMarquee(el);
        acc.push(el._vm);
      } catch (e) {
        console.error('[vMarquee]', el, e);
      }
      return acc;
    }, []);
  }

  const vm = { version: V, init, getInstance: el => el?._vm || null, VMarquee };

  typeof module !== 'undefined' ? (module.exports = vm) : (g.vMarquee = vm);

})(typeof window !== 'undefined' ? window : this);
