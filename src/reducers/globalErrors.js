const MAX_ERRORS_COUNT = 5;
const ADD_GLOBAL_ERROR = 'ADD_GLOBAL_ERROR';
const DELETE_GLOBAL_ERROR = 'DELETE_GLOBAL_ERROR';

const initialState = new Set();

export const addGlobalError = (message) => ({ type: ADD_GLOBAL_ERROR, payload: message });

export const deleteGlobalError = (message) => ({ type: DELETE_GLOBAL_ERROR, payload: message });

export default function globalErrors(state = initialState, { type, payload }) {
  if (type === ADD_GLOBAL_ERROR) {
    const { size } = state;

    if (size < MAX_ERRORS_COUNT && state.add(payload).size === size) return new Set(state);
  }

  if (type === DELETE_GLOBAL_ERROR) {
    if (state.delete(payload)) return new Set(state);
  }

  return state;
}
