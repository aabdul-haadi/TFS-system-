import { useEffect, RefObject } from 'react';

interface UseObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

const useObserver = (
  elementRef: RefObject<Element>,
  callback: (isIntersecting: boolean) => void,
  options: UseObserverOptions = {}
) => {
  const { threshold = 0.1, root = null, rootMargin = '0px', freezeOnceVisible = false } = options;

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry.isIntersecting);
          
          // Unobserve once element is visible
          if (freezeOnceVisible && entry.isIntersecting && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, callback]);
};

export default useObserver;