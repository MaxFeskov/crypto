import { useCallback, useEffect, useState } from 'react';
import useEventListener from './use-event-listener';

function useElementSize(node) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    if (node) {
      const { width, height } = node.getBoundingClientRect();

      setSize({ width, height });
    }
  }, [node]);

  useEffect(() => {
    updateSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  useEventListener('resize', updateSize);

  return size;
}

export default useElementSize;
