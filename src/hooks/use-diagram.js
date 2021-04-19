import { useCallback, useReducer } from 'react';

const ADD_ITEM = 'ADD_ITEM';
const CHANGE_MAX_COUNT = 'CHANGE_MAX_COUNT';
const CLEAR = 'CLEAR';

function t(items, keys, maxCount, { min, max }) {
  const newItems = items.slice(-maxCount);
  const newKeys = keys.slice(-maxCount);
  const newMin = Math.min(min || Infinity, ...newItems);
  const newMax = Math.max(max, ...newItems);

  return {
    items: newItems,
    keys: newKeys,
    maxCount,
    min: newMin,
    max: newMax,
  };
}

function diagramReducer(state, { type, payload }) {
  if (type === ADD_ITEM) {
    const { maxCount, min, max } = state;
    const { item, key } = payload;
    const newItems = [...state.items, item];
    const newKeys = [...state.keys, key];

    return t(newItems, newKeys, maxCount, { min, max });
  }

  if (type === CHANGE_MAX_COUNT) {
    const { min, max } = state;

    return t(state.items, state.keys, payload, { min, max });
  }

  if (type === CLEAR) {
    const { maxCount } = state;

    return {
      items: [],
      keys: [],
      maxCount,
      max: 0,
      min: 0,
    };
  }

  return state;
}

function useDiagram(initialState = {}) {
  const [state, dispatch] = useReducer(diagramReducer, {
    items: [],
    keys: [],
    max: 0,
    min: 0,
    ...initialState,
  });

  const add = useCallback((item, key) => dispatch({ type: ADD_ITEM, payload: { item, key } }), []);

  const changeMaxCount = useCallback(
    (maxCount) => dispatch({ type: CHANGE_MAX_COUNT, payload: maxCount }),
    [],
  );

  const clear = useCallback(() => dispatch({ type: CLEAR }), []);

  return [state, { add, changeMaxCount, clear }];
}

export default useDiagram;
