'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Button({
  animation = true,
  onClick,
  children,
  variant = 'primary',
  buttonWidth = '',
}) {
  const styles = {
    primary: 'bg-gradient-to-tr from-blue-50 to-blue-400 text-black', // プライマリー
    like: 'bg-gradient-to-tr from-green-200 to-emerald-600 text-black', // いいね
    dislike: 'bg-gradient-to-tr from-red-400 to-red-100 text-black', // ✖
    optional: 'bg-gradient-to-tr from-slate-50 to-gray-300 text-black', // オプショナル
  };

  // アニメーション用のuseRef
  const elRef = useRef(null);

  // アニメーション用のuseEffect
  useEffect(() => {
    const element = elRef.current;
    if (!element) return;

    gsap.set(element, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to(element, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  const buttonClass = `${
    styles[variant]
  } cursor-pointer text-lg md:text-xl py-2 px-3 md:py-4 md:px-6 rounded-lg font-bold shadow-sm hover:shadow-lg transition-shadow 
      ${buttonWidth === 'full' ? 'w-full' : ''}`;

  if (animation) {
    return (
      <button ref={elRef} onClick={onClick} className={buttonClass}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
