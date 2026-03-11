/*! vMarquee v1.1.0 | MIT | https://github.com/chx-bit/vmarquee */
import { useEffect, useRef, forwardRef, useImperativeHandle, CSSProperties, ReactNode } from 'react';
import type { Dir, Instance } from './vmarquee';

export interface Props {
  direction?:    Dir;
  speed?:        number;
  gap?:          number;
  pauseOnHover?: boolean;
  rotate?:       number;
  children:      ReactNode;
  className?:    string;
  style?:        CSSProperties;
}

export interface Handle {
  pause():             void;
  play():              void;
  updateSpeed(ms: number): void;
  destroy():           void;
  readonly instance:   Instance | null;
}

let _id = 0;

const VMarquee = forwardRef<Handle, Props>(function VMarquee(
  { direction = 'left', speed = 8000, gap = 48, pauseOnHover = true, rotate = 0, children, className, style },
  ref
) {
  const el   = useRef<HTMLDivElement>(null);
  const inst = useRef<Instance | null>(null);
  const uid  = useRef(`vm-${++_id}`);

  useImperativeHandle(ref, () => ({
    pause:       ()   => inst.current?.pause(),
    play:        ()   => inst.current?.play(),
    updateSpeed: (ms) => inst.current?.updateSpeed(ms),
    destroy:     ()   => inst.current?.destroy(),
    get instance()    { return inst.current; },
  }), []);

  useEffect(() => {
    const node = el.current;
    if (!node || !window.vMarquee) return;
    (node as any)._vm?.destroy();
    inst.current = (node as any)._vm = new window.vMarquee.VMarquee(node);
    return () => { inst.current?.destroy(); inst.current = null; };
  }, [direction, speed, gap, pauseOnHover, rotate]);

  return (
    <div ref={el} id={uid.current} className={className} style={style}
      data-direction={direction} data-speed={speed} data-gap={gap}
      data-pause-on-hover={String(pauseOnHover)} data-rotate={rotate || undefined}>
      {children}
    </div>
  );
});

export default VMarquee;
