import { useLayoutEffect } from "react";

export function useBodyScrollLock(lock) {
  useLayoutEffect(() => {
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    
    if (lock) {
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [lock]);
}