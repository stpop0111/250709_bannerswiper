'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Button({ onClick, children, variant = 'primary' }) {
  const buttonRef = useRef(null);

  const styles = {
    primary: 'bg-gradient-to-tr from-blue-50 to-blue-400 text-black',
    like: 'bg-gradient-to-tr from-green-200 to-emerald-600 text-black',
    dislike: 'bg-gradient-to-tr from-red-400 to-red-100 text-black',
    optional: 'bg-gradient-to-tr from-slate-50 to-gray-300 text-black',
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.set(button, {
      opacity: 0,
      scale: 0.2,
    });

    gsap.to(button, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: button,
        start: 'top bottom',
        end: 'bottom top',
      },
    });

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power4.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power4.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === button) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <button
    ref= {buttonRef}
      onClick={onClick}
      className={`w-full text-lg md:text-xl py-2 px-3 md:py-4 md:px-6 rounded-lg font-bold shadow-sm hover:shadow-lg transition-shadow ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
