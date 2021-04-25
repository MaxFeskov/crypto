import { useCallback, useReducer } from 'react';

const ADD_ITEM = 'ADD_ITEM';
const CHANGE_MAX_COUNT = 'CHANGE_MAX_COUNT';
const CLEAR = 'CLEAR';

type State = {
  items: Array<number>;
  keys: Array<string>;
  maxCount: number;
  max: number;
  min: number;
};

type Action =
  | { type: typeof ADD_ITEM; payload: { item: number; key: string } }
  | { type: typeof CHANGE_MAX_COUNT; payload: number }
  | { type: typeof CLEAR };

type MinMax = {
  min: number;
  max: number;
};

type Diagram = [
  State,
  {
    add: (item: number, key: string) => void;
    changeMaxCount: (maxCount: number) => void;
    clear: () => void;
  },
];

const initialState = {
  items: [],
  keys: [],
  max: 0,
  min: 0,
  maxCount: 1,
};

function getNewState(
  items: Array<number>,
  keys: Array<string>,
  maxCount: number,
  { min, max }: MinMax,
) {
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

function diagramReducer(state: State, action: Action): State {
  if (action.type === ADD_ITEM) {
    const { maxCount, min, max } = state;
    const { item, key } = action.payload;
    const newItems = [...state.items, item];
    const newKeys = [...state.keys, key];

    return getNewState(newItems, newKeys, maxCount, { min, max });
  }

  if (action.type === CHANGE_MAX_COUNT) {
    const { min, max } = state;

    return getNewState(state.items, state.keys, action.payload, { min, max });
  }

  if (action.type === CLEAR) {
    const { maxCount } = state;

    return {
      ...initialState,
      maxCount,
    };
  }

  return state;
}

function useDiagram(): Diagram {
  const [state, dispatch] = useReducer(diagramReducer, { ...initialState });

  const add = useCallback((item, key) => dispatch({ type: ADD_ITEM, payload: { item, key } }), []);

  const changeMaxCount = useCallback(
    (maxCount) => dispatch({ type: CHANGE_MAX_COUNT, payload: maxCount }),
    [],
  );

  const clear = useCallback(() => dispatch({ type: CLEAR }), []);

  return [state, { add, changeMaxCount, clear }];
}

export default useDiagram;
