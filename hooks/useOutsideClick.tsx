import React from "react";

// React 19 optimized version using ref callback with cleanup
export const useOutsideClick = (callback: Function) => {
  return (element: HTMLDivElement | null) => {
    if (!element) return;

    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (element.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // React 19 feature: return cleanup function from ref callback
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  };
};

// Legacy version for backwards compatibility
export const useOutsideClickLegacy = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  React.useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
