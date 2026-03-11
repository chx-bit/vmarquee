/*! vMarquee v1.1.0 | MIT | https://github.com/chx-bit/vmarquee */

export type Dir = 'left' | 'right' | 'up' | 'down';

export interface Opts {
  direction?:    Dir;
  speed?:        number;
  gap?:          number;
  pauseOnHover?: boolean;
  rotate?:       number;
}

export interface Instance {
  readonly el:     HTMLElement;
  readonly paused: boolean;
  readonly opts:   Required<Opts>;
  pause():              void;
  play():               void;
  updateSpeed(ms: number): void;
  destroy():            void;
}

export interface Static {
  readonly version: string;
  init(selector?: string):        Instance[];
  getInstance(el: Element | null): Instance | null;
  VMarquee: new (el: HTMLElement) => Instance;
}

declare const vMarquee: Static;
export default vMarquee;

declare global {
  interface Window { vMarquee: Static; }
  interface HTMLElement { _vm?: Instance; }
}
