import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

export function useIsOverflowing(): [
  MutableRefObject<HTMLDivElement | HTMLElement | null>,
  boolean,
] {
  const reference = useRef<HTMLDivElement | HTMLElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = (): void => {
      if (reference.current) {
        setIsOverflowing(
          reference.current.scrollWidth > reference.current.clientWidth ||
            reference.current.scrollHeight > reference.current.clientHeight,
        );
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return [reference, isOverflowing];
}

export default useIsOverflowing;
