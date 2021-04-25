import { RefObject, useCallback, useEffect, useState } from 'react';
import useEventListener from './use-event-listener';

interface Size {
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(elementRef: RefObject<T>) {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    const node = elementRef?.current;

    if (node) {
      const { width, height } = node.getBoundingClientRect();

      setSize({ width, height });
    }
  }, [elementRef]);

  useEffect(() => {
    updateSize();
  }, [updateSize]);

  useEventListener('resize', updateSize);

  return size;
}

export default useElementSize;
