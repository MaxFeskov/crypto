import { useEffect, useRef } from 'react';

const useEventListener = (eventName: string, handler: (event: Event) => void, element = window) => {
  const savedHandler = useRef<(event: Event) => void>(null!);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
