import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface useTypedProp {
  strings: string[];
  typeSpeed: number;
  backSpeed: number;
  loop: boolean;
  smartBackspace: boolean;
}

function useTyped({
  strings,
  typeSpeed = 50,
  backSpeed = 50,
  loop = true,
  smartBackspace,
}: useTypedProp) {
  const elementRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    typedRef.current = new Typed(elementRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      smartBackspace,
    });

    return () => {
      typedRef.current?.destroy();
    };
  });

  return elementRef;
}

export default useTyped;
