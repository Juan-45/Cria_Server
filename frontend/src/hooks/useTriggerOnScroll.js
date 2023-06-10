import { useState, useEffect, useRef } from "react";

const useTriggerOnScroll = () => {
  const targetEl = useRef(null);
  const [trigger, setTrigger] = useState(false);

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const detectElement = () => {
      if (targetEl.current !== null) {
        const innerHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const rect = targetEl.current.getBoundingClientRect();

        const reachBottomBorder = rect.bottom <= innerHeight;

        if (reachBottomBorder) {
          setTrigger(true);
        }
      }
    };

    const detectScroll = () => {
      const yScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (yScroll > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    const handleScroll = () => {
      detectScroll();
      detectElement();
    };

    if (trigger === false) {
      detectElement();
    }

    if (scrolling === false) {
      detectScroll();
    }

    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, trigger]);

  return { scrolling, targetEl, trigger };
};

export default useTriggerOnScroll;
