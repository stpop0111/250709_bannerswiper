import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeTransition({
  children,
  animationKey,
}) {
  const elRef = useRef(null);

  useEffect(() => {
    const element = elRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 1,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay: 0,
        ease: 'power4.out',
      }
    );

    // クリーンアップ処理
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [animationKey]);

  return <div ref={elRef}>{children}</div>;
}
